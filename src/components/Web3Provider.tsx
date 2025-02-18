
import { createContext, useContext, ReactNode } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';
import { useIPFS } from '../hooks/useIPFS';

interface Web3ContextType {
  account: string;
  balance: number;
  web3: any;
  contract: any;
  isAdmin: boolean;
  ipfs: any;
  error: Error | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const blockchain = useBlockchain();
  const { ipfs, error: ipfsError } = useIPFS();

  return (
    <Web3Context.Provider value={{
      ...blockchain,
      ipfs,
      error: blockchain.error || ipfsError
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
