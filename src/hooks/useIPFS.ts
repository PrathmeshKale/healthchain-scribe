
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { useState, useEffect } from 'react';

const IPFS_URL = 'http://localhost:5001'; // You can change this to your IPFS node URL

export const useIPFS = () => {
  const [ipfs, setIpfs] = useState<IPFSHTTPClient | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const ipfsClient = create({ url: IPFS_URL });
      setIpfs(ipfsClient);
    } catch (err) {
      setError(err as Error);
      console.error('IPFS init error:', err);
    }
  }, []);

  return { ipfs, error };
};
