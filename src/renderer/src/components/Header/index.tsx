import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretDoubleRight, Plus } from '@phosphor-icons/react'
// import { useParams } from 'react-router-dom'
import { Button } from '../../shadcn/components/ui/button'

interface IHeader {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: IHeader): JSX.Element {
  // const { id } = useParams<{ id: string }>()
  // const queryClient = useQueryClient()
  // const navigate = useNavigate()
  const isMacOS = process.platform === 'darwin'

  // const { data: documents } = useQuery(['documents'], async () => {
  //   const res = await window.api.fetchDocuments()

  //   return res.data
  // })

  // const { mutateAsync: deleteDocument, isLoading: isDeletingDocument } = useMutation(
  //   async () => {
  //     await window.api.deleteDocument({ id: id! })
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.setQueryData<IDocument[]>(['documents'], (documents) => {
  //         return documents?.filter((document) => document?.id !== id)
  //       })

  //       navigate('/')
  //     },
  //   },
  // )

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-grey-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag sticky top-0 z-10',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen
        }
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-grey-800 hover:text-rotion-50 region-no-drag', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen
        })}
      >
        <CaretDoubleRight weight="bold" className="h-4 w-4" />
      </Collapsible.Trigger>

      {/* {id && (
        <>
          <div className="inline-flex region-no-drag">
            <button
              onClick={() => console.log('deu')}
              // disabled={isDeletingDocument}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-60"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )} */}
      <div className="inline-flex flex-1">
        <div className="flex flex-1 w-full items-center justify-between">
          <p className="text-base text-blackfont-500 font-[501] region-no-drag">
            Pasta selecionada
          </p>
          <Button variant="outline" size="icon" className="region-no-drag">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
