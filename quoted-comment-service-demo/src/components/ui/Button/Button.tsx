import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { cva, cx } from 'class-variance-authority'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { VariantProps } from 'class-variance-authority'
import type { Simplify } from 'type-fest'

export type ButtonProps = VariantProps<typeof buttonStyles>
const buttonStyles = cva('rounded-lg px-5 py-2.5 text-white', {
  variants: {
    intent: {
      primary: cx(
        `bg-blue-500 hover:bg-blue-700 disabled:bg-blue-200`,
        `active:border-blue-400 active:ring-blue-400`,
        `outline-none focus:outline-none focus:ring-2`,
        `focus:border-blue-600 focus:ring-blue-600`,
        `focus-within:border-blue-600 focus-within:ring-blue-600`,
        `focus-visible:border-blue-600 focus-visible:ring-blue-600`
      ),
      skin: cx(
        `bg-transparent hover:bg-transparent disabled:bg-transparent`,
        `active:border-gray-400 active:ring-gray-400`,
        `outline-none focus:outline-none focus:ring-2`,
        `focus:border-gray-600 focus:ring-gray-600`,
        `focus-within:border-gray-600 focus-within:ring-gray-600`,
        `focus-visible:border-gray-600 focus-visible:ring-gray-600`
      ),
      success: cx(
        `bg-green-500 hover:bg-green-700 disabled:bg-green-200`,
        `active:border-green-400 active:ring-green-400`,
        `outline-none focus:outline-none focus:ring-2`,
        `focus:border-green-600 focus:ring-green-600`,
        `focus-within:border-green-600 focus-within:ring-green-600`,
        `focus-visible:border-green-600 focus-visible:ring-green-600`
      ),
      danger: cx(
        `bg-red-500 hover:bg-red-700 disabled:bg-red-200`,
        `active:border-red-400 active:ring-red-400`,
        `outline-none focus:outline-none focus:ring-2`,
        `focus:border-red-600 focus:ring-red-600`,
        `focus-within:border-red-600 focus-within:ring-red-600`,
        `focus-visible:border-red-600 focus-visible:ring-red-600`
      ),
    },
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})
type Props = Simplify<
  Pick<
    ComponentPropsWithRef<'button'>,
    | 'tabIndex'
    | 'type'
    | 'className'
    | 'disabled'
    | 'ref'
    | 'children'
    | 'onClick'
  > &
    ButtonProps
>
const Button: FC<Props> = forwardRef(
  (
    {
      children,
      intent = 'primary',
      size = 'medium',
      type = 'button',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          buttonStyles({ intent, size }),
          clsx(`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`),
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
