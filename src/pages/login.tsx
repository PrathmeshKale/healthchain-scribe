
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useWeb3 } from "@/components/Web3Provider";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Contract from '../abis/Contract.json';

const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { web3 } = useWeb3();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/dashboard');
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
      const gas = await contract.deploy({ data: (Contract as any).bytecode }).estimateGas();
      
      const newContract = await contract.deploy({ data: (Contract as any).bytecode })
        .send({
          from: account,
          gas: gas
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
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Connect your wallet to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleLogin} className="w-full">
            Connect Wallet
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
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
