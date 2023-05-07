import { useCallback, useMemo } from 'react'

import { groupBy, tidy } from '@tidyjs/tidy'
import { flatten, unflatten } from 'flat'
import produce from 'immer'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useSaveComment from '@/features/quoted-comment/hooks/useSaveComment'
import commentState from '@/features/quoted-comment/stores/comment'
import { Comment, MappedComment } from '@/features/quoted-comment/types/comment'

const useComment = () => {
  const { saveMutation } = useSaveComment()
  const activeComments = useRecoilValue(commentState)
  const setActiveComments = useSetRecoilState(commentState)

  // @see https://stackblitz.com/edit/react-khezrc?file=src%2Fredux%2Findex.tsx
  const recursiveUpdate = useCallback(
    async (updatedParentComment: Comment, mappedComment: MappedComment) => {
      const recur = async (updatedComment: Comment): Promise<void> => {
        setActiveComments((prevState) => {
          const nextState = produce(prevState, (draft) => {
            draft.mappedComment.set(
              updatedParentComment.id,
              updatedParentComment
            )
            return draft
          })
          return {
            ...prevState,
            mappedComment: nextState.mappedComment,
          }
        })
        if (updatedComment.type === 'root') {
          await saveMutation.mutateAsync(updatedComment)
          setActiveComments((prevState) => {
            const nextState = produce(prevState, (draft) => {
              const matchedIndex = draft.comments.findIndex(
                (d) => d.id === updatedComment.id
              )
              draft.comments[matchedIndex] = updatedComment
              return draft
            })
            return {
              ...prevState,
              comments: nextState.comments,
            }
          })
        }
        if (updatedComment.parentId) {
          const parent = mappedComment.get(updatedComment.parentId)
          if (parent) {
            const newParentComment = {
              ...parent,
              children: parent.children.map((child) =>
                child.id === updatedComment.id ? updatedComment : child
              ),
            }
            return await recur(newParentComment)
          }
        }
      }
      return await recur(updatedParentComment)
    },
    [setActiveComments, saveMutation]
  )

  const saveComment = useCallback(
    async (willAddedComment: Comment) => {
      const nextState = produce(activeComments, (draft) => {
        draft.mappedComment.set(willAddedComment.id, willAddedComment)
        return draft
      })

      setActiveComments((prevState) => {
        return {
          ...prevState,
          mappedComment: nextState.mappedComment,
        }
      })

      if (willAddedComment.parentId) {
        const parent = activeComments.mappedComment.get(
          willAddedComment.parentId
        )
        if (parent) {
          const updatedParentComment = {
            ...parent,
            children: [willAddedComment, ...parent.children],
          }
          await recursiveUpdate(updatedParentComment, nextState.mappedComment)
        }
      } else {
        await saveMutation.mutateAsync(willAddedComment)
        setActiveComments((prevState) => {
          const nextState = produce(prevState, (draft) => {
            draft.comments.push(willAddedComment)
            draft.mappedComment = tidy(
              draft.comments,
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
      }
    },
    [activeComments, saveMutation, setActiveComments, recursiveUpdate]
  )

  const deleteComment = useCallback(
    async (id: string) => {
      const activeComment = activeComments.mappedComment.get(id)
      if (!activeComment) return
      if (activeComment.parentId) {
        let activeParentComment = activeComments.mappedComment.get(
          activeComment.parentId
        )
        while (activeParentComment?.parentId) {
          activeParentComment = activeComments.mappedComment.get(
            activeParentComment.parentId
          )
        }
        if (activeParentComment) {
          const flattenedPath = flatten(activeParentComment) as Record<
            string,
            unknown
          >
          const willPatchedPath = Object.entries(flattenedPath)
            .map(([key, value]) => {
              if (value === id && key.endsWith('id')) {
                return key.replace(/id$/, 'isDeleted')
              }
              return
            })
            .filter((d) => !!d)
            .flat()
            .pop()!
          const nextState = produce(flattenedPath, (draft) => {
            draft[willPatchedPath] = true
            return draft
          })
          const updatedParentComment = unflatten(nextState) as Comment
          await recursiveUpdate(
            updatedParentComment,
            activeComments.mappedComment
          )
        }
      } else {
        await saveMutation.mutateAsync({
          ...activeComment,
          isDeleted: true,
        })
      }
    },
    [activeComments, saveMutation, recursiveUpdate]
  )

  const hideComment = useCallback(
    async (id: string) => {
      const activeComment = activeComments.mappedComment.get(id)
      if (!activeComment) return
      if (activeComment.parentId) {
        let activeParentComment = activeComments.mappedComment.get(
          activeComment.parentId
        )
        while (activeParentComment?.parentId) {
          activeParentComment = activeComments.mappedComment.get(
            activeParentComment.parentId
          )
        }
        if (activeParentComment) {
          const flattenedPath = flatten(activeParentComment) as Record<
            string,
            unknown
          >
          const willPatchedPath = Object.entries(flattenedPath)
            .map(([key, value]) => {
              if (value === id && key.endsWith('id')) {
                return key.replace(/id$/, 'isHidden')
              }
              return
            })
            .filter((d) => !!d)
            .flat()
            .pop()!
          const nextState = produce(flattenedPath, (draft) => {
            draft[willPatchedPath] = true
            return draft
          })
          const updatedParentComment = unflatten(nextState) as Comment
          await recursiveUpdate(
            updatedParentComment,
            activeComments.mappedComment
          )
        }
      } else {
        await saveMutation.mutateAsync({
          ...activeComment,
          isHidden: true,
        })
      }
    },
    [activeComments, saveMutation, recursiveUpdate]
  )

  const quotedComment = useCallback(() => {}, [])

  return useMemo(() => {
    return {
      saveComment,
      hideComment,
      deleteComment,
      activeComments,
      setActiveComments,
    }
  }, [
    saveComment,
    hideComment,
    deleteComment,
    activeComments,
    setActiveComments,
  ])
}

export default useComment
