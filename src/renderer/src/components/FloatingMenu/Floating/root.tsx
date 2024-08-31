import { ReactNode } from 'react'

interface IFloatingRoot {
  children: ReactNode
}

export const FloatingRoot = ({ children }: IFloatingRoot): JSX.Element => {
  return (
    <div className="max-w-xs w-56 max-h-72 gap-2 border-grey-600 border rounded-md overflow-x-hidden overflow-y-auto">
      {children}
    </div>
  )
}
