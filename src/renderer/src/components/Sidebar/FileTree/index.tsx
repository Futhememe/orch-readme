import { useParams } from 'react-router-dom'
import { File, Folder, Tree } from '../../FileTree'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
// import { Dirent } from 'fs'
// import { Element } from './types'

export function FileTreeDemo(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const { data: projectFiles, refetch: getProjectFiles } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await window.api.getProjectFiles({ id: id! })

      console.log(res)

      return res?.data
    }
  })

  // const createElements = (files: Dirent[]): Element[] => {

  // }

  useEffect(() => {
    if (projectFiles && projectFiles?.length > 0) {
      console.log('log: ', projectFiles)
    }
  }, [projectFiles])

  useEffect(() => {
    getProjectFiles()
  }, [])

  return (
    <Tree
      className="p-2 overflow-hidden rounded-md bg-background"
      initialExpandedItems={[]}
      elements={ELEMENTS}
    >
      <Folder element="src" value="1">
        <Folder value="2" element="app">
          <File value="3">
            <p>layout.tsx</p>
          </File>
          <File value="4">
            <p>page.tsx</p>
          </File>
        </Folder>
        <Folder value="5" element="components">
          <Folder value="6" element="ui">
            <File value="7">
              <p>button.tsx</p>
            </File>
          </Folder>
          <File value="8">
            <p>header.tsx</p>
          </File>
          <File value="9">
            <p>footer.tsx</p>
          </File>
        </Folder>
        <Folder value="10" element="lib">
          <File value="11">
            <p>utils.ts</p>
          </File>
        </Folder>
      </Folder>
    </Tree>
  )
}

const ELEMENTS = [
  {
    id: '1',
    isSelectable: true,
    name: 'src',
    children: [
      {
        id: '2',
        isSelectable: true,
        name: 'app',
        children: [
          {
            id: '3',
            isSelectable: true,
            name: 'layout.tsx'
          },
          {
            id: '4',
            isSelectable: true,
            name: 'page.tsx'
          }
        ]
      },
      {
        id: '5',
        isSelectable: true,
        name: 'components',
        children: [
          {
            id: '6',
            isSelectable: true,
            name: 'header.tsx'
          },
          {
            id: '7',
            isSelectable: true,
            name: 'footer.tsx'
          }
        ]
      },
      {
        id: '8',
        isSelectable: true,
        name: 'lib',
        children: [
          {
            id: '9',
            isSelectable: true,
            name: 'utils.ts'
          }
        ]
      }
    ]
  }
]
