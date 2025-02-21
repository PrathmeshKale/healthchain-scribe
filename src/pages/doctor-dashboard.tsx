
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Stethoscope, Calendar, MessageSquare, UserCog, Users } from "lucide-react";

const DoctorDashboard = () => {
  const { account } = useAuth();

  const dashboardCards = [
    {
      title: "My Patients",
      description: "View and manage your patient list",
      icon: Users,
      count: 24,
      link: "/doctor/patients"
    },
    {
      title: "Appointments",
      description: "Manage your appointment schedule",
      icon: Calendar,
      count: 8,
      link: "/doctor/appointments"
    },
    {
      title: "Messages",
      description: "Patient communications",
      icon: MessageSquare,
      count: 12,
      link: "/doctor/messages"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. {account?.slice(0, 6)}...</p>
        </div>
        <Button variant="outline">
          <UserCog className="mr-2 h-4 w-4" />
          Profile Settings
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </div>
                <span className="text-2xl font-bold text-primary">{card.count}</span>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" asChild>
                <a href={card.link}>View Details</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
