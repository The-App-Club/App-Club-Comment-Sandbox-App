import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import type { Simplify } from 'type-fest'

type Props = Simplify<ComponentPropsWithRef<'div'>>

const Spacer: FC<Props> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge(`h-4 w-full`, className)} {...props} />
    )
  }
)

Spacer.displayName = 'Spacer'

export default Spacer
