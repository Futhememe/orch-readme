import Store from 'electron-store'
import { IProject } from '../shared/types/ipc'

interface IStore {
  projects: Record<string, IProject>
}

export const store = new Store<IStore>({
  defaults: {
    projects: {}
  }
})
