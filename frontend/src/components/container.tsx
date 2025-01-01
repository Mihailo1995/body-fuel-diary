import { cn } from '#helpers/cn'

export const Container = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('p-5', props.className)}
    />
  )
}
