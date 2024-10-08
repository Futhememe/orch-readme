import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import { common, createLowlight } from 'lowlight'
import { FloatingPlaceholder } from '../FloatingPlaceholder'
import { FloatingMenu } from '../FloatingMenu'
import { BubbleMenu } from '../BubbleMenu'

const lowlight = createLowlight(common)

lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')
lowlight.register({ js, ts })

export interface OnContentUpdatedParams {
  title: string
  content: string
  jsonContent?: JSONContent
}

interface IEditor {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
  onCreateEditor?: (content: JSONContent) => void
}

export const Editor = ({ content, onContentUpdated, onCreateEditor }: IEditor): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none'
      }),
      Document.extend({
        content: 'heading block*'
      }),
      Underline,
      CodeBlockLowlight.configure({
        defaultLanguage: 'js',
        lowlight
      })
    ],
    onCreate: ({ editor }) => {
      const jsonContent = editor.getJSON()

      onCreateEditor?.(jsonContent)
    },
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.*)<\/h1>(?<content>.*)?)/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const jsonContent = editor.getJSON()

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      onContentUpdated({ title, content, jsonContent })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none text-blackfont-500 prose prose-headings:mt-0'
      }
    }
  })

  return (
    <div>
      {editor && <FloatingPlaceholder editor={editor} />}
      {editor && <FloatingMenu editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent className="w-[65ch]" editor={editor} />
    </div>
  )
}
