import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

const protectedPage = (element: React.ReactNode) => (
  <ProtectedRoute>
    {element}
  </ProtectedRoute>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={protectedPage(<Home />)} />
      </Routes>
    </BrowserRouter>
  )
}