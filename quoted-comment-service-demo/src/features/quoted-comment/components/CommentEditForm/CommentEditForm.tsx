import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useMemo,
  useState,
} from 'react'

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

type Props = Simplify<Pick<Comment, 'id'>>

const CommentEditForm: FC<Props> = ({ id }) => {
  const { setActiveFormMode } = useFormMode()
  const {
    saveComment,
    activeComments: { mappedComment },
  } = useComment()

  const activeComment = useMemo(() => {
    return mappedComment.get(id)
  }, [mappedComment, id])

  const [text, setText] = useState<string | undefined>(activeComment?.text)

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.currentTarget.value)
  }

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!activeComment) return
    saveComment({
      ...activeComment,
      text: text ?? '',
      updatedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    })
    setActiveFormMode((prevState) => {
      return {
        ...prevState,
        id: '',
        mode: FormMode.INITIAL,
      }
    })
    setText('')
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
        htmlFor={`message-${id}`}
        className='font-noto text-gray-600'
      >
        {`編集する`}
      </FormControlLabel>
      <Textarea id={`message-${id}`} value={text} onChange={handleChange} />
      <Spacer />
      <Box className='flex justify-end gap-4' tabIndex={-1}>
        <Button onClick={handleCancel}>{`キャンセル`}</Button>
        <Button onClick={handleEdit}>{`更新する`}</Button>
      </Box>
    </Box>
  )
}

export default CommentEditForm
