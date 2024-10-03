import { useParams } from 'react-router-dom'
import { File, Folder, Tree, TreeViewElement } from '../../FileTree'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function FileTreeDemo(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const { data: projectFiles, refetch: getProjectFiles } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await window.api.getProjectFiles({ id: id! })
      return res?.data
    }
  })

  const renderTree = (nodes: TreeViewElement[]): JSX.Element[] => {
    return nodes.map((node) => (
      <>
        {node?.type === 'directory' ? (
          <Folder element={node.name} value={node.id}>
            {node.children && renderTree(node.children)}
          </Folder>
        ) : (
          <File value={node.id}>
            <p>{node.name}</p>
          </File>
        )}
      </>
    ))
  }

  useEffect(() => {
    getProjectFiles()
  }, [])

  return (
    <Tree
      className="p-2 overflow-hidden rounded-md bg-background"
      initialExpandedItems={[]}
      elements={(projectFiles as unknown as TreeViewElement[]) ?? []}
    >
      {projectFiles ? renderTree(projectFiles as unknown as TreeViewElement[]) : <></>}
    </Tree>
  )
}
