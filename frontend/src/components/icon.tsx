import {
  BookOpenText,
  Calculator,
  EggCrack,
  Pencil,
  Trash,
  User,
  X,
  type IconWeight,
} from '@phosphor-icons/react'

import { cn } from '#helpers/cn'

const icons = {
  bookOpenText: BookOpenText,
  calculator: Calculator,
  eggCrack: EggCrack,
  pencil: Pencil,
  trash: Trash,
  user: User,
  x: X,
}

const sizes = {
  sm: 'text-base', // 16px
  md: 'text-lg', // 18px
  lg: 'text-[26px]', // 26px
}

export type IconProps = React.ComponentProps<'svg'> & {
  name: keyof typeof icons
  size?: keyof typeof sizes
  weight?: IconWeight
}

export const Icon = ({ name, size = 'md', weight, className, ...props }: IconProps) => {
  const I = icons[name]

  return (
    <I
      {...props}
      weight={weight}
      className={cn(sizes[size], className)}
    />
  )
}
