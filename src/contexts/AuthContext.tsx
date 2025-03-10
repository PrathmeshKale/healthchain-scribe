
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useToast } from "@/components/ui/use-toast";

type UserType = 'patient' | 'doctor' | null;

interface AuthContextType {
  isAdmin: boolean;
  isAuthenticated: boolean;
  account: string | null;
  userType: UserType;
  login: () => Promise<void>;
  logout: () => void;
  web3: Web3 | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of authorized admin addresses (in a real app, this would come from a secure backend)
const ADMIN_ADDRESSES = [
  '0x123...', // Replace with actual admin addresses
].map(addr => addr.toLowerCase());

// Mock doctor addresses for demo purposes
const DOCTOR_ADDRESSES = [
  '0x456...', // Replace with actual doctor addresses
].map(addr => addr.toLowerCase());

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminStatus = (address: string) => {
    return ADMIN_ADDRESSES.includes(address.toLowerCase());
  };

  const checkUserType = (address: string): UserType => {
    if (DOCTOR_ADDRESSES.includes(address.toLowerCase())) {
      return 'doctor';
    }
    return 'patient';
  };

  const login = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to access this application.",
        variant: "destructive",
      });
      return;
    }

    try {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const accounts = await web3Instance.eth.getAccounts();
      const currentAccount = accounts[0];
      
      setWeb3(web3Instance);
      setAccount(currentAccount);
      setIsAuthenticated(true);
      
      const adminStatus = checkAdminStatus(currentAccount);
      setIsAdmin(adminStatus);

      const userRole = checkUserType(currentAccount);
      setUserType(userRole);

      toast({
        title: "Connected",
        description: `Successfully authenticated as ${userRole}.`,
      });

      // Redirect based on user type
      if (userRole === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to connect to MetaMask. Please try again.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setAccount(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    setUserType(null);
    setWeb3(null);
    navigate('/');
    toast({
      title: "Logged Out",
      description: "Successfully disconnected from the application.",
    });
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        logout();
      } else {
        const newAccount = accounts[0];
        setAccount(newAccount);
        const adminStatus = checkAdminStatus(newAccount);
        setIsAdmin(adminStatus);
        const userRole = checkUserType(newAccount);
        setUserType(userRole);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAdmin, 
      isAuthenticated, 
      account, 
      userType, 
      login, 
      logout, 
      web3 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
