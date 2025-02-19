
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    enable: () => Promise<void>;
    isMetaMask?: boolean;
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
