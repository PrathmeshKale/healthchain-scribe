
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Web3 from "web3";
import Contract from '../abis/Contract.json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  const { login, isAuthenticated, isAdmin, userType } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add useEffect to handle automatic redirection
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/dashboard');
      } else if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, userType, navigate]);

  const handleLogin = async () => {
    try {
      await login();
      // Navigation will be handled by useEffect
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetAdmin = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // Initialize Web3
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();

      const accounts = await web3Instance.eth.getAccounts();
      const account = accounts[0];

      // Deploy new contract
      const contract = new web3Instance.eth.Contract((Contract as any).abi);
      const gasEstimate = await contract.deploy({ data: (Contract as any).bytecode }).estimateGas();
      
      const newContract = await contract.deploy({ data: (Contract as any).bytecode })
        .send({
          from: account,
          gas: String(gasEstimate) // Convert bigint to string to fix type error
        });

      toast({
        title: "Success",
        description: `New contract deployed. You are now admin. New contract address: ${newContract.options.address}`,
      });

      // Refresh page to update contract address
      window.location.reload();
    } catch (error) {
      console.error("Reset admin error:", error);
      toast({
        title: "Error",
        description: "Failed to reset admin. Make sure you're connected to MetaMask.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to HealthChain</CardTitle>
          <CardDescription>
            Connect your wallet to access the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="admin">Admin/Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient" className="space-y-4">
              <Button onClick={handleLogin} className="w-full">
                Connect Patient Wallet
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Connect your wallet to access your medical records and appointments
              </p>
            </TabsContent>
            <TabsContent value="admin" className="space-y-4">
              <Button onClick={handleLogin} className="w-full">
                Connect Admin/Doctor Wallet
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Button 
                onClick={handleResetAdmin} 
                variant="outline" 
                className="w-full"
              >
                Reset Admin (Deploy New Contract)
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Warning: Resetting admin will deploy a new contract and set you as the admin.
                Make sure you're on the correct network.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
