import { Button as RAButton, type ButtonProps as RAButtonProps } from 'react-aria-components'

import { cn } from '#helpers/cn'

const classes = {
  primary: {
    fill: 'bg-orange-700 text-white',
    outline: 'border border-orange-700 text-orange-700 bg-white',
  },
  secondary: {
    fill: 'bg-slate-900 text-white',
    outline: 'border border-slate-900 text-slate-900 bg-white',
  },
}

type ButtonProps = Omit<RAButtonProps, 'style'> & {
  variant?: 'primary' | 'secondary'
  style?: 'fill' | 'outline'
}

export const Button = ({
  variant = 'primary',
  style = 'fill',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <RAButton
      {...props}
      className={cn(
        'h-8 w-fit rounded-md px-4 py-2 text-xs font-medium uppercase tracking-wider outline-none',
        classes[variant][style],
        className
      )}
    >
      {children}
    </RAButton>
  )
}
