
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
  login: (role?: "patient" | "admin") => Promise<void>;
  logout: () => void;
  web3: Web3 | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of authorized admin addresses (in a real app, this would come from a secure backend)
const ADMIN_ADDRESSES = [
  '0xC5AcBCaDd3975c6Da6D0750c7bbe350E91019eCa', // Added specified admin address
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

  const login = async (selectedRole?: "patient" | "admin") => {
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
      
      // Check if account is an admin based on predefined addresses
      const adminStatus = checkAdminStatus(currentAccount);
      setIsAdmin(adminStatus);

      // If admin tab was selected, prioritize admin/doctor roles
      if (selectedRole === "admin") {
        if (adminStatus) {
          setUserType(null); // Admin supersedes doctor/patient types
          toast({
            title: "Connected",
            description: "Successfully authenticated as admin.",
          });
          navigate('/dashboard');
          return;
        } else {
          // Not an admin but selected admin/doctor tab - check if doctor
          const isDoctorAddress = DOCTOR_ADDRESSES.includes(currentAccount.toLowerCase());
          if (isDoctorAddress) {
            setUserType('doctor');
            toast({
              title: "Connected",
              description: "Successfully authenticated as doctor.",
            });
            navigate('/doctor-dashboard');
            return;
          } else {
            // Not admin or doctor, but trying to access admin/doctor area
            toast({
              title: "Access Denied",
              description: "Your wallet is not registered as an admin or doctor.",
              variant: "destructive",
            });
            setIsAuthenticated(false);
            setAccount(null);
            setWeb3(null);
            return;
          }
        }
      } else {
        // Patient tab selected - first check if admin (admins can access everything)
        if (adminStatus) {
          setUserType(null);
          toast({
            title: "Connected",
            description: "Successfully authenticated as admin.",
          });
          navigate('/dashboard');
          return;
        }
        
        // Set as regular patient
        setUserType('patient');
        toast({
          title: "Connected",
          description: "Successfully authenticated as patient.",
        });
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
        
        // Redirect based on new account type if already authenticated
        if (isAuthenticated) {
          if (adminStatus) {
            navigate('/dashboard');
          } else if (userRole === 'doctor') {
            navigate('/doctor-dashboard');
          } else {
            navigate('/patient-dashboard');
          }
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
  }, [isAuthenticated, navigate]);

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
