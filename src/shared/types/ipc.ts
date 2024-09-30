import { Dirent } from 'fs'

export interface IProject {
  id: string
  title: string
  path: string
}

/**
 * Request
 */

export interface CreateProjectRequest extends Omit<IProject, 'id'> {}

export interface FetchProjectRequest {
  id: string
}

export interface DeleteProjectRequest {
  id: string
}

export interface VerifyProjectPathsRequest {
  projects: IProject[]
}

export interface IVerifiedProjects extends IProject {
  has_changed_path: boolean
}

export interface VerifyProjectPathsResponse {
  projects: IVerifiedProjects[]
}

/**
 * Response
 */

export interface FetchAllProjectsResponse {
  data: IProject[]
}

export interface FetchProjectResponse {
  data: IProject
}

export interface CreateProjectResponse {
  data: IProject
}

export interface SelectFolderToProjectResponse {
  success: boolean
  data: string[]
}

export interface FetchProjectFiles {
  success: boolean
  data: Dirent[]
}
