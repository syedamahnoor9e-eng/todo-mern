import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true }
};

const Home = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b1120] text-white overflow-x-hidden font-sans">

      {/* CURSOR GLOW - Hidden on touch devices for performance */}
      <div
        className="pointer-events-none fixed w-80 h-80 rounded-full blur-[120px] opacity-20 bg-indigo-500 hidden md:block"
        style={{
          left: mouse.x - 160,
          top: mouse.y - 160,
        }}
      />

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[150%] sm:w-225 h-125 bg-indigo-600/20 blur-[160px] top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-72 h-72 bg-cyan-500/10 blur-[100px] bottom-0 right-0" />
      </div>

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="bg-indigo-600 p-1.5 md:p-2 rounded-xl text-[10px] md:text-xs font-black">TM</div>
          <span className="text-base md:text-xl font-black tracking-tight md:tracking-wide">TaskManager</span>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 md:gap-6 items-center">
          <Link to="/login" className="text-sm md:text-base text-slate-400 hover:text-white transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 px-3 md:px-5 py-2 rounded-lg md:rounded-xl text-xs md:text-base font-semibold hover:bg-indigo-500 transition whitespace-nowrap shadow-lg shadow-indigo-600/20"
          >
            Join Now
          </Link>
        </div>
      </nav>
      {/* HERO */}
      <section className="text-center pt-20 md:pt-32 pb-24 md:pb-32 px-6 max-w-5xl mx-auto">
        <motion.h1 {...fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
          Manage your work.
          <br />
          <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Move faster. Stay organized.
          </span>
        </motion.h1>

        <motion.p {...fadeUp} className="text-slate-400 text-base md:text-lg mb-10 max-w-2xl mx-auto">
          TaskManager helps teams plan, prioritize, and execute work with clarity —
          all in one powerful dashboard.
        </motion.p>

        <motion.div {...fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link to="/register" className="bg-white text-black px-7 py-3.5 rounded-xl font-semibold hover:scale-105 transition shadow-lg">
            Get Started
          </Link>
          <Link to="/login" className="border border-slate-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition">
            Already have an account?
          </Link>
        </motion.div>

        <p className="text-[10px] md:text-xs text-slate-500 mt-8 mb-12 md:mb-20">
          Built for developers, teams, and productivity lovers
        </p>
      </section>

      {/* PREVIEW TITLE */}
      <motion.section {...fadeUp} className="text-center mb-12 md:mb-20 px-6">
        <p className="text-[10px] tracking-widest text-indigo-400 uppercase mb-4">Product Preview</p>
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          A powerful task dashboard
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Designed for clarity, speed, and real productivity.
        </p>
      </motion.section>

      {/* DASHBOARD */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-6 pb-32">
        <motion.div
          {...fadeUp}
          className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl"
        >
          {/* WINDOW HEADER */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            </div>
            <span className="ml-auto text-[10px] text-slate-500 font-mono tracking-tighter">TASK_DASHBOARD_V1</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR - Responsive Grid on Mobile */}
            <div className="w-full lg:w-56 lg:pr-6 lg:border-r border-slate-700 flex flex-row lg:flex-col gap-2 md:gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="whitespace-nowrap bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl flex items-center justify-between min-w-30 lg:w-full">
                <span className="text-sm font-bold">All Tasks</span>
                <span className="ml-2 text-xs opacity-70">24</span>
              </div>
              <div className="whitespace-nowrap text-slate-400 flex items-center justify-between px-4 py-2 min-w-30-full border border-transparent hover:border-slate-700 rounded-xl transition">
                <span className="text-sm">Completed</span>
                <span className="ml-2 text-xs opacity-50">18</span>
              </div>
              <div className="whitespace-nowrap text-slate-400 flex items-center justify-between px-4 py-2 min-w-30 lg:w-full border border-transparent hover:border-slate-700 rounded-xl transition">
                <span className="text-sm">Pending</span>
                <span className="ml-2 text-xs opacity-50">6</span>
              </div>
            </div>

            {/* TASKS */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg md:text-xl font-bold mb-4">Today's Tasks</h3>
              {[
                { title: "Build Login Page", level: "HIGH", progress: "80%" },
                { title: "Fix API Error", level: "MED", progress: "50%" },
                { title: "Deploy Project", level: "LOW", progress: "30%" },
              ].map((task, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/70 border border-slate-700 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm md:text-base">{task.title}</p>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500">{task.level}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1 rounded-full mt-3">
                    <div className="bg-indigo-500 h-1 rounded-full transition-all duration-1000" style={{ width: task.progress }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FLOATING DECORATIONS - Hidden on Mobile */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="hidden xl:block absolute -left-10 top-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-xl w-44 shadow-2xl"
          >
            <p className="text-xs font-bold text-indigo-400 mb-1 tracking-wider uppercase">Live Activity</p>
            <p className="text-sm font-semibold">New Task Assigned</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="hidden xl:block absolute -right-10 bottom-16 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-xl w-44 shadow-2xl"
          >
            <p className="text-xs font-bold text-cyan-400 mb-1 tracking-wider uppercase">Overview</p>
            <p className="text-sm font-semibold">18/24 Completed</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-widest text-indigo-400 uppercase mb-4">Core Features</p>
          <h2 className="text-2xl md:text-4xl font-black mb-4">Built for productivity</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Smart Prioritization", desc: "Focus on high-impact tasks first." },
            { title: "Clean Dashboard", desc: "Track everything in one place." },
            { title: "Personal Focus", desc: "Stay focused and manage daily tasks with clarity." },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group bg-linear-to-b from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-indigo-500/50 transition duration-300"
            >
              <div className="h-1 w-8 bg-indigo-500 rounded mb-6 group-hover:w-16 transition-all" />
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 border-t border-slate-800 px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs md:text-sm text-slate-400 mb-6 font-medium">
          <span className="hover:text-white cursor-pointer transition">About</span>
          <span className="hover:text-white cursor-pointer transition">Features</span>
          <span className="hover:text-white cursor-pointer transition">Github</span>
          <span className="hover:text-white cursor-pointer transition">Contact</span>
        </div>
        <p className="text-[10px] md:text-xs text-slate-500 tracking-wide uppercase">
          © 2026 TaskManager • Crafted for MERN Portfolios
        </p>
      </footer>

    </div>
  );
};

export default Home;