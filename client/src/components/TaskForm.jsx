import { useState } from "react";
import API from "../api/axios";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description, priority, dueDate });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-end gap-4">
      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Title</label>
        <input
          type="text"
          placeholder="Task title"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex-[1.5] w-full">
        <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Description</label>
        <input
          type="text"
          placeholder="Brief details..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="w-full lg:w-32">
        <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Priority</label>
        <select
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer appearance-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="w-full lg:w-44">
        <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Due Date</label>
        <input
          type="date"
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="w-full lg:w-auto px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;