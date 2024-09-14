import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logosrc from '@renderer/assets/orch-logo.svg'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { ProjectControlProvider } from '../../contexts/project'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const location = useLocation()

  return (
    <ProjectControlProvider>
      <Collapsible.Root
        onOpenChange={setIsSidebarOpen}
        defaultOpen
        className="h-screen w-screen text-blackfont-500 flex"
      >
        {location.pathname !== '/' && <Sidebar />}
        <div className="flex-1 flex flex-col max-h-screen overflow-x-hidden">
          {location.pathname !== '/' && <Header isSidebarOpen={isSidebarOpen} />}
          <Outlet />
        </div>

        <div className="absolute left-6 bottom-6">
          <img src={logosrc} alt="" />
        </div>
      </Collapsible.Root>
    </ProjectControlProvider>
  )
}
