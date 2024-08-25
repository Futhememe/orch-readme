import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import logosrc from '@renderer/assets/orch-logo.svg'
import { Sidebar } from '../../components/Sidebar'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  return (
    <Collapsible.Root
      onOpenChange={setIsSidebarOpen}
      defaultOpen
      className="h-screen w-screen text-blackfont-500 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen overflow-x-hidden">
        <Outlet />
      </div>

      <div className="absolute left-6 bottom-6">
        <img src={logosrc} alt="" />
      </div>
    </Collapsible.Root>
  )
}
