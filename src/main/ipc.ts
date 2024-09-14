import { ipcMain } from 'electron'
// import { randomUUID } from 'node:crypto'
import { IPC } from '../shared/constants/ipc'
import { store } from './store'
import { FetchAllProjectsResponse } from '../shared/types/ipc'

ipcMain.handle(IPC.PROJECTS.FETCH_ALL, async (): Promise<FetchAllProjectsResponse> => {
  return {
    data: Object.values(store.get('projects'))
  }
})

// ipcMain.handle(
//   IPC.DOCUMENTS.FETCH,
//   async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
//     const document = store.get(`documents.${id}`) as IDocument

//     return {
//       data: document
//     }
//   }
// )
