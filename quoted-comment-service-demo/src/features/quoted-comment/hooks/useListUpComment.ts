import { useCallback, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { distinct, groupBy, tidy } from '@tidyjs/tidy'
import produce from 'immer'
import { useSetRecoilState } from 'recoil'

import commentState from '@/features/quoted-comment/stores/comment'
import {
  Comment,
  CommentWithSibling,
} from '@/features/quoted-comment/types/comment'
import supabase from '@/libs/supabaseClient'

const useListUpComment = () => {
  const setActiveComments = useSetRecoilState(commentState)

  const { data, error, refetch } = useQuery<Comment[], Error>({
    queryKey: ['comment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comment')
        .select()
        .order('updated_at', { ascending: true })
      if (error) {
        return Promise.reject(error)
      }
      const neatData: Comment[] = data.map((d) => {
        return {
          id: d.id,
          author: d.author,
          isHidden: d.is_hidden,
          isDeleted: d.is_deleted,
          parentId: d.parent_id,
          text: d.text,
          type: d.type as 'root' | 'child',
          children: d.children as unknown as Comment[],
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }
      })

      return Promise.resolve(neatData)
    },
    onSuccess(data) {
      if (data.length === 0) {
        return
      }
      const result = doTrees(data)
      setActiveComments((prevState) => {
        const nextState = produce(prevState, (draft) => {
          draft.comments.push(...data)
          draft.mappedComment = tidy(
            result,
            groupBy(['id'], groupBy.map({ single: true }))
          )
          return draft
        })
        return {
          ...prevState,
          comments: nextState.comments,
          mappedComment: nextState.mappedComment,
        }
      })
    },
    onError(error) {
      console.log(error)
    },
  })

  const traverseCommentTree = useCallback(
    (
      comment: Comment,
      depth: number,
      siblingIndex: number,
      tree: CommentWithSibling[]
    ) => {
      const unisted: CommentWithSibling = {
        id: comment.id,
        author: comment.author,
        text: comment.text,
        parentId: comment.parentId,
        isHidden: comment.isHidden,
        isDeleted: comment.isDeleted,
        type: comment.type,
        children: comment.children,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        depth,
        siblingIndex: siblingIndex !== 0 ? siblingIndex : null,
      }

      tree.push(unisted)

      if (comment.children.length !== 0) {
        siblingIndex = 0
        comment.children.forEach((child, index) => {
          // https://github.com/syntax-tree/unist#sibling
          siblingIndex = siblingIndex + 1
          traverseCommentTree(child, depth + 1, siblingIndex, tree)
        })
      }

      return tree
    },
    []
  )

  const doTrees = useCallback(
    (data: Comment[]) => {
      const first = data[0]
      const rest = data.slice(1)
      const tree = traverseCommentTree(first, 0, 0, [])
      type Tree = (typeof tree)[number]
      const trees: Tree[][] = []
      trees.push(tree)

      rest.forEach((data) => {
        const tree = traverseCommentTree(data, 0, 0, [])
        trees.push(tree)
      })

      return trees.flat()
    },
    [traverseCommentTree]
  )

  const flatComments = useMemo(() => {
    if (!data) {
      return
    }
    if (data.length > 0) {
      const result = doTrees(data)
      return tidy(result, distinct(['id']))
    }
    return []
  }, [data, doTrees])

  return {
    flatComments,
    error,
    refetch,
  }
}

export default useListUpComment
