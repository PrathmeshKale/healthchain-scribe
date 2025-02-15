
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Users, UserPlus, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DoctorsPage = () => {
  const [newDoctorAddress, setNewDoctorAddress] = useState("");
  const [newDoctorInfo, setNewDoctorInfo] = useState("");
  const [doctors, setDoctors] = useState<Array<{ id: string; info: string }>>([]);
  const { toast } = useToast();

  // Mock functions - to be replaced with actual Web3 contract calls
  const addDoctor = async () => {
    try {
      // Here you would call the smart contract's addDrInfo function
      toast({
        title: "Doctor Added",
        description: "The new doctor has been successfully registered.",
      });
      
      // Refresh doctors list
      fetchDoctors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add doctor. Please ensure you have admin rights.",
        variant: "destructive",
      });
    }
  };

  const fetchDoctors = async () => {
    try {
      // Here you would call the smart contract's getAllDrs function
      // For now using mock data
      const mockDoctors = [
        { id: "0x123...abc", info: "IPFS_HASH_1" },
        { id: "0x456...def", info: "IPFS_HASH_2" },
      ];
      setDoctors(mockDoctors);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch doctors list.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
                <p className="text-gray-600 mt-2">Add and manage doctors in the system</p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">Admin Access Required</span>
              </div>
            </div>
          </motion.div>

          {/* Add Doctor Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add New Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ethereum Address</label>
                  <Input
                    placeholder="0x..."
                    value={newDoctorAddress}
                    onChange={(e) => setNewDoctorAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Doctor Info Hash</label>
                  <Input
                    placeholder="IPFS Hash..."
                    value={newDoctorInfo}
                    onChange={(e) => setNewDoctorInfo(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="mt-4"
                onClick={addDoctor}
              >
                Add Doctor
              </Button>
            </CardContent>
          </Card>

          {/* Doctors List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Registered Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-gray-600">{doctor.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Info Hash</p>
                        <p className="text-sm text-gray-600">{doctor.info}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
