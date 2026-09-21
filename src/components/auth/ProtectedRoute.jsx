import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-ink text-cream">Loading workspace...</div>
  }

  return user ? <Outlet /> : <Navigate to="/admin/sign-in" replace state={{ from: location }} />
}
