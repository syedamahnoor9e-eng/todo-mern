import { motion } from "framer-motion";
import {
    LuSquareCheck,
    LuShieldCheck,
    LuZap,
    LuSmartphone,
    LuRefreshCw,
    LuRocket,
    LuLayoutDashboard,
    LuDatabase
} from "react-icons/lu";

const features = [
    {
        title: "Task Management",
        description: "Create, update, organize, and track your daily tasks with an intuitive and responsive interface.",
        icon: LuSquareCheck, 
        gradient: "from-orange-500 to-amber-500",
    },
    {
        title: "Secure Authentication",
        description: "Protected login and signup system with JWT authentication and encrypted user sessions.",
        icon: LuShieldCheck,
        gradient: "from-emerald-500 to-green-500",
    },
    {
        title: "Smart Productivity",
        description: "Stay focused with categorized tasks, completion tracking, and productivity-driven workflows.",
        icon: LuZap,
        gradient: "from-yellow-400 to-orange-500",
    },
    {
        title: "Responsive Design",
        description: "Fully optimized experience across desktop, tablet, and mobile devices with modern UI.",
        icon: LuSmartphone,
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        title: "Real-Time Updates",
        description: "Instant task updates and seamless interactions powered by the MERN stack architecture.",
        icon: LuRefreshCw,
        gradient: "from-pink-500 to-rose-500",
    },
    {
        title: "Fast Performance",
        description: "Built with React, Node.js, and MongoDB for lightning-fast performance and scalability.",
        icon: LuRocket,
        gradient: "from-violet-500 to-purple-500",
    },
    {
        title: "Clean Dashboard",
        description: "Minimal and elegant dashboard designed to help users stay organized without distractions.",
        icon: LuLayoutDashboard,
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        title: "Cloud Database",
        description: "Securely store and manage your tasks with MongoDB database integration and persistent storage.",
        icon: LuDatabase,
        gradient: "from-fuchsia-500 to-pink-500",
    },
];


export function Features() {
    return (
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Everything you need to
                        <br />
                        <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            succeed
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Powerful features designed to help you and your team stay organized,
                        focused, and productive.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                                <div className={`w-12 h-12 bg-linear-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-semibold mb-2 text-white">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
