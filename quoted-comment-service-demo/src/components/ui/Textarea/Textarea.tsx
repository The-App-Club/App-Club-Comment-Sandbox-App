import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { cva, cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

import type { VariantProps } from 'class-variance-authority'
import type { Simplify } from 'type-fest'

export type TextareaProps = VariantProps<typeof textareaStyles>
const textareaStyles = cva(
  cx(
    'min-h-[10rem] w-full rounded-lg p-2.5 font-noto text-sm text-gray-900',
    `border border-gray-300 hover:border-gray-400`,
    `outline-none focus:outline-none focus:ring-1`
  ),
  {
    variants: {
      intent: {
        primary: cx(
          `active:border-blue-400 active:ring-blue-400`,
          `focus:border-blue-600 focus:ring-blue-600`,
          `focus-within:border-blue-600 focus-within:ring-blue-600`,
          `focus-visible:border-blue-600 focus-visible:ring-blue-600`
        ),
        success: cx(
          `active:border-green-400 active:ring-green-400`,
          `focus:border-green-600 focus:ring-green-600`,
          `focus-within:border-green-600 focus-within:ring-green-600`,
          `focus-visible:border-green-600 focus-visible:ring-green-600`
        ),
        danger: cx(
          `active:border-red-400 active:ring-red-400`,
          `focus:border-red-600 focus:ring-red-600`,
          `focus-within:border-red-600 focus-within:ring-red-600`,
          `focus-visible:border-red-600 focus-visible:ring-red-600`
        ),
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
)
type Props = Simplify<
  Pick<
    ComponentPropsWithRef<'textarea'>,
    | 'id'
    | 'tabIndex'
    | 'className'
    | 'disabled'
    | 'ref'
    | 'placeholder'
    | 'onChange'
    | 'value'
  > &
    TextareaProps
>

const Textarea: FC<Props> = forwardRef(
  (
    {
      id,
      intent = 'primary',
      placeholder = '素敵なコメントをする',
      disabled = false,
      className,
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={4}
        placeholder={placeholder}
        className={twMerge(textareaStyles({ intent }), className)}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
