import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'
import NotFound from './pages/NotFound'
import AllItems from './pages/AllItems'
import Form from "./components/items/Form";

function App() {
  return (
    <div className="App">
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/items" element={<AllItems />} />
            <Route path="/new-item" element={<Form />} />
            <Route path="/items/:itemId" element={<NotFound />}>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  )
}

export default App
