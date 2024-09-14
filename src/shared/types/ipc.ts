export interface IProject {
  id: string
  title: string
  path: string
}

/**
 * Request
 */

// export interface SaveDocumentRequest extends IDocument {}

// export interface FetchDocumentRequest {
//   id: string
// }

// export interface DeleteDocumentRequest {
//   id: string
// }

/**
 * Response
 */

export interface FetchAllProjectsResponse {
  data: IProject[]
}

// export interface FetchDocumentResponse {
//   data: IDocument
// }

// export interface CreateDocumentResponse {
//   data: IDocument
// }

export interface SelectFolderToProjectResponse {
  success: boolean
  data: string[]
}
