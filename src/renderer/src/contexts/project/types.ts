import { ReactNode } from 'react'

export interface IProjectControlContext {
  createProjectDialogOpen: boolean
  openCreateProjectDialog: () => void
  createProject: (path: string, projectName: string) => void
}

export interface IProjectControlProvider {
  children: ReactNode
}
