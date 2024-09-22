import { Button } from '@renderer/shadcn/components/ui/button'

import emoticonsrc from '@renderer/assets/wow-emoticon.svg'
import plantsrc from '@renderer/assets/plant.svg'
import reticencesleftsrc from '@renderer/assets/reticences-left.svg'
import reticencesrightsrc from '@renderer/assets/reticences-right.svg'
import { useNavigate } from 'react-router-dom'
import { useProjectControl } from '../contexts/project'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IProject, IVerifiedProjects } from '@/src/shared/types/ipc'
import { useEffect } from 'react'

export function Blank(): JSX.Element {
  const navigate = useNavigate()

  const { openCreateProjectDialog } = useProjectControl()

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

      if (hasValidProject) {
        const firstValidProject = verifiedProjects.find(
          (project) => project.has_changed_path === false
        )
        navigate(`/project/${firstValidProject?.id}`)
      }
      removeInvalidaProjectPaths(verifiedProjects)
    }
  }, [verifiedProjects])

  useEffect(() => {
    verifyProjectsPaths(data ?? [])
  }, [data])

  return (
    <div className="items-center justify-center flex flex-1 flex-col relative top-0 ">
      <div className="absolute h-14 w-full region-drag top-0" />
      <div className="relative items-center justify-center flex flex-col">
        <h2 className="text-[2.5rem] font-medium">Welcome to</h2>
        <h1 className="text-[4rem] font-[501]">Orch Readme</h1>
        <Button onClick={openCreateProjectDialog} variant="default" className="mt-[24px]">
          Create documentation
        </Button>
        <p className="text-[1rem] mt-[14px]">or</p>
        <Button onClick={() => navigate('/project/novo')} variant="link">
          import project
        </Button>

        <img className="absolute left-[-80px] bottom-[70px]" src={emoticonsrc} alt="" />
        <img className="absolute right-[-60px] top-[-80px]" src={plantsrc} alt="" />
        <img className="absolute left-[-80px] top-0" src={reticencesleftsrc} alt="" />
        <img className="absolute right-[-96px] bottom-[70px]" src={reticencesrightsrc} alt="" />
      </div>
    </div>
  )
}
