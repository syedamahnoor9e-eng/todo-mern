import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import API from "../api/axios";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-500 font-bold animate-pulse">Loading...</p>
    </div>
  );

  return (
    // We use md:flex to keep them side-by-side on desktop
    // min-h-screen ensures the background covers the whole page
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50">

      {/* Sidebar Component */}
      <Sidebar role={user.role} />

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;