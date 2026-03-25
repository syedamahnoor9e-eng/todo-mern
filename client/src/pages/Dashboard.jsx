import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await API.get(`/tasks?search=${search}&page=${page}`);
      setTasks(data.tasks);
      setPages(data.pages);
    } catch (error) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, page]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 px-2 md:px-0">

        {/* Header Section - Responsive Flex */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-center md:text-left">
              User Dashboard
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base text-center md:text-left">
              Manage and track your daily productivity.
            </p>
          </div>

          {/* Search Bar - Full width on mobile */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full md:w-72 pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards Section - Stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm transition-transform active:scale-[0.98]">
            <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wider">Total Tasks</p>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{tasks.length}</p>
          </div>
          <div className="bg-emerald-50 p-5 md:p-6 rounded-2xl border border-emerald-100 shadow-sm transition-transform active:scale-[0.98]">
            <p className="text-[10px] md:text-sm font-bold text-emerald-600 uppercase tracking-wider">Completed</p>
            <p className="text-2xl md:text-3xl font-black text-emerald-700">{tasks.filter(t => t.completed).length}</p>
          </div>
          <div className="bg-amber-50 p-5 md:p-6 rounded-2xl border border-amber-100 shadow-sm transition-transform active:scale-[0.98] sm:col-span-2 lg:col-span-1">
            <p className="text-[10px] md:text-sm font-bold text-amber-600 uppercase tracking-wider">Pending</p>
            <p className="text-2xl md:text-3xl font-black text-amber-700">{tasks.filter(t => !t.completed).length}</p>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Task</h3>
          <TaskForm fetchTasks={fetchTasks} />
        </div>

        {/* Task List Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900 text-center sm:text-left">Your Tasks</h3>

            {/* Filter Buttons - Scrollable on mobile */}
            <div className="flex bg-slate-100 p-1 rounded-lg self-center sm:self-auto overflow-x-auto max-w-full">
              {["all", "completed", "pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 md:px-4 py-1.5 text-xs md:text-sm font-bold rounded-md capitalize transition-all whitespace-nowrap ${filter === f
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 cursor-pointer"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-10">
              <p className="text-slate-500 animate-pulse font-medium">Loading tasks...</p>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl font-medium text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="min-h-50 overflow-x-auto rounded-xl">
              <TaskList tasks={sortedTasks} fetchTasks={fetchTasks} />
            </div>
          )}
        </div>

        {/* Pagination Section - Centered/Wrapped for mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            ← Previous
          </button>

          <span className="text-xs md:text-sm font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;