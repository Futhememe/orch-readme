import { BubbleMenu as TipBubbleMenu, BubbleMenuProps } from '@tiptap/react'
import { TextBolder, TextItalic, TextStrikethrough, TextUnderline } from '@phosphor-icons/react'
import clsx from 'clsx'
import { Toggle } from '../../shadcn/components/ui/toggle'

interface IBubbleMenu extends Omit<BubbleMenuProps, 'children'> {}

export const BubbleMenu = ({ editor }: IBubbleMenu): JSX.Element => {
  return (
    <TipBubbleMenu editor={editor}>
      <Toggle
        variant={'outline'}
        className={clsx('rounded-r-none', {
          'bg-backgroundgrey-500': editor?.isActive('bold')
        })}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <TextBolder weight={editor?.isActive('bold') ? 'bold' : 'regular'} size={16} />
      </Toggle>
      <Toggle
        variant={'outline'}
        className={clsx('rounded-none', {
          'bg-backgroundgrey-500': editor?.isActive('italic')
        })}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <TextItalic size={16} />
      </Toggle>
      <Toggle
        variant={'outline'}
        className={clsx('rounded-none', {
          'bg-backgroundgrey-500': editor?.isActive('strike')
        })}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <TextStrikethrough size={16} />
      </Toggle>
      <Toggle
        variant={'outline'}
        className={clsx('rounded-l-none', {
          'bg-backgroundgrey-500': editor?.isActive('underline')
        })}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <TextUnderline size={16} />
      </Toggle>
    </TipBubbleMenu>
  )
}
