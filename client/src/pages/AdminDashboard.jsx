import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";
import ConfirmModal from "../components/ConfirmModel";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "danger",
        onConfirm: () => { }
    });

    const triggerConfirm = (config) => {
        setModalConfig({ ...config, isOpen: true });
    };

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await API.get("/auth/all-users");
            setUsers(data);
        } catch (error) { setError("Failed to load users"); }
        finally { setLoading(false); }
    };

    const fetchTasks = async () => {
        try {
            const { data } = await API.get("/auth/all-tasks");
            setTasks(data);
            setSelectedUser(null);
        } catch (error) { console.log(error); }
    };

    const fetchStats = async () => {
        try {
            const { data } = await API.get("/auth/stats");
            setStats(data);
        } catch (error) { console.log(error); }
    };

    const deleteUser = (user) => {
        if (user.role === "admin") return alert("Cannot delete another admin");

        triggerConfirm({
            title: "Delete User?",
            message: `This will permanently remove ${user.name} and all their associated data.`,
            type: "danger",
            onConfirm: async () => {
                try {
                    await API.delete(`/auth/delete-user/${user._id}`);
                    fetchUsers(); fetchStats();
                } catch (error) { console.log(error); }
            }
        });
    };

    const deleteTask = (taskId) => {
        triggerConfirm({
            title: "Delete Task?",
            message: "Are you sure you want to permanently delete this task?",
            type: "danger",
            onConfirm: async () => {
                try {
                    await API.delete(`/tasks/${taskId}`);
                    await Promise.all([fetchTasks(), fetchStats()]);
                } catch (error) {
                    console.error("Delete failed:", error);
                }
            }
        });
    };

    const makeAdmin = (userId) => {
        triggerConfirm({
            title: "Promote to Admin?",
            message: "This user will gain full access. Are you sure?",
            type: "primary",
            onConfirm: async () => {
                try {
                    await API.put(`/auth/make-admin/${userId}`);
                    fetchUsers();
                } catch (error) { console.log(error); }
            }
        });
    };

    const viewUserTasks = async (user) => {
        try {
            const { data } = await API.get(`/auth/user-tasks/${user._id}`);
            setTasks(data);
            setSelectedUser(user);
        } catch (error) { console.log(error); }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high": return "text-rose-500";
            case "medium": return "text-amber-500";
            case "low": return "text-emerald-500";
            default: return "text-slate-500";
        }
    };

    useEffect(() => {
        fetchUsers(); fetchTasks(); fetchStats();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-6 md:space-y-8 px-2 md:px-0">
                {/* Header Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">Admin Dashboard</h2>
                    <p className="text-slate-500 font-medium text-sm md:text-base">System-wide overview and user management.</p>
                </div>

                {/* Statistics Grid - 2x2 on mobile, 4x1 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    {[
                        { label: "Users", val: stats.totalUsers, color: "text-indigo-600", bg: "bg-indigo-50" },
                        { label: "Tasks", val: stats.totalTasks, color: "text-slate-600", bg: "bg-slate-50" },
                        { label: "Done", val: stats.completedTasks, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Pending", val: stats.pendingTasks, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} p-4 md:p-6 rounded-2xl border border-transparent hover:border-slate-200 transition-all`}>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{s.label}</h4>
                            <p className={`text-xl md:text-3xl font-black ${s.color}`}>{s.val || 0}</p>
                        </div>
                    ))}
                </div>

                {/* User Management Section */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                        <h3 className="text-base md:text-lg font-bold text-slate-800">User Management</h3>
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="w-full sm:w-64 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Horizontal Scroll wrapper for Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-150">
                            <thead>
                                <tr className="text-slate-400 text-[10px] md:text-[11px] uppercase tracking-widest border-b border-slate-50">
                                    <th className="px-6 py-4 font-black">User Details</th>
                                    <th className="px-6 py-4 font-black">Role</th>
                                    <th className="px-6 py-4 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                                            <p className="text-[11px] text-slate-500">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                            <button onClick={() => makeAdmin(user._id)} className="text-[11px] cursor-pointer font-bold text-indigo-600 hover:underline">Promote</button>
                                            <button onClick={() => viewUserTasks(user)} className="text-[11px] cursor-pointer font-bold text-slate-600 hover:underline">Tasks</button>
                                            {user.role !== "admin" && (
                                                <button onClick={() => deleteUser(user)} className="text-[11px] cursor-pointer font-bold text-rose-600 hover:underline">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Task Log Section */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h3 className="text-base md:text-lg font-bold text-slate-800">
                            {selectedUser ? `Activity: ${selectedUser.name}` : "System Task Log"}
                        </h3>
                        {selectedUser && (
                            <button onClick={fetchTasks} className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                                View All System Tasks
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-175">
                            <thead>
                                <tr className="text-slate-400 text-[10px] md:text-[11px] uppercase tracking-widest border-b border-slate-50">
                                    <th className="px-6 py-4 font-black">Task Title</th>
                                    <th className="px-6 py-4 font-black">Assigned To</th>
                                    <th className="px-6 py-4 font-black">Status</th>
                                    <th className="px-6 py-4 font-black text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800 text-sm">{task.title}</p>
                                            <p className={`text-[9px] font-bold uppercase ${getPriorityColor(task.priority)}`}>{task.priority} Priority</p>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] text-slate-600">{task.user?.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                <span className="text-[11px] font-bold text-slate-700">{task.completed ? "Done" : "In Progress"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => deleteTask(task._id)} className="p-2 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer">
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <ConfirmModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                onConfirm={modalConfig.onConfirm}
            />
        </DashboardLayout>
    );
};

export default AdminDashboard;