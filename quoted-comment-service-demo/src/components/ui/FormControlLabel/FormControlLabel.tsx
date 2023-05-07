import { ComponentPropsWithRef, FC, forwardRef } from 'react'

import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

import type { VariantProps } from 'class-variance-authority'
import type { Simplify } from 'type-fest'

export type LabelProps = VariantProps<typeof labelStyles>
const labelStyles = cva('mb-2 block text-sm font-medium text-gray-900', {
  variants: {},
  defaultVariants: {},
})
type Props = Simplify<
  Pick<ComponentPropsWithRef<'label'>, 'htmlFor' | 'className' | 'children'> &
    LabelProps
>

const FormControlLabel: FC<Props> = forwardRef(
  ({ className, htmlFor, children, ...props }, ref) => {
    return (
      <label
        // @ts-ignore
        ref={ref}
        htmlFor={htmlFor}
        className={twMerge(labelStyles(), className)}
      >
        {children}
      </label>
    )
  }
)

FormControlLabel.displayName = 'FormControlLabel'

export default FormControlLabel
