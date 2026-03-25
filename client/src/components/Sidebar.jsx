import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react"; 
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ role }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
      ? "bg-indigo-600/10 text-indigo-400 border-l-4 border-indigo-600 rounded-l-none"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON - Only visible on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* SIDEBAR CONTAINER */}
      <div className={`
        fixed md:sticky top-0 left-0 z-40
        w-64 bg-[#0f172a] text-white h-screen flex flex-col p-6 border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Brand Header */}
        <div className="mb-10 px-2 mt-8 md:mt-0">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-sm italic shadow-lg shadow-indigo-500/20">
              TM
            </div>
            Task Manager
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">Main Menu</p>
          <NavLink to="/dashboard" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <span className="text-lg">📊</span>
            Dashboard
          </NavLink>

          {role === "admin" && (
            <>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-8 mb-4 ml-4">Admin Only</p>
              <NavLink to="/admin" className={navLinkClass} onClick={() => setIsOpen(false)}>
                <span className="text-lg">🛡️</span>
                User Management
              </NavLink>
            </>
          )}
        </nav>

        {/* User & Logout Section */}
        <div className="mt-auto border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold shadow-inner shrink-0">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate capitalize">{user?.name || "User"}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{user?.role || role}</p>
            </div>
          </div>

          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 font-bold rounded-xl hover:bg-rose-500/10 transition-all group cursor-pointer">
            <span className="group-hover:translate-x-1 transition-transform">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* OVERLAY for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;