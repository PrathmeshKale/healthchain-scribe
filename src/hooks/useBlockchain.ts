
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from '../abis/Contract.json';

interface BlockchainState {
  account: string;
  balance: number;
  web3: Web3 | null;
  contract: any;
  isAdmin: boolean;
  error: Error | null;
}

export const useBlockchain = () => {
  const [state, setState] = useState<BlockchainState>({
    account: '',
    balance: 0,
    web3: null,
    contract: null,
    isAdmin: false,
    error: null
  });

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        
        const balanceWei = await web3.eth.getBalance(account);
        const balance = Math.floor(Number(web3.utils.fromWei(balanceWei, "ether")) * 1000) / 1000;

        const netId = await web3.eth.net.getId();
        const networkData = (Contract as any).networks[netId];

        if (!networkData) {
          throw new Error('Contract not deployed to detected network');
        }

        const contract = new web3.eth.Contract(
          (Contract as any).abi,
          networkData.address
        );

        const isAdmin = await contract.methods.isAdmin().call({ from: account });

        setState({
          account,
          balance,
          web3,
          contract,
          isAdmin,
          error: null
        });

        // Setup account change listener
        window.ethereum.on('accountsChanged', async (accounts: string[]) => {
          const newAccount = accounts[0];
          const newBalanceWei = await web3.eth.getBalance(newAccount);
          const newBalance = Math.floor(Number(web3.utils.fromWei(newBalanceWei, "ether")) * 1000) / 1000;
          const newIsAdmin = await contract.methods.isAdmin().call({ from: newAccount });

          setState(prevState => ({
            ...prevState,
            account: newAccount,
            balance: newBalance,
            isAdmin: newIsAdmin
          }));
        });

      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        setState(prevState => ({
          ...prevState,
          web3,
          error: null
        }));
      } else {
        throw new Error('No Ethereum browser extension detected');
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        error: error as Error
      }));
      console.error('Blockchain initialization error:', error);
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  const checkIsAdmin = async (): Promise<boolean> => {
    if (!state.contract || !state.account) return false;
    try {
      const isAdmin = await state.contract.methods.isAdmin().call({ from: state.account });
      return isAdmin;
    } catch (error) {
      console.error('Check admin error:', error);
      return false;
    }
  };

  return {
    account: state.account,
    balance: state.balance,
    web3: state.web3,
    contract: state.contract,
    isAdmin: state.isAdmin,
    error: state.error,
    checkIsAdmin
  };
};
