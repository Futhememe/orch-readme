import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from '../../../shadcn/components/ui/dialog'
import { useProjectControl } from '../../../contexts/project'
import { Button } from '../../../shadcn/components/ui/button'
import { Folder } from '@phosphor-icons/react'
import { Input } from '../../../shadcn/components/ui/input'
import { Label } from '../../../shadcn/components/ui/label'
import { useQuery } from '@tanstack/react-query'

export const CreateProjectModal = (): JSX.Element => {
  const { createProjectDialogOpen, closeCreateProjectDialog } = useProjectControl()

  const { refetch: selectFolder } = useQuery({
    enabled: false,
    queryKey: ['directory'],
    queryFn: async () => {
      const response = await window.api.selectFolder()

      return response
    }
  })

  const selectPorjectFolder = async (): Promise<void> => {
    const { data } = await selectFolder()

    if (data?.success) {
      console.log(data.data)
    }
  }

  return (
    <Dialog
      open={createProjectDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeCreateProjectDialog()
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new documentation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Project name</Label>
            <Input id="name" placeholder="Your project name" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="project">Select project folder</Label>
              <Input id="project" readOnly placeholder="/ path / to / example" />
            </div>
            <Button onClick={selectPorjectFolder} type="button" size="sm" className="px-3">
              <Folder className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
