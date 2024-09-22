import { createContext, useContext, useEffect, useState } from 'react'
import { IProjectControlContext, IProjectControlProvider } from './types'
import { useMutation } from '@tanstack/react-query'
import { CreateProjectRequest } from '@/src/shared/types/ipc'
import { useNavigate } from 'react-router-dom'

const ProjectContext = createContext<IProjectControlContext>({
  openCreateProjectDialog: () => {},
  createProject: () => {},
  closeCreateProjectDialog: () => {},
  createProjectDialogOpen: false
})

export const ProjectControlProvider = ({ children }: IProjectControlProvider): JSX.Element => {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const openCreateProjectDialog = (): void => {
    setCreateProjectDialogOpen(true)
  }

  const closeCreateProjectDialog = (): void => {
    setCreateProjectDialogOpen(false)
  }

  const { mutate: createNewProject, data: projectResponse } = useMutation({
    mutationKey: ['directory'],
    mutationFn: async ({ path, title }: CreateProjectRequest) => {
      const response = await window.api.createProject({ path, title })

      return response
    }
  })

  const createProject = (path: string, projectName: string): void => {
    createNewProject({ path, title: projectName })
  }

  useEffect(() => {
    console.log(projectResponse)
    if (projectResponse && projectResponse.data) {
      closeCreateProjectDialog()
      navigate(`project/${projectResponse?.data?.id}`)
    }
  }, [projectResponse])

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
