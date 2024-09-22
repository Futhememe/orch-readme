import { Plus } from '@phosphor-icons/react'
import { useProjectControl } from '../../contexts/project'

export function CreateDocument(): JSX.Element {
  const { openCreateProjectDialog } = useProjectControl()

  return (
    <button
      onClick={() => {
        openCreateProjectDialog()
      }}
      // disabled={isCreatingNewDocument}
      className="flex items-center mx-3 text-[15px] gap-1 text-grey-800 py-1 px-2 rounded-lg group"
    >
      <Plus weight="bold" className="h-4 w-4" />
      new project
    </button>
  )
}
