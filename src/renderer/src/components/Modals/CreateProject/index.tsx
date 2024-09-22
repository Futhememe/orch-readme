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

import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProjectSchema, ICreateProjectSchema } from './schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../shadcn/components/ui/form'
import clsx from 'clsx'

export const CreateProjectModal = (): JSX.Element => {
  const { createProjectDialogOpen, closeCreateProjectDialog, createProject } = useProjectControl()

  const formInteractions = useForm({
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
      formInteractions.clearErrors('path')
      formInteractions.setValue('path', data.data[0])
    }
  }

  const onSubmit = ({ path, name }: ICreateProjectSchema): void => {
    formInteractions.reset()
    createProject(path, name)
  }

  return (
    <Dialog
      open={createProjectDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          formInteractions.reset()
          closeCreateProjectDialog()
        }
      }}
    >
      <DialogContent>
        <Form {...formInteractions}>
          {/* @ts-ignore any */}
          <form onSubmit={formInteractions.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-5">
              <DialogTitle>Create your new documentation</DialogTitle>
              <DialogDescription>
                Enter a name for the project and a folder for it to be created in. The project will
                be created without being linked to the Orch Readme.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-2 gap-2">
              <div className="grid flex-1 gap-2">
                <FormField
                  name="name"
                  control={formInteractions.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Project name</FormLabel>
                      <FormControl>
                        <Input {...field} id="name" placeholder="Your project name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-2 items-end">
                <div className="grid flex-1 gap-2">
                  <FormField
                    name="path"
                    control={formInteractions.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="path">Select project folder</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="path"
                            readOnly
                            placeholder="/ path / to / example"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  onClick={selectPorjectFolder}
                  type="button"
                  size="icon"
                  className={clsx('mb-[2px]', {
                    'mb-[26px]': !!formInteractions.formState.errors.path?.message
                  })}
                >
                  <Folder className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <DialogFooter className="sm:justify-between mt-8">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
