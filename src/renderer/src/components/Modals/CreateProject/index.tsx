import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription
} from '../../../shadcn/components/ui/dialog'
import { useProjectControl } from '../../../contexts/project'
import { Button } from '../../../shadcn/components/ui/button'
import { Folder } from '@phosphor-icons/react'
import { Input } from '../../../shadcn/components/ui/input'
import { Label } from '../../../shadcn/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProjectSchema } from './schema'

export const CreateProjectModal = (): JSX.Element => {
  const { createProjectDialogOpen, closeCreateProjectDialog } = useProjectControl()

  const { control, setValue } = useForm({
    resolver: zodResolver(createProjectSchema)
  })

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
      setValue('parh', data.data[0])
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
          <DialogDescription>
            Enter a name for the project and a folder for it to be created in. The project will be
            created without being linked to the Orch Readme.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-2 gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Project name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} required id="name" placeholder="Your project name" />
              )}
            />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="path">Select project folder</Label>
              <Controller
                name="path"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="path"
                    required
                    readOnly
                    placeholder="/ path / to / example"
                    value={field.value}
                  />
                )}
              />
            </div>
            <Button onClick={selectPorjectFolder} type="button" size="icon" className="mb-[2px]">
              <Folder className="h-5 w-5" />
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
