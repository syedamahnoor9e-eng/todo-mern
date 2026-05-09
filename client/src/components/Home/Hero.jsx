import { LuArrowRight, LuCircleCheckBig, LuSparkles, LuLogIn } from "react-icons/lu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] animate-pulse delay-1000" />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-6"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                            <LuCircleCheckBig className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-semibold">TaskManager</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
                        <a href="#product" className="text-sm text-slate-300 hover:text-white transition-colors">Product</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                                Sign in
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-5 py-2 rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-600 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all duration-300 font-semibold">
                                Get started
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center mt-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                >
                    <LuSparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-slate-300">Introducing the future of task management</span>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                    Organize your work,
                    <br />
                    <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Amplify your impact
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg sm:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    TaskManager brings together your tasks, projects, and team in one beautifully designed workspace.
                    Stay focused, move faster, and achieve more.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    {/* Primary Button */}
                    <Link to="/register">
                        <button className="group flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold text-lg shadow-[0_0_40px_rgba(139,92,246,0.45)] hover:scale-105 hover:shadow-[0_0_55px_rgba(139,92,246,0.75)] transition-all duration-300">
                            Start for free

                            <LuArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>

                    {/* Secondary Button */}
                    <Link to="/login">
                        <button className="flex items-center gap-3 px-8 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold text-lg transition-all duration-300">
                            <LuLogIn className="w-5 h-5" />
                            Sign In
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
                >
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </motion.div>
            </motion.div>
        </div>
    );
}
