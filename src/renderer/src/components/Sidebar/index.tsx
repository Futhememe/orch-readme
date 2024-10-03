import * as Navigation from './Navigation'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { SidebarSimple } from '@phosphor-icons/react'
import { Search } from './Search'
import { CreateDocument } from './CreateDocument'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IProject, IVerifiedProjects } from '@/src/shared/types/ipc'
import { useNavigate, useParams } from 'react-router-dom'
import { FileTreeDemo } from './FileTree'

export function Sidebar(): JSX.Element {
  const isMacOS = process.platform === 'darwin'
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()
  // const location = useLocation()

  const { data, refetch: refetchAllProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await window.api.fetchProjects()

      return res.data
    }
  })

  const { data: verifiedProjects, mutate: verifyProjectsPaths } = useMutation({
    mutationKey: ['projects-verify'],
    mutationFn: async (projects: IProject[]) => {
      const response = await window.api.verifyProjectsPaths({ projects })

      return response.projects
    }
  })

  const { mutate: deleteProject } = useMutation({
    mutationKey: ['project-delete'],
    mutationFn: async (id: string) => {
      await window.api.deleteProject({ id })
    },
    onSuccess: () => {
      refetchAllProjects()
    }
  })

  const removeInvalidaProjectPaths = (invalidProjects: IVerifiedProjects[]): void => {
    invalidProjects?.map((project) => {
      if (project.has_changed_path) {
        deleteProject(project.id)
      }
    })
  }

  useEffect(() => {
    if (verifiedProjects && verifiedProjects?.length > 0) {
      const hasValidProject = verifiedProjects.some((project) => project.has_changed_path === false)

      if (!hasValidProject) {
        navigate('/')
      }
      removeInvalidaProjectPaths(verifiedProjects)
    }
  }, [verifiedProjects])

  useEffect(() => {
    verifyProjectsPaths(data ?? [])
  }, [data])

  return (
    <Collapsible.Content className="flex-shrink-0 border-r border-grey-600 h-screen relative group data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut overflow-hidden">
      <Collapsible.Trigger
        className={clsx(
          'absolute h-5 w-5 right-4 text-grey-800 hover:text-grey-800/70 inline-flex items-center justify-center z-10',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS
          }
        )}
      >
        <SidebarSimple weight="bold" className="h-4 w-4" />
      </Collapsible.Trigger>

      <div
        className={clsx('region-drag h-6', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      />
      <div
        className={clsx('h-6', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      />

      <div
        className={clsx(
          'flex-1 flex flex-col gap-4 h-full w-[240px] group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 transition-opacity duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <Search />
        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Projects</Navigation.SectionTitle>
            <Navigation.SectionContent>
              {data?.map((document) => (
                <Navigation.Link
                  to={`/project/${document.id}`}
                  selected={document.id === id}
                  key={document.id}
                >
                  {document.title || 'Untitled'}
                </Navigation.Link>
              ))}
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        <CreateDocument />

        <div className="w-full pl-4 pr-4">
          <div className="w-full h-[2px] bg-grey-600" />
        </div>

        <FileTreeDemo />
      </div>
    </Collapsible.Content>
  )
}
