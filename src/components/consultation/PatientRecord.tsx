
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface PatientDetails {
  address: string;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
}

interface PatientRecordProps {
  patientDetails: PatientDetails;
  onSaveRecord: (record: any) => void;
}

const PatientRecord = ({ patientDetails, onSaveRecord }: PatientRecordProps) => {
  const [medicalRecord, setMedicalRecord] = useState({
    diagnosis: "",
    prescription: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicalRecord.diagnosis || !medicalRecord.prescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    onSaveRecord(medicalRecord);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Medical Record</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Patient Address</label>
              <p className="text-sm text-gray-600">{patientDetails.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-sm text-gray-600">{patientDetails.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <p className="text-sm text-gray-600">{patientDetails.age}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <p className="text-sm text-gray-600">{patientDetails.gender}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Blood Group</label>
              <p className="text-sm text-gray-600">{patientDetails.bloodGroup}</p>
            </div>
          </div>

          {/* Medical Record Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Diagnosis</label>
              <Input
                value={medicalRecord.diagnosis}
                onChange={(e) => setMedicalRecord(prev => ({
                  ...prev,
                  diagnosis: e.target.value
                }))}
                placeholder="Enter diagnosis"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Prescription</label>
              <Textarea
                value={medicalRecord.prescription}
                onChange={(e) => setMedicalRecord(prev => ({
                  ...prev,
                  prescription: e.target.value
                }))}
                placeholder="Enter prescription details"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                value={medicalRecord.notes}
                onChange={(e) => setMedicalRecord(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                placeholder="Enter additional notes"
              />
            </div>
            <Button type="submit">Save Record</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientRecord;
