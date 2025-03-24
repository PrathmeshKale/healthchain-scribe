import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, Filter, Plus, User, Clock, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock appointments data
  const appointments = [
    { id: 1, patient: "Jane Cooper", doctor: "Dr. Smith", date: "Jun 14, 2023", time: "10:00 AM", status: "Completed", patientId: "P-1001", doctorId: "D-2001", department: "Cardiology" },
    { id: 2, patient: "Robert Fox", doctor: "Dr. Johnson", date: "Jun 14, 2023", time: "11:30 AM", status: "Scheduled", patientId: "P-1002", doctorId: "D-2002", department: "Neurology" },
    { id: 3, patient: "Esther Howard", doctor: "Dr. Williams", date: "Jun 15, 2023", time: "09:00 AM", status: "Canceled", patientId: "P-1003", doctorId: "D-2003", department: "Orthopedics" },
    { id: 4, patient: "Leslie Alexander", doctor: "Dr. Brown", date: "Jun 15, 2023", time: "02:00 PM", status: "Scheduled", patientId: "P-1004", doctorId: "D-2001", department: "Cardiology" },
    { id: 5, patient: "Dianne Russell", doctor: "Dr. Davis", date: "Jun 16, 2023", time: "10:30 AM", status: "Completed", patientId: "P-1005", doctorId: "D-2004", department: "Dermatology" },
    { id: 6, patient: "Cameron Williamson", doctor: "Dr. Miller", date: "Jun 16, 2023", time: "01:00 PM", status: "Scheduled", patientId: "P-1006", doctorId: "D-2005", department: "Ophthalmology" },
    { id: 7, patient: "Brooklyn Simmons", doctor: "Dr. Wilson", date: "Jun 17, 2023", time: "11:00 AM", status: "Canceled", patientId: "P-1007", doctorId: "D-2006", department: "Psychiatry" },
    { id: 8, patient: "Wade Warren", doctor: "Dr. Moore", date: "Jun 17, 2023", time: "03:30 PM", status: "Scheduled", patientId: "P-1008", doctorId: "D-2007", department: "Gastroenterology" },
  ];

  const filteredAppointments = appointments.filter(
    appointment => 
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <Check className="h-4 w-4 text-green-800" />;
      case "Scheduled":
        return <Clock className="h-4 w-4 text-blue-800" />;
      case "Canceled":
        return <X className="h-4 w-4 text-red-800" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-500">Manage all hospital appointments</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Calendar View</span>
              </Button>
              <Button variant="default" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>New Appointment</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>Appointments List</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search appointments..." 
                      className="pl-9 w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="canceled">Canceled</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                          <th className="px-4 py-3">Patient</th>
                          <th className="px-4 py-3">Doctor</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3">Date & Time</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                  <User className="h-4 w-4 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">{appointment.patient}</p>
                                  <p className="text-xs text-gray-500">{appointment.patientId}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <p>{appointment.doctor}</p>
                              <p className="text-xs text-gray-500">{appointment.doctorId}</p>
                            </td>
                            <td className="px-4 py-3">{appointment.department}</td>
                            <td className="px-4 py-3">
                              <p>{appointment.date}</p>
                              <p className="text-xs text-gray-500">{appointment.time}</p>
                            </td>
                            <td className="px-4 py-3">
                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColorClass(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                <span className="text-xs font-medium">{appointment.status}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="link" size="sm">Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Other tab contents would filter by status */}
                <TabsContent value="scheduled" className="mt-0">
                  {/* Same table but filtered for scheduled appointments */}
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  {/* Same table but filtered for completed appointments */}
                </TabsContent>
                <TabsContent value="canceled" className="mt-0">
                  {/* Same table but filtered for canceled appointments */}
                </TabsContent>
              </Tabs>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">Showing {filteredAppointments.length} of {appointments.length} appointments</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
