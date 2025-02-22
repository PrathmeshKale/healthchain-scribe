
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PlusCircle, Calendar, Clock, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  department: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const PatientAppointments = () => {
  const { toast } = useToast();

  // Mock appointments data - in a real app, this would come from your backend
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-15",
      time: "10:00 AM",
      doctorName: "Dr. Sarah Smith",
      department: "Cardiology",
      location: "Main Hospital, Room 302",
      status: "upcoming"
    },
    {
      id: "2",
      date: "2024-03-10",
      time: "2:30 PM",
      doctorName: "Dr. James Wilson",
      department: "General Medicine",
      location: "Medical Center, Room 105",
      status: "upcoming"
    },
    {
      id: "3",
      date: "2024-02-28",
      time: "11:15 AM",
      doctorName: "Dr. Emily Johnson",
      department: "Neurology",
      location: "Specialty Clinic, Room 203",
      status: "completed"
    }
  ];

  const handleBookAppointment = () => {
    toast({
      title: "Book Appointment",
      description: "This feature will be available soon.",
    });
  };

  const handleCancelAppointment = (id: string) => {
    toast({
      title: "Cancel Appointment",
      description: `Appointment ${id} cancellation request sent.`,
    });
  };

  const handleRescheduleAppointment = (id: string) => {
    toast({
      title: "Reschedule Appointment",
      description: `Appointment ${id} reschedule request sent.`,
    });
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your appointments
            </p>
          </div>
          <Button onClick={handleBookAppointment}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{appointment.doctorName}</CardTitle>
                    <CardDescription>{appointment.department}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  
                  {appointment.status === 'upcoming' && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientAppointments;
