import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/constants/ipc'
import {
  CreateProjectResponse,
  CreateProjectRequest,
  FetchAllProjectsResponse,
  SelectFolderToProjectResponse,
  DeleteProjectRequest,
  VerifyProjectPathsRequest,
  VerifyProjectPathsResponse,
  FetchProjectRequest,
  FetchProjectResponse,
  FetchProjectFiles
} from '../shared/types/ipc'

// Custom APIs for renderer
export const api = {
  fetchProjects(): Promise<FetchAllProjectsResponse> {
    return ipcRenderer.invoke(IPC.PROJECTS.FETCH_ALL)
  },

  selectFolder(): Promise<SelectFolderToProjectResponse> {
    return ipcRenderer.invoke(IPC.ACTIONS.SELECT_FOLDER)
  },

  fetchProjectById(req: FetchProjectRequest): Promise<FetchProjectResponse> {
    return ipcRenderer.invoke(IPC.PROJECTS.FETCH_BY_ID, req)
  },

  createProject(req: CreateProjectRequest): Promise<CreateProjectResponse> {
    return ipcRenderer.invoke(IPC.PROJECTS.CREATE, req)
  },

  // saveDocument(req: SaveDocumentRequest): Promise<void> {
  //   return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  // },

  getProjectFiles(req: FetchProjectRequest): Promise<FetchProjectFiles> {
    return ipcRenderer.invoke(IPC.PROJECTS.GET_PROJECT_FILES, req)
  },

  deleteProject(req: DeleteProjectRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.PROJECTS.DELETE, req)
  },

  verifyProjectsPaths(req: VerifyProjectPathsRequest): Promise<VerifyProjectPathsResponse> {
    return ipcRenderer.invoke(IPC.PROJECTS.VERIFY_PATHS, req)
  }

  // onNewDocumentRequest(callback: () => void) {
  //   ipcRenderer.on('new-document', callback)

  //   return () => {
  //     ipcRenderer.off('new-document', callback)
  //   }
  // },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore defined in d.ts
  window.api = api
}
