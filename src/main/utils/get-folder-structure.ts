import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { DirElement } from '../../shared/types/ipc'

export const getFolderStructure = (dirPath: string): DirElement[] => {
  const result: DirElement[] = []

  const filesAndFolders = readdirSync(dirPath) // Synchronously read files and directories in the path

  filesAndFolders.forEach((fileOrFolder) => {
    const fullPath = join(dirPath, fileOrFolder)
    const isDirectory = statSync(fullPath).isDirectory() // Check if it's a directory

    const element: DirElement = {
      type: isDirectory ? 'directory' : 'file',
      id: crypto.randomUUID(), // Increment and assign unique id
      isSelectable: true,
      name: fileOrFolder
    }

    if (isDirectory) {
      // If it's a directory, recursively get its children
      // @ts-ignore children is not read only
      element.children = getFolderStructure(fullPath)
    }

    result.push(element)
  })

  return result
}
