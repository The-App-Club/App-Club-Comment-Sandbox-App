import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import type { Simplify } from 'type-fest'

type Props = Simplify<ComponentPropsWithRef<'hr'>>

const Separator: FC<Props> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <hr ref={ref} className={twMerge(`border-t-2`, className)} {...props} />
    )
  }
)

Separator.displayName = 'Separator'

export default Separator
