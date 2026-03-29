import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentSession } from '../services/userService';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const session = await getCurrentSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
