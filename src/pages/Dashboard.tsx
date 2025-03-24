
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/components/Web3Provider";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/AdminSidebar";
import { StatCard } from "@/components/StatCard";
import { RefreshCw, Users, UserPlus, Calendar, DollarSign, Activity } from "lucide-react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 1243,
    inPatients: 36,
    activeDoctors: 28,
    activeNurses: 96,
    appointments: 156,
    revenue: 24680
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { contract, account } = useWeb3();
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      // In a real app, fetch data from the contract
      // For now, we'll use the mock data already set
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Dashboard Updated",
        description: "Latest statistics have been loaded",
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [contract, account]);

  // Line chart data for patients trend
  const patientChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patients',
        data: [300, 450, 600, 470, 800, 1243],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Bar chart data for revenue
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [4500, 6200, 8900, 12000, 18000, 24680],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      },
    ],
  };

  // Pie chart data for staff distribution
  const staffChartData = {
    labels: ['Doctors', 'Nurses', 'Admin Staff'],
    datasets: [
      {
        data: [28, 96, 15],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)', 
          'rgba(249, 115, 22, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Recent appointments data
  const recentAppointments = [
    { id: 1, patient: "Jane Cooper", doctor: "Dr. Smith", date: "Today, 2:00 PM", status: "Completed" },
    { id: 2, patient: "Robert Fox", doctor: "Dr. Johnson", date: "Today, 3:30 PM", status: "Upcoming" },
    { id: 3, patient: "Esther Howard", doctor: "Dr. Williams", date: "Tomorrow, 10:00 AM", status: "Scheduled" },
    { id: 4, patient: "Leslie Alexander", doctor: "Dr. Brown", date: "Tomorrow, 1:00 PM", status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome to the admin dashboard</p>
            </div>
            <Button variant="outline" onClick={fetchStats} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Patients" 
              value={stats.totalPatients} 
              icon={<Users className="h-6 w-6" />} 
              color="bg-blue-500" 
              change={{ value: 12, positive: true }}
            />
            <StatCard 
              title="In Patients" 
              value={stats.inPatients} 
              icon={<UserPlus className="h-6 w-6" />} 
              color="bg-orange-500" 
              change={{ value: 3, positive: true }}
            />
            <StatCard 
              title="Appointments" 
              value={stats.appointments} 
              icon={<Calendar className="h-6 w-6" />} 
              color="bg-purple-500" 
              change={{ value: 5, positive: false }}
            />
            <StatCard 
              title="Revenue" 
              value={`$${stats.revenue}`} 
              icon={<DollarSign className="h-6 w-6" />} 
              color="bg-green-500" 
              change={{ value: 8, positive: true }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line 
                    data={patientChartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Staff Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <Pie 
                    data={staffChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue and Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar 
                    data={revenueChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                        <th className="px-4 py-3">Patient</th>
                        <th className="px-4 py-3">Doctor</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{appointment.patient}</td>
                          <td className="px-4 py-3">{appointment.doctor}</td>
                          <td className="px-4 py-3">{appointment.date}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : appointment.status === 'Upcoming' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
