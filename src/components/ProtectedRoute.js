import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Context';

export const ProtectedRoute = () => {
  const { token } = useAuth();
  if(!token) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}