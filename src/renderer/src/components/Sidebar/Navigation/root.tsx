import { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}

export function Root(props: RootProps): JSX.Element {
  return <nav className="flex mx-2 flex-col gap-8 text-grey-800" {...props} />
}
