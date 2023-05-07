import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import type { Simplify } from 'type-fest'

type Props = Simplify<ComponentPropsWithRef<'div'>>

const Box: FC<Props> = forwardRef(
  ({ children, className, tabIndex = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          // `bg-transparent hover:bg-transparent disabled:bg-transparent`,
          // `active:border-gray-400 active:ring-gray-400`,
          // `outline-none focus:outline-none focus:ring-2`,
          // `focus:border-gray-600 focus:ring-gray-600`,
          // `focus-within:border-gray-600 focus-within:ring-gray-600`,
          // `focus-visible:border-gray-600 focus-visible:ring-gray-600`,
          className
        )}
        {...props}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    )
  }
)

Box.displayName = 'Box'

export default Box
