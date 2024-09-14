import { mkdirSync } from 'fs'
import { CreateProjectRequest } from '../../shared/types/ipc'

export const createRspressProject = async ({
  path,
  title
}: CreateProjectRequest): Promise<void> => {
  mkdirSync(`${path}/${title}`)
}
