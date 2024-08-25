import { Router, Route } from 'electron-router-dom'
// import { Blank } from './pages/blank'
// import { Document } from './pages/document'
import { Default } from './pages/layouts/Default'
import { Blank } from './pages/blank'

export function Routes(): JSX.Element {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />

          {/* <Route path="/document/:id" element={<Document />} /> */}
        </Route>
      }
    />
  )
}
