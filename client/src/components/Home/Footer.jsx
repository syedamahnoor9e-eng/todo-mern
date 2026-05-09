import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { LuCircleCheck } from "react-icons/lu"; 

export function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-linear-to-brrom-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                                <LuCircleCheck className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-semibold">TaskManager</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 max-w-xs">
                            The modern task management platform that helps teams stay organized and productive.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                                <FaTwitter className="w-5 h-5 text-slate-400" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                                <FaGithub className="w-5 h-5 text-slate-400" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                                <FaLinkedin className="w-5 h-5 text-slate-400" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Features</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Security</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Roadmap</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">About</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">API</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Community</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2026 TaskManager. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
