
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Users, UserPlus, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Web3 from "web3";

const DoctorsPage = () => {
  const [newDoctorAddress, setNewDoctorAddress] = useState("");
  const [newDoctorInfo, setNewDoctorInfo] = useState("");
  const [doctors, setDoctors] = useState<Array<{ id: string; info: string }>>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const initWeb3 = async () => {
      // Modern browsers with MetaMask
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          
          // Get connected account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Load initial doctor data
          fetchDoctors();
        } catch (error) {
          console.error("User denied account access");
          toast({
            title: "Connection Error",
            description: "Please connect your wallet to manage doctors.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Web3 Not Found",
          description: "Please install MetaMask to use this application.",
          variant: "destructive",
        });
      }
    };

    initWeb3();
  }, []);

  const addDoctor = async () => {
    if (!web3 || !account) {
      toast({
        title: "Connection Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would instantiate your contract and call addDrInfo
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // await contract.methods.addDrInfo(newDoctorAddress, newDoctorInfo).send({ from: account });
      
      toast({
        title: "Doctor Added",
        description: "The new doctor has been successfully registered.",
      });
      
      // Clear form and refresh list
      setNewDoctorAddress("");
      setNewDoctorInfo("");
      fetchDoctors();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add doctor. Please ensure you have admin rights.",
        variant: "destructive",
      });
    }
  };

  const fetchDoctors = async () => {
    if (!web3) return;

    try {
      // Here you would instantiate your contract and get doctors
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // const doctorsList = await contract.methods.getAllDrs().call();
      
      // For now using mock data
      const mockDoctors = [
        { id: "0x123...abc", info: "IPFS_HASH_1" },
        { id: "0x456...def", info: "IPFS_HASH_2" },
      ];
      setDoctors(mockDoctors);
    } catch (error) {
      console.error(error);
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
            {account && (
              <p className="text-sm text-gray-600 mt-2">Connected: {account}</p>
            )}
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
                disabled={!web3 || !account}
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
