
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FileText, Download, Calendar, PlusCircle } from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  documents: string[];
}

const PatientRecords = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your contract
  const records: MedicalRecord[] = [
    {
      id: "1",
      date: "2024-02-15",
      doctorName: "Dr. Smith",
      diagnosis: "Type 2 Diabetes",
      treatment: "Prescribed Metformin 500mg",
      notes: "Regular exercise and diet control recommended",
      documents: ["Blood Test Results", "Prescription"]
    },
    {
      id: "2",
      date: "2024-01-20",
      doctorName: "Dr. Johnson",
      diagnosis: "Hypertension",
      treatment: "Prescribed Lisinopril 10mg",
      notes: "Monitor blood pressure daily",
      documents: ["ECG Report", "Blood Pressure Log"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your medical history
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Request New Records
          </Button>
        </div>

        <div className="grid gap-6">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{record.diagnosis}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(record.date).toLocaleDateString()} - {record.doctorName}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Treatment</h3>
                    <p className="text-muted-foreground">{record.treatment}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-muted-foreground">{record.notes}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {record.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                        >
                          <FileText className="h-4 w-4 text-primary" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;
