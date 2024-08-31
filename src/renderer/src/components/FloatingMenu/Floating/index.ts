import { FloatingButton } from './button'
import { FloatingRoot } from './root'
import { FloatingTitle } from './title'

interface IFloating {
  Root: typeof FloatingRoot
  Button: typeof FloatingButton
  Title: typeof FloatingTitle
}

export const Floating: IFloating = {
  Button: FloatingButton,
  Root: FloatingRoot,
  Title: FloatingTitle
}
