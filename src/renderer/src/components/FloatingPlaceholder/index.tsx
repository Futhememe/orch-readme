import { FloatingMenu, FloatingMenuProps } from '@tiptap/react'

interface IFloatingMenu extends Omit<FloatingMenuProps, 'children'> {}

export const FloatingPlaceholder = ({ editor, ...rest }: IFloatingMenu): JSX.Element => {
  return (
    <FloatingMenu
      {...rest}
      className="floating-placeholder"
      editor={editor}
      shouldShow={({ state, view }) => {
        const { selection } = state
        const { $anchor, empty } = selection
        const isRootDepth = $anchor.depth === 1
        const isEmptyAndNotHeading =
          $anchor.parent.isTextblock &&
          !$anchor.parent.type.spec.code &&
          !$anchor.parent.textContent &&
          !editor?.isActive('heading')

        if (
          !view.hasFocus() ||
          !empty ||
          !isRootDepth ||
          !isEmptyAndNotHeading ||
          !editor?.isEditable
        ) {
          return false
        }
        return true
      }}
    >
      <p className="text-xs text-grey-700 font-medium">
        Pressione &rsquo; / &rsquo; para abrir o menu
      </p>
    </FloatingMenu>
  )
}
