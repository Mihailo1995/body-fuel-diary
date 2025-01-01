import React from 'react'
import { Input as RAInput } from 'react-aria-components'

import { cn } from '#helpers/cn'

type InputProps = React.ComponentProps<typeof RAInput>

export const NumberInput = ({ className, ...props }: InputProps) => {
  return (
    <RAInput
      {...props}
      className={cn('w-20 appearance-none rounded border border-black p-1 outline-none', className)}
      // type="number"
      inputMode="numeric"
      pattern="[0-9]+([,\.][0-9]+)?"
    />
  )
}

export const TextInput = ({ className, ...props }: InputProps) => {
  return (
    <RAInput
      {...props}
      className={cn('outline-none', className)}
    />
  )
}
