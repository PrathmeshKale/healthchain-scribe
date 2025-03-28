
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
              <p className="text-xs text-muted-foreground text-center">
                Connect your wallet to access the admin dashboard and manage the platform
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
