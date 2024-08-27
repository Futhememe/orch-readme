import { Router, Route } from 'electron-router-dom'
// import { Blank } from './pages/blank'
// import { Document } from './pages/document'
import { Blank } from './pages/blank'
import { Default } from './pages/layouts/default'

export function Routes(): JSX.Element {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />

          <Route path="/project/:id" element={<h1>Hello</h1>} />
          <Route path="/document/:id" element={<h2>Sou uma doc</h2>} />
        </Route>
      }
    />
  )
}
