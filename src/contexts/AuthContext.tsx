
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAdmin: boolean;
  isAuthenticated: boolean;
  account: string | null;
  login: () => Promise<void>;
  logout: () => void;
  web3: Web3 | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of authorized admin addresses (in a real app, this would come from a secure backend)
const ADMIN_ADDRESSES = [
  '0x123...', // Replace with actual admin addresses
].map(addr => addr.toLowerCase());

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminStatus = (address: string) => {
    return ADMIN_ADDRESSES.includes(address.toLowerCase());
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

      if (!adminStatus) {
        toast({
          title: "Access Denied",
          description: "This address is not authorized as an admin.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Connected",
        description: "Successfully authenticated as admin.",
      });
      navigate('/dashboard');
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
        if (!adminStatus) {
          logout();
        }
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
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, account, login, logout, web3 }}>
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
