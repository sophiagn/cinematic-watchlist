import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
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
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={protectedPage(<Home />)} />
      </Routes>
    </BrowserRouter>
  )
}