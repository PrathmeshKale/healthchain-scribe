
interface Environment {
  production: boolean;
}

interface IPFSConfig {
  localIPFS: string;
  localIPFSGet: string;
}

export const environment: Environment = {
  production: import.meta.env.PROD || false
};

export const IPFS: IPFSConfig = {
  localIPFS: import.meta.env.VITE_IPFS_URL || 'http://127.0.0.1:5001/api/v0',
  localIPFSGet: import.meta.env.VITE_IPFS_GATEWAY || 'http://localhost:8080/ipfs/'
};
