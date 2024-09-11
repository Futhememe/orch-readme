import { Plus } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export function CreateDocument(): JSX.Element {
  // const queryClient = useQueryClient()
  const navigate = useNavigate()

  // const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } = useMutation(
  //   async () => {
  //     const response = await window.api.createDocument()

  //     return response.data
  //   },
  //   {
  //     onSuccess: (data) => {
  //       queryClient.setQueryData<IDocument[]>(['documents'], (documents) => {
  //         if (documents && documents?.length >= 0) {
  //           return [...documents, data]
  //         } else {
  //           return [data]
  //         }
  //       })

  //       navigate(`/document/${data.id}`)
  //     }
  //   }
  // )

  // useEffect(() => {
  //   function onNewDocument() {
  //     createDocument()
  //   }

  //   const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [createDocument])

  return (
    <button
      onClick={() => navigate('document/novo-id')}
      // disabled={isCreatingNewDocument}
      className="flex items-center mx-3 text-[15px] gap-1 text-grey-800 py-1 px-2 rounded-lg group"
    >
      <Plus weight="bold" className="h-4 w-4" />
      new project
    </button>
  )
}
