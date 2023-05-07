import { useMutation } from '@tanstack/react-query'

import { Comment } from '@/features/quoted-comment/types/comment'
import { queryClient } from '@/libs/queryClient'
import supabase from '@/libs/supabaseClient'

const useDeleteComment = () => {
  const removeMutation = useMutation(
    async (variables: Pick<Comment, 'id'>) => {
      // @ts-ignore
      // https://supabase.com/docs/reference/javascript/upsert
      const { data, error } = await supabase
        .from('comment')
        .delete()
        .eq('id', variables.id)
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
    removeMutation,
  }
}

export default useDeleteComment
