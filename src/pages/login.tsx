
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect with MetaMask to access the admin dashboard
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={login}
            className="w-full flex items-center justify-center gap-2"
          >
            <img
              src="/metamask-fox.svg"
              alt="MetaMask"
              className="w-6 h-6"
            />
            Connect with MetaMask
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
