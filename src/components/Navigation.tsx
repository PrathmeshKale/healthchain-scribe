
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Listen for account changes
          window.ethereum.on('accountsChanged', function (accounts: string[]) {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error("User denied account access");
        }
      }
    };

    initWeb3();

    // Cleanup listener on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors">
          HealthChain
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          {account && (
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              {formatAddress(account)}
            </span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 glass md:hidden py-4 px-6 slide-in">
            <NavLinks mobile onClick={toggleMenu} />
            {account && (
              <div className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm text-center">
                {formatAddress(account)}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile, onClick }: { mobile?: boolean; onClick?: () => void }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/doctors", label: "Doctors" },
    { href: "/patients", label: "Patients" },
  ];

  return (
    <div className={`${mobile ? "flex flex-col space-y-4" : "flex space-x-8"}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-gray-600 hover:text-primary transition-colors"
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
