import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* Combining clsx with tailwind-merge allows us to conditionally join
Tailwind CSS classes in classNames together without style conflicts. */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}
