import { useMutation } from '@tanstack/react-query'

import { Comment, CommentForDB } from '@/features/quoted-comment/types/comment'
import { queryClient } from '@/libs/queryClient'
import supabase from '@/libs/supabaseClient'

const useSaveComment = () => {
  const saveMutation = useMutation(
    async (variables: Comment) => {
      const dto: CommentForDB = {
        id: variables.id,
        author: variables.author,
        text: variables.text,
        is_hidden: variables.isHidden,
        is_deleted: variables.isDeleted,
        type: variables.type,
        parent_id: variables.parentId,
        children: variables.children,
        created_at: variables.createdAt,
        updated_at: variables.updatedAt,
      }
      // @ts-ignore
      // https://supabase.com/docs/reference/javascript/upsert
      const { data, error } = await supabase.from('comment').upsert(dto)
      if (error) {
        return Promise.reject(error)
      }
      return Promise.resolve(data)
    },
    {
      onSuccess: (
        data: unknown,
        variables: unknown,
        context: void | undefined
      ) => {
        queryClient.invalidateQueries(['comment'])
      },
      onError: (error: unknown, variables: unknown, context: unknown) => {
        console.log('onError', error)
      },
      onMutate: (variables: unknown) => {},
    }
  )

  return {
    saveMutation,
  }
}

export default useSaveComment
