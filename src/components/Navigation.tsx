
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

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
          {isAuthenticated && isAdmin && <NavLinks />}
          {account ? (
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                {formatAddress(account)}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Connect Wallet
            </Button>
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
            {isAuthenticated && isAdmin && <NavLinks mobile onClick={toggleMenu} />}
            {account ? (
              <div className="mt-4 space-y-4">
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm text-center">
                  {formatAddress(account)}
                </div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  navigate('/login');
                  toggleMenu();
                }}
              >
                Connect Wallet
              </Button>
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
