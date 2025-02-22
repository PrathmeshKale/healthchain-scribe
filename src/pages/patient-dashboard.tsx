
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/components/Web3Provider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, UserCog, Clock, PlusCircle } from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  department: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const PatientDashboard = () => {
  const { isAuthenticated, account } = useAuth();
  const navigate = useNavigate();
  const { contract } = useWeb3();
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from your contract
  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      date: '2024-02-15',
      doctorName: 'Dr. Smith',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Prescribed Metformin 500mg',
      notes: 'Regular exercise and diet control recommended'
    },
    {
      id: '2',
      date: '2024-01-20',
      doctorName: 'Dr. Johnson',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg',
      notes: 'Monitor blood pressure daily'
    }
  ]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-03-01',
      time: '10:00 AM',
      doctorName: 'Dr. Smith',
      department: 'General Medicine',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-02-15',
      time: '2:30 PM',
      doctorName: 'Dr. Johnson',
      department: 'Endocrinology',
      status: 'completed'
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <Button variant="outline" onClick={() => navigate('/patient/settings')}>
            <UserCog className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Medical Records</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Records
              </Button>
            </div>
            <div className="grid gap-4">
              {medicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{record.diagnosis}</CardTitle>
                        <CardDescription>
                          {new Date(record.date).toLocaleDateString()} - {record.doctorName}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Treatment:</strong> {record.treatment}</p>
                      <p><strong>Notes:</strong> {record.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Appointments</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{appointment.doctorName}</CardTitle>
                        <CardDescription>{appointment.department}</CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
