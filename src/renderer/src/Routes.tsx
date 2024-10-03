import { Router, Route } from 'electron-router-dom'
import { Blank } from './pages/blank'
import { Default } from './pages/layouts/default'
import { Document } from './pages/document'

export function Routes(): JSX.Element {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />

          <Route path="/project/:id">
            <Route path="/project/:id/document/:documentId" element={<Document />} />
          </Route>
        </Route>
      }
    />
  )
}
