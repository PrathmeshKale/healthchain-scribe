
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Web3Provider } from "./components/Web3Provider";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DoctorsPage from "./pages/doctors";
import PatientsPage from "./pages/patients";
import PatientDashboard from "./pages/patient-dashboard";
import DoctorDashboard from "./pages/doctor-dashboard";
import PatientRecords from "./pages/patient/records";
import PatientAppointments from "./pages/patient/appointments";
import PatientMessages from "./pages/patient/messages";
import ProfileEdit from "./pages/patient/ProfileEdit";
import LoginPage from "./pages/login";
import NotFound from "./pages/NotFound";
import AppointmentsPage from "./pages/appointments";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background font-sans">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctors"
                  element={
                    <ProtectedRoute requireAdmin>
                      <DoctorsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patients"
                  element={
                    <ProtectedRoute requireAdmin>
                      <PatientsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AppointmentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient-dashboard"
                  element={
                    <ProtectedRoute userType="patient">
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/records"
                  element={
                    <ProtectedRoute userType="patient">
                      <PatientRecords />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/appointments"
                  element={
                    <ProtectedRoute userType="patient">
                      <PatientAppointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/messages"
                  element={
                    <ProtectedRoute userType="patient">
                      <PatientMessages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/settings"
                  element={
                    <ProtectedRoute userType="patient">
                      <ProfileEdit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor-dashboard"
                  element={
                    <ProtectedRoute userType="doctor">
                      <DoctorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </Web3Provider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
