
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 section-padding">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                Secure • Decentralized • Accessible
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
              The Future of Health Records
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience seamless, secure, and decentralized electronic health record management powered by blockchain technology.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="px-8 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-gradient p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const features = [
  {
    icon: <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>,
    title: "Secure Storage",
    description: "Your medical records are encrypted and stored securely on the blockchain, ensuring complete privacy and protection."
  },
  {
    icon: <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    title: "Access Control",
    description: "Grant and revoke access to your medical records with granular control over who can view your information."
  },
  {
    icon: <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>,
    title: "Instant Access",
    description: "Access your medical records instantly from anywhere, ensuring quick and efficient healthcare delivery."
  }
];

export default Index;
