
import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <HeroSection
        badge={{
          text: "Revolutionizing Healthcare Records",
          action: {
            text: "Learn More",
            href: "/about",
          },
        }}
        title="Secure Health Records on the Blockchain"
        description="Take control of your medical data with our decentralized platform. Secure, accessible, and always under your control."
        actions={[
          {
            text: "Get Started",
            href: "/dashboard",
            variant: "default",
          },
          {
            text: "View on GitHub",
            href: "https://github.com/your-repo",
            variant: "outline",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          alt: "HealthChain Platform Interface",
        }}
      />
    </div>
  );
};

export default Index;
