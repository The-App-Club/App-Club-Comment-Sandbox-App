import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'

import { Simplify } from 'type-fest'

import { Box } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { FormControlLabel } from '@/components/ui/FormControlLabel'
import { Spacer } from '@/components/ui/Spacer'
import { Textarea } from '@/components/ui/Textarea'
import useComment from '@/features/quoted-comment/hooks/useComment'
import useFormMode from '@/features/quoted-comment/hooks/useFormMode'
import { FormMode } from '@/features/quoted-comment/stores/formMode'
import { Comment } from '@/features/quoted-comment/types/comment'
import { createAuthor } from '@/features/quoted-comment/utils/avator'
import { createID } from '@/features/quoted-comment/utils/createId'

type Props = Simplify<Pick<Comment, 'parentId'>>

const CommentCreateForm: FC<Props> = ({ parentId }) => {
  const { setActiveFormMode } = useFormMode()
  const [text, setText] = useState('')
  const { saveComment } = useComment()

  const messageID = createID()

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.currentTarget.value)
  }

  const handleAdd = () => {
    saveComment({
      text,
      id: messageID,
      parentId,
      children: [],
      type: parentId ? 'child' : 'root',
      isHidden: false,
      isDeleted: false,
      author: createAuthor(messageID),
      createdAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      updatedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    })
    setText('')
    setActiveFormMode((prevState) => {
      return {
        ...prevState,
        id: '',
        mode: FormMode.INITIAL,
      }
    })
  }

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setActiveFormMode((prevState) => {
      return {
        ...prevState,
        id: '',
        mode: FormMode.INITIAL,
      }
    })
  }

  return (
    <Box className='w-full' tabIndex={-1}>
      <FormControlLabel
        htmlFor={`message-${messageID}`}
        className='font-noto text-gray-600'
      >
        {parentId ? (
          <span>
            <b>{`#${parentId} `}</b>
            {`にコメントをする`}
          </span>
        ) : (
          `スレを立てる`
        )}
      </FormControlLabel>
      <Textarea
        id={`message-${messageID}`}
        value={text}
        onChange={handleChange}
      />
      <Spacer />
      <Box className='flex justify-end gap-4' tabIndex={-1}>
        {parentId && <Button onClick={handleCancel}>{`キャンセル`}</Button>}
        <Button onClick={handleAdd}>
          {parentId ? `返信する` : `コメントする`}
        </Button>
      </Box>
    </Box>
  )
}

export default CommentCreateForm
