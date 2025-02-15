
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Card } from "@/components/ui/card";
import { ChartLineUp, Users, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back to your health records dashboard</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Total Patients"
              value="1,234"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
            <StatsCard
              title="Active Records"
              value="856"
              icon={<ChartLineUp className="w-6 h-6 text-primary" />}
            />
            <StatsCard
              title="Appointments"
              value="89"
              icon={<Calendar className="w-6 h-6 text-primary" />}
            />
          </motion.div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="col-span-2 p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        {icon}
      </div>
    </div>
  </Card>
);

const activities = [
  { title: "New patient record added", time: "5 minutes ago" },
  { title: "Medical report updated", time: "1 hour ago" },
  { title: "Appointment scheduled", time: "2 hours ago" },
  { title: "Lab results uploaded", time: "3 hours ago" },
];

const actions = [
  {
    label: "Add New Patient",
    icon: <Users className="w-5 h-5 text-gray-600" />,
  },
  {
    label: "Schedule Appointment",
    icon: <Calendar className="w-5 h-5 text-gray-600" />,
  },
  {
    label: "View Reports",
    icon: <ChartLineUp className="w-5 h-5 text-gray-600" />,
  },
];

export default Dashboard;
