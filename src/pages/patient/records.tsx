
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FileText, Download, Calendar, PlusCircle, Upload } from "lucide-react";
import { useIPFS } from "@/hooks/useIPFS";
import { useWeb3 } from "@/components/Web3Provider";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  documents: Array<{
    name: string;
    cid: string;
  }>;
  ipfsHash?: string;
}

const PatientRecords = () => {
  const navigate = useNavigate();
  const { contract } = useWeb3();
  const { ipfs, uploadToIPFS, getFromIPFS, getIPFSUrl, isUploading } = useIPFS();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch records from your contract
    // and then retrieve the actual data from IPFS
    
    // Mock data for demonstration
    const mockRecords: MedicalRecord[] = [
      {
        id: "1",
        date: "2024-02-15",
        doctorName: "Dr. Smith",
        diagnosis: "Type 2 Diabetes",
        treatment: "Prescribed Metformin 500mg",
        notes: "Regular exercise and diet control recommended",
        documents: [
          { name: "Blood Test Results", cid: "QmExample1" },
          { name: "Prescription", cid: "QmExample2" }
        ],
        ipfsHash: "QmRecordHash1"
      },
      {
        id: "2",
        date: "2024-01-20",
        doctorName: "Dr. Johnson",
        diagnosis: "Hypertension",
        treatment: "Prescribed Lisinopril 10mg",
        notes: "Monitor blood pressure daily",
        documents: [
          { name: "ECG Report", cid: "QmExample3" },
          { name: "Blood Pressure Log", cid: "QmExample4" }
        ],
        ipfsHash: "QmRecordHash2"
      }
    ];

    setRecords(mockRecords);
    setLoading(false);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, recordId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const cid = await uploadToIPFS(file);
      
      if (cid) {
        // Update the record with the new document
        setRecords(prevRecords => 
          prevRecords.map(record => {
            if (record.id === recordId) {
              return {
                ...record,
                documents: [
                  ...record.documents,
                  { name: file.name, cid }
                ]
              };
            }
            return record;
          })
        );

        // In a real app, you would also update this on the blockchain
        toast({
          title: "Document Added",
          description: `${file.name} has been added to your medical record`,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const downloadDocument = (cid: string, name: string) => {
    const url = getIPFSUrl(cid);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Progress value={100} className="w-1/3" />
        </div>
      </DashboardLayout>
    );
  }

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
                    {record.ipfsHash && (
                      <p className="text-xs text-muted-foreground mt-1">
                        IPFS: {record.ipfsHash}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, record.id)}
                      />
                      <Button variant="outline" size="sm" type="button" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Add Document
                        </span>
                      </Button>
                    </label>
                  </div>
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
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{doc.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => downloadDocument(doc.cid, doc.name)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isUploading && (
          <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg w-72">
            <p className="font-medium mb-2">Uploading to IPFS...</p>
            <Progress value={100} className="w-full" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientRecords;
