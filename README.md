# HealthChain Scribe

A blockchain-based healthcare management system that enables secure storage and access to medical records, appointment scheduling, and doctor verification.

## Overview

HealthChain Scribe leverages blockchain technology to create a decentralized healthcare platform where:

- **Administrators** can manage doctors and patients
- **Doctors** can access verified patient records
- **Patients** can securely manage their medical information

The application uses smart contracts on Ethereum to manage roles and store doctor credentials, while utilizing IPFS for decentralized storage of medical records.

## Features

- **Role-Based Access Control**: Different dashboards and permissions for admins, doctors, and patients
- **Secure Medical Records**: Patient records stored on IPFS with blockchain verification
- **Doctor Verification**: Smart contract verification of doctor credentials
- **Appointment Management**: Schedule and manage healthcare appointments
- **Messaging System**: Communication between patients and healthcare providers
- **Profile Management**: User profile editing and management

## Technology Stack

- **Frontend**:
  - React with TypeScript
  - Vite for build tooling
  - React Router for navigation
  - TanStack Query for data fetching
  - Tailwind CSS for styling

- **Blockchain**:
  - Solidity smart contracts
  - Web3.js for blockchain interaction
  - Truffle for contract migrations

- **Storage**:
  - IPFS for decentralized file storage

## Project Structure

- `/src`: Frontend React application
  - `/components`: Reusable UI components
  - `/contexts`: React context providers
  - `/hooks`: Custom React hooks
  - `/pages`: Application pages
  - `/lib`: Utility functions
  - `/abis`: Contract ABIs
  - `/types`: TypeScript type definitions

- `/contracts`: Solidity smart contracts
  - `Contract.sol`: Main contract for doctor management
  - `Roles.sol`: Role-based access control library
  
- `/migrations`: Truffle migration scripts

## Getting Started

### Prerequisites

- Node.js and npm
- Ethereum wallet (MetaMask recommended)
- IPFS node (for development)
- Truffle (for smart contract deployment)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/PrathmeshKale/healthchain-scribe
   cd healthchain-scribe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.development` file with:
   ```
   VITE_IPFS_URL=http://127.0.0.1:5001/api/v0
   VITE_IPFS_GATEWAY=http://localhost:8080/ipfs/
   VITE_PRODUCTION=false
   ```

4. Compile and migrate smart contracts:
   ```
   truffle compile
   truffle migrate
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Development

### Smart Contract Development

The project uses Truffle for smart contract compilation and deployment. The main contracts are:

- `Contract.sol`: Manages doctor information and roles
- `Roles.sol`: Library for role-based access control

### Frontend Development

The application is built with React and TypeScript using Vite as the build tool. It includes:

- Protected routes based on user roles
- Different dashboards for admins, doctors, and patients
- Integration with Web3 for blockchain interaction

## License

This project is licensed under the MIT License.
