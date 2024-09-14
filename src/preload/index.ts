import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/constants/ipc'
import { FetchAllProjectsResponse, SelectFolderToProjectResponse } from '../shared/types/ipc'

// Custom APIs for renderer
export const api = {
  fetchProjects(): Promise<FetchAllProjectsResponse> {
    return ipcRenderer.invoke(IPC.PROJECTS.FETCH_ALL)
  },

  selectFolder(): Promise<SelectFolderToProjectResponse> {
    return ipcRenderer.invoke(IPC.ACTIONS.SELECT_FOLDER)
  }

  // fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
  //   return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  // },

  // createDocument(): Promise<CreateDocumentResponse> {
  //   return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  // },

  // saveDocument(req: SaveDocumentRequest): Promise<void> {
  //   return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  // },

  // deleteDocument(req: DeleteDocumentRequest): Promise<void> {
  //   return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  // },

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
