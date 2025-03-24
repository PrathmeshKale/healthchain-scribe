
import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";
import Navigation from "../components/Navigation";
import { Typewriter } from "@/components/ui/typewriter";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Stethoscope, Book } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  // Safely use router hooks within a component that's definitely inside Router
  const navigate = useNavigate();
  
  // Replace direct link with navigation function
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  const handleViewGitHub = () => {
    window.open("https://github.com/your-repo", "_blank");
  };
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <HeroSection
        badge={{
          text: "Revolutionizing Healthcare Records",
          action: {
            text: "Learn More",
            href: "#",
            onClick: () => navigate('/about')
          },
        }}
        title={
          <div className="flex flex-col items-center">
            <span>Secure</span>
            <Typewriter
              text={[
                "Health Records",
                "Patient Data",
                "Medical History",
                "Clinical Notes",
              ]}
              speed={70}
              className="text-primary"
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="_"
            />
            <span>on the Blockchain</span>
          </div>
        }
        description="Take control of your medical data with our decentralized platform. Secure, accessible, and always under your control."
        actions={[
          {
            text: "Get Started",
            onClick: handleGetStarted,
            variant: "default",
          },
          {
            text: "View on GitHub",
            onClick: handleViewGitHub,
            variant: "outline",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          alt: "HealthChain Platform Interface",
        }}
      />

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose HealthChain?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="pt-8 text-center space-y-4">
                <Shield className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your medical records are encrypted and secured using blockchain technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="pt-8 text-center space-y-4">
                <Stethoscope className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Easy Access</h3>
                <p className="text-muted-foreground">
                  Access your health records anytime, anywhere, with authorized healthcare providers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="pt-8 text-center space-y-4">
                <Book className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Complete History</h3>
                <p className="text-muted-foreground">
                  Keep track of your entire medical history in one secure location
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Trusted by Healthcare Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-primary">10k+</p>
              <p className="text-lg text-muted-foreground">Active Patients</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-primary">500+</p>
              <p className="text-lg text-muted-foreground">Healthcare Providers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-primary">99.9%</p>
              <p className="text-lg text-muted-foreground">Uptime Guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
