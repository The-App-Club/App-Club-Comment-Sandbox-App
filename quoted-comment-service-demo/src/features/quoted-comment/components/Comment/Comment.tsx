import { FC, MouseEventHandler, useMemo, useState } from 'react'

import Image from 'next/image'

import { DotsThreeVertical } from 'phosphor-react'

import { Box } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Spacer } from '@/components/ui/Spacer'
import { CommentCreateForm } from '@/features/quoted-comment/components/CommentCreateForm'
import { CommentEditForm } from '@/features/quoted-comment/components/CommentEditForm'
import { Popover } from '@/features/quoted-comment/components/Popover'
import { ShortHandMenu } from '@/features/quoted-comment/components/ShortHandMenu'
import { TimeAgo } from '@/features/quoted-comment/components/TimeAgo'
import useFormMode from '@/features/quoted-comment/hooks/useFormMode'
import useGetComment from '@/features/quoted-comment/hooks/useGetComment'
import { FormMode } from '@/features/quoted-comment/stores/formMode'
import { createAvator } from '@/features/quoted-comment/utils/avator'
import { dayjs } from '@/features/quoted-comment/utils/dateUtil'

import type { Comment as TComment } from '@/features/quoted-comment/types/comment'

type Props = {
  comment: TComment
}

const Comment: FC<Props> = ({ comment }) => {
  const { activeFormMode, setActiveFormMode } = useFormMode()

  const { data: quotedComment } = useGetComment({ id: comment.parentId })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const QuotedCommentContent = useMemo(() => {
    if (!quotedComment) {
      return null
    }
    if (quotedComment.isDeleted) {
      return <p>This comment already deleted.</p>
    }
    if (quotedComment.isHidden) {
      return <p>This comment already hidden.</p>
    }
    return (
      <Box
        className='ml-24 w-[calc(100%-6rem)] bg-blue-300/20 p-2'
        tabIndex={-1}
      >
        <Box className='flex items-start gap-2'>
          <Image
            className='h-10 w-10 rounded-full'
            alt='avator'
            src={createAvator(quotedComment.id)}
            width={40}
            height={40}
          />
          <Box className='flex flex-col justify-start'>
            <span className='flex items-center gap-2 font-noto font-bold'>
              {quotedComment.author}
              <span className='font-noto text-sm font-medium text-gray-500'>
                <TimeAgo
                  date={dayjs.tz(quotedComment.updatedAt).toDate()}
                  locale='ja'
                />
              </span>
            </span>

            <p className='font-noto text-gray-500'>{quotedComment.text}</p>
          </Box>
        </Box>
      </Box>
    )
  }, [quotedComment])

  if (comment.isDeleted) {
    return <p>Deleted comment.</p>
  }

  if (comment.isHidden) {
    return <p>See offed comment.</p>
  }

  const handleReply: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (activeFormMode.id !== '') {
      setActiveFormMode((prevState) => {
        return {
          ...prevState,
          id: '',
          mode: FormMode.INITIAL,
        }
      })
    } else {
      setActiveFormMode((prevState) => {
        return {
          ...prevState,
          id: comment.id,
          mode: FormMode.REPLY,
        }
      })
    }
  }

  return (
    <li className={`bg-white`}>
      <Box className='w-full p-4'>
        <Box className='flex w-full items-center justify-between' tabIndex={-1}>
          <Box className='flex items-start gap-2'>
            <Image
              className='h-10 w-10 rounded-full'
              alt='avator'
              src={createAvator(comment.id)}
              width={40}
              height={40}
            />
            <span className='flex items-center gap-2 font-noto font-bold'>
              {comment.author}
              <span className='font-noto text-sm font-medium text-gray-500'>
                <TimeAgo
                  date={dayjs.tz(comment.updatedAt).toDate()}
                  locale='ja'
                />
              </span>
            </span>
          </Box>
          <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
            <Button intent={'skin'} className='p-2.5 text-gray-600'>
              <DotsThreeVertical size={24} />
            </Button>
            <ShortHandMenu id={comment.id} setIsOpen={setIsOpen} />
          </Popover>
        </Box>
        <Spacer />
        <Separator />
        <Spacer />
        {activeFormMode.mode === FormMode.EDIT &&
          activeFormMode.id === comment.id && (
            <CommentEditForm id={comment.id} />
          )}
        {activeFormMode.mode === FormMode.EDIT &&
          activeFormMode.id !== comment.id && (
            <p className='font-noto'>
              {comment.text ? comment.text : 'No content.'}
            </p>
          )}
        {activeFormMode.mode === FormMode.INITIAL && (
          <p className='font-noto'>
            {comment.text ? comment.text : 'No content.'}
          </p>
        )}
        {activeFormMode.mode === FormMode.REPLY && (
          <p className='font-noto'>
            {comment.text ? comment.text : 'No content.'}
          </p>
        )}
        <Spacer />
        {QuotedCommentContent}
        <span className='flex justify-end'>{comment.id}</span>
        {activeFormMode.mode === FormMode.INITIAL && (
          <button
            className='font-noto text-sm text-gray-500'
            onClick={handleReply}
          >
            返信する
          </button>
        )}
      </Box>
      {activeFormMode.mode === FormMode.REPLY &&
        activeFormMode.id === comment.id && (
          <Box className='w-full p-4' tabIndex={-1}>
            <CommentCreateForm parentId={comment.id} />
          </Box>
        )}
    </li>
  )
}

export default Comment
