import { atom } from 'recoil'

import type { Comment } from '@/features/quoted-comment/types/comment'

type MappedComment = Map<string, Comment>

type Props = {
  comments: Comment[]
  mappedComment: MappedComment
}

const commentState = atom<Props>({
  key: 'comment',
  default: {
    comments: [],
    mappedComment: new Map(),
  },
})

export default commentState
