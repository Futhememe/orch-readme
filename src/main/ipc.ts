import { ipcMain } from 'electron'
// import { randomUUID } from 'node:crypto'
import { IPC } from '../shared/constants/ipc'
import { store } from './store'
import {
  CreateProjectRequest,
  FetchAllProjectsResponse,
  CreateProjectResponse,
  IProject
} from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'
import { configRspress } from './utils/create-project'
import { transformProjectName } from './utils/transform-project-name'

ipcMain.handle(IPC.PROJECTS.FETCH_ALL, async (): Promise<FetchAllProjectsResponse> => {
  return {
    data: Object.values(store.get('projects'))
  }
})

ipcMain.handle(
  IPC.PROJECTS.CREATE,
  async (_, { path, title }: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const id = randomUUID()

    const formattedText = transformProjectName(title)

    const project: IProject = {
      id,
      title: formattedText,
      path
    }

    const { success } = await configRspress({
      path,
      title: formattedText
    })

    if (success) {
      store.set(`projects.${id}`, project)
    }

    return {
      data: project
    }
  }
)
