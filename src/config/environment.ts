
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
  localIPFS: 'http://127.0.0.1:5001/api/v0',
  localIPFSGet: 'http://localhost:8080/ipfs/'
};

// Now we need to update our IPFS hook to use these configuration values
