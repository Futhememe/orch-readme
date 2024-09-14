import { createContext, useContext, useState } from 'react'
import { IProjectControlContext, IProjectControlProvider } from './types'

const ProjectContext = createContext<IProjectControlContext>({
  openCreateProjectDialog: () => {},
  createProject: () => {},
  closeCreateProjectDialog: () => {},
  createProjectDialogOpen: false
})

export const ProjectControlProvider = ({ children }: IProjectControlProvider): JSX.Element => {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState<boolean>(false)

  const openCreateProjectDialog = (): void => {
    setCreateProjectDialogOpen(true)
  }

  const closeCreateProjectDialog = (): void => {
    setCreateProjectDialogOpen(false)
  }

  const createProject = (): void => {}

  return (
    <ProjectContext.Provider
      value={{
        createProjectDialogOpen,
        openCreateProjectDialog,
        closeCreateProjectDialog,
        createProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectControl = (): IProjectControlContext => {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProjectControl should only be used inside <ProjectControlProvider />')
  }

  return context
}
