
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { useState, useEffect } from 'react';
import { IPFS } from '../config/environment';

export const useIPFS = () => {
  const [ipfs, setIpfs] = useState<IPFSHTTPClient | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const ipfsClient = create({ url: IPFS.localIPFS });
      setIpfs(ipfsClient);
    } catch (err) {
      setError(err as Error);
      console.error('IPFS init error:', err);
    }
  }, []);

  return { ipfs, error };
};
