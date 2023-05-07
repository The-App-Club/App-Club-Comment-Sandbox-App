import { useMemo } from 'react'

import { Simplify } from 'type-fest'

import useListUpComment from '@/features/quoted-comment/hooks/useListUpComment'
import { Comment } from '@/features/quoted-comment/types/comment'
import { DeepNonUndefinable, DeepNullish } from '@/types/util'

type Props = Simplify<DeepNonUndefinable<DeepNullish<Pick<Comment, 'id'>>>>

const useGetComment = ({ id }: Props) => {
  const { flatComments } = useListUpComment()

  const data = flatComments?.find((d) => d.id === id)

  return useMemo(() => {
    return {
      data,
    }
  }, [data])
}

export default useGetComment
