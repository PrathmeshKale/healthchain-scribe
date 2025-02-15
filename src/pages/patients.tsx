
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Users, UserPlus, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Web3 from "web3";

const PatientsPage = () => {
  const [newPatientAddress, setNewPatientAddress] = useState("");
  const [newPatientInfo, setNewPatientInfo] = useState("");
  const [patients, setPatients] = useState<Array<{ id: string; info: string }>>([]);
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

          // Load initial patient data
          fetchPatients();
        } catch (error) {
          console.error("User denied account access");
          toast({
            title: "Connection Error",
            description: "Please connect your wallet to manage patients.",
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

  const addPatient = async () => {
    if (!web3 || !account) {
      toast({
        title: "Connection Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would instantiate your contract and call addPatient
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // await contract.methods.addPatient(newPatientAddress, newPatientInfo).send({ from: account });
      
      toast({
        title: "Patient Added",
        description: "The new patient has been successfully registered.",
      });
      
      // Clear form and refresh list
      setNewPatientAddress("");
      setNewPatientInfo("");
      fetchPatients();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add patient. Please ensure you have the required permissions.",
        variant: "destructive",
      });
    }
  };

  const fetchPatients = async () => {
    if (!web3) return;

    try {
      // Here you would instantiate your contract and get patients
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // const patientList = await contract.methods.getAllPatients().call();
      
      // For now using mock data
      const mockPatients = [
        { id: "0x123...abc", info: "IPFS_HASH_1" },
        { id: "0x456...def", info: "IPFS_HASH_2" },
      ];
      setPatients(mockPatients);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch patients list.",
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
                <h1 className="text-3xl font-bold text-gray-900">Patients Management</h1>
                <p className="text-gray-600 mt-2">Add and manage patients in the system</p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">Doctor Access Required</span>
              </div>
            </div>
            {account && (
              <p className="text-sm text-gray-600 mt-2">Connected: {account}</p>
            )}
          </motion.div>

          {/* Add Patient Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add New Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ethereum Address</label>
                  <Input
                    placeholder="0x..."
                    value={newPatientAddress}
                    onChange={(e) => setNewPatientAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Patient Info Hash</label>
                  <Input
                    placeholder="IPFS Hash..."
                    value={newPatientInfo}
                    onChange={(e) => setNewPatientInfo(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="mt-4"
                onClick={addPatient}
                disabled={!web3 || !account}
              >
                Add Patient
              </Button>
            </CardContent>
          </Card>

          {/* Patients List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Registered Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-gray-600">{patient.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Info Hash</p>
                        <p className="text-sm text-gray-600">{patient.info}</p>
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

export default PatientsPage;
