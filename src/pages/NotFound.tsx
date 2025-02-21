
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NotFound as NotFoundComponent, Illustration } from "@/components/ui/not-found";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFoundComponent
          title="Page not found"
          description="Lost, this page is. In another system, it may be."
        />
      </div>
    </div>
  );
};

export default NotFound;
