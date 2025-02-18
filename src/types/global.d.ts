
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    enable: () => Promise<void>;
  };
  web3?: any;
}

interface DoctorDetails {
  docID: string;
  fName: string;
  lName: string;
  Doj: string;
  emailID: string;
  phone: string;
  city: string;
  state: string;
  speciality: string;
  imageHash: string | null;
}
