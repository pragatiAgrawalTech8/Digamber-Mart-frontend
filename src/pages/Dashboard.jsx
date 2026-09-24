import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <Sidebar />

      <main className="md:ml-[300px] p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;