
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/components/Web3Provider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Calendar, UserCog, MessageSquare, Heart, Stethoscope, AlertCircle, PillIcon, UserRound } from "lucide-react";

interface PatientProfile {
  name: string;
  age: number;
  bloodGroup: string;
  height: string;
  weight: string;
  publicAddress: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  appointmentHistory: Array<{
    date: string;
    doctor: string;
    reason: string;
  }>;
  assignedDoctors: Array<{
    name: string;
    specialization: string;
    address: string;
  }>;
}

const PatientDashboard = () => {
  const { isAuthenticated, account } = useAuth();
  const navigate = useNavigate();
  const { contract } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState<PatientProfile | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // This is a mock profile - in a real app, you'd fetch this from your contract
    const mockProfile: PatientProfile = {
      name: "John Doe",
      age: 42,
      bloodGroup: "O+",
      height: "5'10\"",
      weight: "180 lbs",
      publicAddress: account || "0x0000...0000",
      medicalHistory: [
        "Type 2 Diabetes diagnosed in 2020",
        "Hypertension",
        "Knee surgery in 2019"
      ],
      allergies: ["Penicillin", "Peanuts"],
      currentMedications: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily"
        },
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily"
        }
      ],
      appointmentHistory: [
        {
          date: "2024-02-15",
          doctor: "Dr. Smith",
          reason: "Regular checkup"
        },
        {
          date: "2024-01-20",
          doctor: "Dr. Johnson",
          reason: "Diabetes follow-up"
        }
      ],
      assignedDoctors: [
        {
          name: "Dr. Smith",
          specialization: "General Practitioner",
          address: "123 Medical Center"
        },
        {
          name: "Dr. Johnson",
          specialization: "Endocrinologist",
          address: "456 Diabetes Clinic"
        }
      ]
    };

    setPatientInfo(mockProfile);
    setLoading(false);
  }, [isAuthenticated, navigate, account]);

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const profileSections = [
    {
      title: "Medical History",
      description: "Your past medical conditions and treatments",
      icon: FileText,
      content: patientInfo?.medicalHistory.map((item, index) => (
        <div key={index} className="p-2 bg-muted/50 rounded-md mb-2">
          {item}
        </div>
      ))
    },
    {
      title: "Allergies",
      description: "Known allergies and reactions",
      icon: AlertCircle,
      content: patientInfo?.allergies.map((allergy, index) => (
        <div key={index} className="p-2 bg-muted/50 rounded-md mb-2">
          {allergy}
        </div>
      ))
    },
    {
      title: "Current Medications",
      description: "Your prescribed medications",
      icon: PillIcon,
      content: patientInfo?.currentMedications.map((med, index) => (
        <div key={index} className="p-2 bg-muted/50 rounded-md mb-2">
          <p className="font-medium">{med.name}</p>
          <p className="text-sm text-muted-foreground">
            {med.dosage} - {med.frequency}
          </p>
        </div>
      ))
    },
    {
      title: "Appointment History",
      description: "Your past medical appointments",
      icon: Calendar,
      content: patientInfo?.appointmentHistory.map((apt, index) => (
        <div key={index} className="p-2 bg-muted/50 rounded-md mb-2">
          <p className="font-medium">{apt.doctor}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(apt.date).toLocaleDateString()} - {apt.reason}
          </p>
        </div>
      ))
    },
    {
      title: "My Doctors",
      description: "Your healthcare providers",
      icon: Stethoscope,
      content: patientInfo?.assignedDoctors.map((doc, index) => (
        <div key={index} className="p-2 bg-muted/50 rounded-md mb-2">
          <p className="font-medium">{doc.name}</p>
          <p className="text-sm text-muted-foreground">{doc.specialization}</p>
          <p className="text-sm text-muted-foreground">{doc.address}</p>
        </div>
      ))
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Patient Profile</h1>
          <Button variant="outline" onClick={() => navigate('/patient/settings')}>
            <UserCog className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Patient Information Card */}
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserRound className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Personal Information</CardTitle>
            </div>
            <CardDescription>Your personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{patientInfo?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{patientInfo?.age} years</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <p className="font-medium">{patientInfo?.bloodGroup}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{patientInfo?.height}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{patientInfo?.weight}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Wallet Address</p>
                <p className="font-medium">{formatAddress(patientInfo?.publicAddress || "")}</p>
                <p className="text-xs text-muted-foreground truncate">{patientInfo?.publicAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileSections.map((section) => (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
