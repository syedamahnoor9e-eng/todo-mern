import { useState } from "react";
import API from "../api/axios";

const TaskItem = ({ task, fetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ""
  });

  const toggleComplete = async () => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) { console.log(error); }
  };

  const deleteTask = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch (error) { console.log(error); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${task._id}`, formData);
      setEditing(false);
      fetchTasks();
    } catch (error) { console.log(error); }
  };

  const priorityClasses = {
    high: "bg-rose-500",
    medium: "bg-amber-500",
    low: "bg-emerald-500"
  };

  if (editing) {
    return (
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-lg space-y-4">
        <input name="title" className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500" value={formData.title} onChange={handleChange} />
        <textarea name="description" className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500" value={formData.description} onChange={handleChange} />
        <div className="flex gap-2">
          <select name="priority" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" name="dueDate" className="flex-1 px-3 py-2 rounded-lg border border-slate-200" value={formData.dueDate} onChange={handleChange} />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">Save</button>
          <button type="button" onClick={() => setEditing(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Side Priority Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${priorityClasses[task.priority]}`}></div>

      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-bold leading-tight ${task.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
          {task.title}
        </h3>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${task.completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
          {task.completed ? "Done" : "Pending"}
        </span>
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <span>📅</span>
          {task.dueDate && (
            <span className={new Date(task.dueDate) < new Date() && !task.completed ? "text-rose-600 animate-pulse" : ""}>
              {new Date(task.dueDate) < new Date() && !task.completed ? "⚠ Overdue" : new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span>🔥</span>
          <span className="capitalize">{task.priority} Priority</span>
        </div>
      </div>

      <div className="flex gap-2 mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={toggleComplete} className="flex-1 py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Check</button>
        <button onClick={() => setEditing(true)} className="flex-1 py-2 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-slate-200 transition-all">Edit</button>
        <button onClick={deleteTask} className="flex-1 py-2 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-all">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;