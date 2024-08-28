// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { IDocument } from '@shared/types/ipc'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
// import { ToC } from '../components/ToC'
import { JSONContent } from '@tiptap/react'

export const Document = () => {
  const [editorContent, setEditorContent] = useState<JSONContent | undefined>(undefined)
  const [content, setContent] = useState('')

  // const { id } = useParams<{ id: string }>()

  // const { data, isFetching } = useQuery(['document', id], async () => {
  //   const response = await window.api.fetchDocument({ id: id! })

  //   return response.data
  // })

  // const queryClient = useQueryClient()

  // const { mutateAsync: saveDocument } = useMutation(
  //   async ({ title, content }: OnContentUpdatedParams) => {
  //     await window.api.saveDocument({
  //       id: id!,
  //       title,
  //       content
  //     })
  //   },
  //   {
  //     onSuccess: (_, { title }) => {
  //       queryClient.setQueryData<IDocument[]>(['documents'], (documents) => {
  //         return documents?.map((document) => {
  //           if (document.id === id) {
  //             return { ...document, title }
  //           }
  //           return document
  //         })
  //       })
  //     }
  //   }
  // )

  // const initialContent = useMemo(() => {
  //   // if (data) {
  //   //   return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
  //   // }

  //   return ''
  // }, [data])

  const handleEditorContentUpdated = ({ title, content, jsonContent }: OnContentUpdatedParams) => {
    // saveDocument({
    //   title,
    //   content,
    // })
    setContent(content)
    setEditorContent(jsonContent)
  }

  const handleEditorContentCreated = (content: JSONContent) => {
    setEditorContent(content)
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <section className="flex-1 flex flex-col items-center max-h-screen">
        {/* {data && ( */}
        <Editor
          content={content}
          onContentUpdated={handleEditorContentUpdated}
          onCreateEditor={handleEditorContentCreated}
        />
        {/* )} */}
      </section>
    </main>
  )
}
