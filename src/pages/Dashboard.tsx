
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWeb3 } from "@/components/Web3Provider";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    docID: "",
    fName: "First Name",
    lName: "Last Name",
    Doj: "",
    emailID: "test_name@mail.com",
    phone: "123456789",
    city: "city",
    state: "state",
    speciality: "speciality",
    imageHash: null,
  });

  const { contract, account } = useWeb3();
  const { toast } = useToast();

  const getDoctorDetails = async () => {
    try {
      if (!contract || !account) return;
      
      const drInfo = await contract.methods.getDr(account).call();
      if (drInfo) {
        const details = JSON.parse(drInfo);
        setDoctorDetails(details);
      }
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctor details",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getDoctorDetails();
    }, 3000);

    return () => clearTimeout(timer);
  }, [contract, account]);

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Doctor Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              {doctorDetails.imageHash ? (
                <AvatarImage src={`https://ipfs.io/ipfs/${doctorDetails.imageHash}`} />
              ) : (
                <AvatarFallback>
                  {doctorDetails.fName[0]}{doctorDetails.lName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Name</h3>
                  <p className="text-lg">{`${doctorDetails.fName} ${doctorDetails.lName}`}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">ID</h3>
                  <p className="text-lg">{doctorDetails.docID || "Not assigned"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Email</h3>
                  <p className="text-lg">{doctorDetails.emailID}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Phone</h3>
                  <p className="text-lg">{doctorDetails.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Location</h3>
                  <p className="text-lg">{`${doctorDetails.city}, ${doctorDetails.state}`}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Speciality</h3>
                  <p className="text-lg">{doctorDetails.speciality}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Date of Joining</h3>
                  <p className="text-lg">{doctorDetails.Doj || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
