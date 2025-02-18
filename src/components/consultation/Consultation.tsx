
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PatientRecord from "./PatientRecord";
import { Progress } from "@/components/ui/progress";

const Consultation = () => {
  const [patientAddress, setPatientAddress] = useState("");
  const [isPatient, setIsPatient] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const { toast } = useToast();

  const handlePatientLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientAddress) {
      toast({
        title: "Error",
        description: "Please enter a patient address",
        variant: "destructive"
      });
      return;
    }

    setShowProgress(true);
    setProgressMessage("Looking up patient...");

    try {
      // Here you would normally fetch patient data from your contract
      // For now using mock data
      const mockPatient = {
        address: patientAddress,
        name: "John Doe",
        age: "30",
        gender: "Male",
        bloodGroup: "O+"
      };

      setPatientDetails(mockPatient);
      setIsPatient(true);
      setShowProgress(false);
    } catch (error) {
      setShowProgress(false);
      toast({
        title: "Error",
        description: "Failed to fetch patient details",
        variant: "destructive"
      });
    }
  };

  const handleSaveRecord = async (record: any) => {
    setShowProgress(true);
    setProgressMessage("Saving medical record...");

    try {
      // Here you would normally save the record to your contract
      console.log("Saving record:", record);
      
      setShowProgress(false);
      toast({
        title: "Success",
        description: "Medical record saved successfully",
      });
    } catch (error) {
      setShowProgress(false);
      toast({
        title: "Error",
        description: "Failed to save medical record",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      {!isPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePatientLookup} className="space-y-4">
              <Input
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Patient Address (0x...)"
              />
              <Button type="submit">Consult</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {isPatient && patientDetails && (
        <PatientRecord
          patientDetails={patientDetails}
          onSaveRecord={handleSaveRecord}
        />
      )}

      {showProgress && (
        <Card className="mt-4">
          <CardContent className="py-4">
            <Progress value={100} className="mb-2" />
            <p className="text-sm text-center text-gray-600">{progressMessage}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Consultation;
