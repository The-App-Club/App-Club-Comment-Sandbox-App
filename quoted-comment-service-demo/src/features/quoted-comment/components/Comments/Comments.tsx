import { FC } from 'react'

import { Comment } from '@/features/quoted-comment/components/Comment'

import type { Comment as TComment } from '@/features/quoted-comment/types/comment'

type Props = {
  comments: TComment[]
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <ul className={`flex flex-col justify-start gap-4`}>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </ul>
  )
}

export default Comments
