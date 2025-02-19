
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/components/Web3Provider";
import Navigation from "@/components/Navigation";
import { FileText, Calendar, UserCog, MessageSquare } from "lucide-react";

const PatientDashboard = () => {
  const { isAuthenticated, account } = useAuth();
  const navigate = useNavigate();
  const { contract } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    // Load patient data here when contract methods are ready
    setLoading(false);
  }, [isAuthenticated, navigate]);

  const features = [
    {
      title: "Medical Records",
      description: "View your complete medical history",
      icon: FileText,
      action: () => navigate('/patient/records'),
    },
    {
      title: "Appointments",
      description: "Schedule and manage your appointments",
      icon: Calendar,
      action: () => navigate('/patient/appointments'),
    },
    {
      title: "Personal Information",
      description: "Update your profile and settings",
      icon: UserCog,
      action: () => navigate('/patient/profile'),
    },
    {
      title: "Messages",
      description: "Communicate with your healthcare providers",
      icon: MessageSquare,
      action: () => navigate('/patient/messages'),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <Button onClick={feature.action} className="w-full">
                    Access
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
