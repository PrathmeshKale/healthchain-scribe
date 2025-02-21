
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  userType?: 'patient' | 'doctor';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  userType
}) => {
  const { isAuthenticated, isAdmin, userType: currentUserType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (userType && userType !== currentUserType) {
    return <Navigate to={`/${currentUserType}-dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
