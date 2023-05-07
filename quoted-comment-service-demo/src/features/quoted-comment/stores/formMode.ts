import { atom } from 'recoil'
import { Simplify } from 'type-fest'

import type { Comment } from '@/features/quoted-comment/types/comment'

export enum FormMode {
  INITIAL = 'INITIAL',
  ADD = 'ADD',
  EDIT = 'EDIT',
  REPLY = 'REPLY',
}

type CommentCreateForm = Simplify<
  Pick<Comment, 'id'> & {
    mode: FormMode
  }
>

const formModeState = atom<CommentCreateForm>({
  key: 'formMode',
  default: {
    id: '',
    mode: FormMode.INITIAL,
  },
})

export default formModeState
