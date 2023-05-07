import {
  ComponentPropsWithRef,
  Dispatch,
  FC,
  forwardRef,
  ReactNode,
  SetStateAction,
} from 'react'

import {
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import { twMerge } from 'tailwind-merge'

import type { Merge, Simplify } from 'type-fest'

type Props = Simplify<
  Merge<ComponentPropsWithRef<'div'>, { children: ReactNode[] }> & {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
  }
>

const Popover: FC<Props> = forwardRef(
  ({ children, className, isOpen, setIsOpen, ...props }, ref) => {
    const [Button, Menu] = children

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [offset(5)],
      placement: 'bottom-end',
    })

    // https://floating-ui.com/docs/useHover#safepolygon
    const click = useClick(context)
    // https://floating-ui.com/docs/usedismiss
    const dismiss = useDismiss(context, {
      escapeKey: true,
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
    ])

    return (
      <div ref={ref} className={twMerge(className)} {...props}>
        <span
          className='inline-block'
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          {Button}
        </span>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {Menu}
          </div>
        )}
      </div>
    )
  }
)

Popover.displayName = 'Popover'

export default Popover
