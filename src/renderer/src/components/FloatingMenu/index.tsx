import { FloatingMenu as TipFloatingMenu, FloatingMenuProps } from '@tiptap/react'
import { Floating } from './Floating'
import {
  Code,
  ListBullets,
  ListNumbers,
  Quotes,
  TextHOne,
  TextHThree,
  TextHTwo
} from '@phosphor-icons/react'

interface IFloatingMenu extends Omit<FloatingMenuProps, 'children'> {}

export const FloatingMenu = ({ editor, ...rest }: IFloatingMenu): JSX.Element => {
  return (
    <TipFloatingMenu
      {...rest}
      className="floating-menu"
      editor={editor}
      shouldShow={({ state, view }) => {
        const { selection } = state
        const { $anchor, empty } = selection
        const isRootDepth = $anchor.depth === 1
        const isCommandOnLine =
          $anchor.parent.isTextblock &&
          !$anchor.parent.type.spec.code &&
          $anchor.parent.textContent === '/'

        if (!view.hasFocus() || !empty || !isRootDepth || !isCommandOnLine || !editor?.isEditable) {
          return false
        }
        return true
      }}
      tippyOptions={{ placement: 'bottom-start', delay: 600 }}
    >
      <Floating.Root>
        <Floating.Title title="Blocos basicos" />
        <Floating.Button
          icon={<TextHOne weight="bold" size={16} />}
          title="Heading 1"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <Floating.Button
          icon={<TextHTwo weight="bold" size={16} />}
          title="Heading 2"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <Floating.Button
          icon={<TextHThree weight="bold" size={16} />}
          title="Heading 3"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <Floating.Button
          icon={<ListBullets weight="bold" size={16} />}
          title="Bullet list"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <Floating.Button
          icon={<ListNumbers weight="bold" size={16} />}
          title="Numbered list"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <Floating.Button
          icon={<Quotes weight="bold" size={16} />}
          title="Quote"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <Floating.Title title="Blocos de midia" />
        <Floating.Button
          icon={<Code weight="bold" size={16} />}
          title="Code"
          onClick={() => editor?.chain().focus().toggleCodeBlock({ language: 'javascript' }).run()}
        />
      </Floating.Root>
    </TipFloatingMenu>
  )
}
