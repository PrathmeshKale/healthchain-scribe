
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { useState, useEffect, useCallback } from 'react';
import { IPFS } from '../config/environment';
import { useToast } from '@/components/ui/use-toast';

export interface IPFSFile {
  cid: string;
  path: string;
  size: number;
}

export const useIPFS = () => {
  const [ipfs, setIpfs] = useState<IPFSHTTPClient | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const ipfsClient = create({ url: IPFS.localIPFS });
      setIpfs(ipfsClient);
      console.log('IPFS client initialized successfully');
    } catch (err) {
      setError(err as Error);
      console.error('IPFS init error:', err);
      toast({
        title: "IPFS Connection Error",
        description: "Could not connect to IPFS node. Please ensure your IPFS daemon is running.",
        variant: "destructive"
      });
    }
  }, []);

  const uploadToIPFS = useCallback(async (data: string | Blob | File): Promise<string | null> => {
    if (!ipfs) {
      setError(new Error('IPFS client not initialized'));
      toast({
        title: "IPFS Error",
        description: "IPFS client not initialized",
        variant: "destructive"
      });
      return null;
    }

    setIsUploading(true);
    try {
      let result;
      
      if (typeof data === 'string') {
        // Upload JSON string
        const jsonData = JSON.stringify(data);
        result = await ipfs.add(jsonData);
      } else {
        // Upload file
        result = await ipfs.add(data);
      }
      
      setIsUploading(false);
      console.log('Uploaded to IPFS:', result);
      toast({
        title: "Upload Successful",
        description: `Content added to IPFS with CID: ${result.path}`,
      });
      
      return result.path;
    } catch (err) {
      setIsUploading(false);
      setError(err as Error);
      console.error('IPFS upload error:', err);
      toast({
        title: "Upload Failed",
        description: `Failed to upload to IPFS: ${(err as Error).message}`,
        variant: "destructive"
      });
      return null;
    }
  }, [ipfs]);

  const getFromIPFS = useCallback(async (cid: string): Promise<any> => {
    if (!ipfs) {
      setError(new Error('IPFS client not initialized'));
      return null;
    }

    try {
      const stream = ipfs.cat(cid);
      let data = '';
      
      for await (const chunk of stream) {
        data += new TextDecoder().decode(chunk);
      }
      
      try {
        // Try to parse as JSON
        return JSON.parse(data);
      } catch {
        // Return as text if not valid JSON
        return data;
      }
    } catch (err) {
      setError(err as Error);
      console.error('IPFS retrieval error:', err);
      toast({
        title: "Retrieval Failed",
        description: `Failed to get content from IPFS: ${(err as Error).message}`,
        variant: "destructive"
      });
      return null;
    }
  }, [ipfs]);

  const getIPFSUrl = useCallback((cid: string): string => {
    return `${IPFS.localIPFSGet}${cid}`;
  }, []);

  return { 
    ipfs, 
    error, 
    isUploading,
    uploadToIPFS,
    getFromIPFS,
    getIPFSUrl
  };
};
