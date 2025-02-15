
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors">
          HealthChain
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
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
