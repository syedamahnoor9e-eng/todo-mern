import { motion } from "framer-motion";
import { Check, Circle, Clock, Star } from 'lucide-react';

export function ProductShowcase() {
    return (
        <section id="product" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Beautiful design meets
                        <br />
                        <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            powerful functionality
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A workspace so intuitive, you'll wonder how you ever worked without it.
                    </p>
                </motion.div>

                {/* Product mockup */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Main app window */}
                    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        {/* Window header */}
                        <div className="bg-slate-800/50 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 text-center text-xs text-slate-500">
                                TaskManager - My Projects
                            </div>
                        </div>

                        {/* App content */}
                        <div className="flex">
                            {/* Sidebar */}
                            <div className="w-64 bg-slate-900/50 border-r border-white/5 p-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30">
                                        <Circle className="w-4 h-4 text-indigo-400" />
                                        <span className="text-sm text-white">All Tasks</span>
                                        <span className="ml-auto text-xs text-slate-400">24</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <Star className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-300">Important</span>
                                        <span className="ml-auto text-xs text-slate-400">8</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-300">Today</span>
                                        <span className="ml-auto text-xs text-slate-400">12</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-3">
                                        Projects
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-sm text-slate-300">Website Redesign</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                                            <span className="text-sm text-slate-300">Marketing Campaign</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-sm text-slate-300">Product Launch</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="flex-1 p-6">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-semibold text-white mb-1">Today's Tasks</h3>
                                    <p className="text-sm text-slate-400">You have 12 tasks to complete</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-5 h-5 rounded border-2 border-indigo-500 group-hover:bg-indigo-500/20 transition-colors" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium mb-1">Design new landing page</div>
                                                <div className="text-sm text-slate-400">Website Redesign • Due today</div>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 border-slate-900" />
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-violet-500 to-purple-500 border-2 border-slate-900 -ml-2" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-5 h-5 rounded border-2 border-slate-600 group-hover:bg-white/5 transition-colors flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-slate-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-slate-500 font-medium mb-1 line-through">Review marketing materials</div>
                                                <div className="text-sm text-slate-600">Marketing Campaign • Completed</div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-linear-to-br from-pink-500 to-rose-500 border-2 border-slate-900" />
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-5 h-5 rounded border-2 border-violet-500 group-hover:bg-violet-500/20 transition-colors" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium mb-1">Prepare product demo</div>
                                                <div className="text-sm text-slate-400">Product Launch • Due tomorrow</div>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-green-500 to-emerald-500 border-2 border-slate-900" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-linear-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium mb-1">Finalize Q1 roadmap</div>
                                                <div className="text-sm text-indigo-300">High priority • Due this week</div>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 border-slate-900" />
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 border-slate-900 -ml-2" />
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-violet-500 to-purple-500 border-2 border-slate-900 -ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="absolute -left-4 top-1/4 bg-linear-to-br from-slate-800 to-slate-900 border border-white/10 rounded-xl p-4 shadow-2xl hidden lg:block"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-violet-500" />
                            <div>
                                <div className="text-sm font-medium text-white">Sarah Johnson</div>
                                <div className="text-xs text-slate-400">assigned you a task</div>
                            </div>
                        </div>
                        <div className="text-xs text-slate-300">Review the Q1 metrics report</div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="absolute -right-4 bottom-1/4 bg-linear-to-br from-slate-800 to-slate-900 border border-white/10 rounded-xl p-4 shadow-2xl hidden lg:block"
                    >
                        <div className="text-sm font-medium text-white mb-2">Project Progress</div>
                        <div className="space-y-2">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Design</span>
                                    <span className="text-indigo-400">75%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-linear-to-r from-indigo-500 to-violet-500 rounded-full" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Development</span>
                                    <span className="text-violet-400">45%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-[45%] bg-linear-to-r from-violet-500 to-purple-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
