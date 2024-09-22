import { Folder, FolderOpen } from '@phosphor-icons/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface LinkProps {
  to: string
  children: ReactNode
  selected?: boolean
}

export function Link({ children, to, selected = false }: LinkProps): JSX.Element {
  return (
    <NavLink
      to={to}
      className={() =>
        clsx(
          'flex items-center text-[15px] gap-1 text-blackfont-500 py-1 px-2 rounded-lg group hover:bg-grey-600/70',
          {
            'bg-grey-600/80': selected
          }
        )
      }
    >
      {selected ? (
        <FolderOpen weight="bold" className="h-4 w-4" />
      ) : (
        <Folder weight="bold" className="h-4 w-4" />
      )}
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  )
}
