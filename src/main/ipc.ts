import { ipcMain } from 'electron'
// import { randomUUID } from 'node:crypto'
import { IPC } from '../shared/constants/ipc'
import { store } from './store'
import {
  CreateProjectRequest,
  FetchAllProjectsResponse,
  CreateProjectResponse,
  IProject,
  DeleteProjectRequest,
  VerifyProjectPathsResponse,
  FetchProjectResponse,
  FetchProjectRequest,
  FetchProjectFiles
} from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'
import { configRspress } from './utils/create-project'
import { transformProjectName } from './utils/transform-project-name'
import { existsSync } from 'node:fs'
import { getFolderStructure } from './utils/get-folder-structure'

ipcMain.handle(IPC.PROJECTS.FETCH_ALL, async (): Promise<FetchAllProjectsResponse> => {
  return {
    data: Object.values(store.get('projects'))
  }
})

ipcMain.handle(
  IPC.PROJECTS.FETCH_BY_ID,
  async (_, { id }: FetchProjectRequest): Promise<FetchProjectResponse> => {
    const project = store.get(`projects.${id}`) as IProject

    return {
      data: project
    }
  }
)

ipcMain.handle(IPC.PROJECTS.DELETE, async (_, { id }: DeleteProjectRequest): Promise<void> => {
  // @ts-ignore cant get id
  store.delete(`projects.${id}`)
})

ipcMain.handle(
  IPC.PROJECTS.VERIFY_PATHS,
  async (_, data: { projects: IProject[] }): Promise<VerifyProjectPathsResponse> => {
    if (data?.projects.length > 0) {
      return {
        projects: data.projects?.map((project) => {
          if (!existsSync(project.path)) {
            return { ...project, has_changed_path: true }
          }

          return { ...project, has_changed_path: false }
        })
      }
    }

    return { projects: [] }
  }
)

ipcMain.handle(
  IPC.PROJECTS.CREATE,
  async (_, { path, title }: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const id = randomUUID()

    const formattedText = transformProjectName(title)

    const { success, path: fullPath } = await configRspress({
      path,
      title: formattedText
    })

    const project: IProject = {
      id,
      title: title,
      path: fullPath
    }

    if (success) {
      store.set(`projects.${id}`, project)
    }

    return {
      data: project
    }
  }
)

ipcMain.handle(
  IPC.PROJECTS.GET_PROJECT_FILES,
  async (_, { id }: FetchProjectRequest): Promise<FetchProjectFiles> => {
    const project = store.get(`projects.${id}`) as IProject

    if (!project) {
      return { success: false, data: [] }
    }

    try {
      const dirent = getFolderStructure(`${project.path}/docs`)

      return {
        success: true,
        data: dirent
      }
    } catch (error) {
      return { success: false, data: [] }
    }
  }
)
