import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react'

import { EyeClosed, NotePencil, Trash } from 'phosphor-react'

import { Button } from '@/components/ui/Button'
import useComment from '@/features/quoted-comment/hooks/useComment'
import useFormMode from '@/features/quoted-comment/hooks/useFormMode'
import { FormMode } from '@/features/quoted-comment/stores/formMode'

import type { Simplify } from 'type-fest'

type Props = Simplify<{
  id: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}>

const ShortHandMenu: FC<Props> = ({ id, setIsOpen }) => {
  const { setActiveFormMode } = useFormMode()
  const { deleteComment, hideComment, activeComments } = useComment()

  const handleHide: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    hideComment(id)
    setIsOpen(false)
  }

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsOpen(false)
    setActiveFormMode((prevState) => {
      return { ...prevState, mode: FormMode.EDIT, id }
    })
  }

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    const willDeletedComment = activeComments.mappedComment.get(id)
    if (!willDeletedComment) return
    deleteComment(id)
    setIsOpen(false)
  }

  return (
    <ul className='border-2 bg-white py-2'>
      <li className='p-2 hover:bg-slate-100'>
        <Button
          intent={'skin'}
          className='flex items-center gap-2 p-1 text-gray-600'
          onClick={handleHide}
        >
          <span className='inline-block'>
            <EyeClosed size={24} />
          </span>
          Hide
        </Button>
      </li>
      <li className='p-2 hover:bg-slate-100'>
        <Button
          intent={'skin'}
          className='flex items-center gap-2 p-1 text-gray-600'
          onClick={handleEdit}
        >
          <span className='inline-block'>
            <NotePencil size={24} />
          </span>
          Edit
        </Button>
      </li>
      <li className='p-2 hover:bg-slate-100'>
        <Button
          intent={'skin'}
          className='flex items-center gap-2 p-1 text-gray-600'
          onClick={handleDelete}
        >
          <span className='inline-block'>
            <Trash size={24} />
          </span>
          Delete
        </Button>
      </li>
    </ul>
  )
}

export default ShortHandMenu
