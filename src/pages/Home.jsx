import { ArrowRight, Sparkles, Shield, Brain, Activity, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="w-full relative overflow-x-hidden pb-12 z-[1]">
      {/* Decorative fixed background elements for premium feel */}
      <div className="fixed top-0 w-full h-[100vh] bg-transparent transition-colors duration-300 -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-blue opacity-[0.05] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-indigo-400 opacity-[0.04] rounded-full blur-[130px]"></div>
      </div>

      {/* Hero Section Container */}
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 max-w-7xl mx-auto relative pt-0 pb-20 z-[1]"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center z-10 relative">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-black/30 backdrop-blur-md text-brand-blue px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-brand-blue/20 dark:border-white/10 animate-bounce cursor-pointer group hover:bg-brand-blue/10 dark:hover:bg-white/10 transition-colors mb-4">
            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Introducing Medvision</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold pb-2 bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent dark:bg-none dark:text-white w-full tracking-tighter whitespace-nowrap overflow-visible transition-colors">
            Your AI-Powered Pharmacy Assistant
          </h1>
          
          <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-brand-blue tracking-tighter mt-1 h-16 md:h-24 lg:h-28 flex items-center justify-center w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Typewriter
              options={{
                strings: ['Scan', 'Schedule', 'Consult'],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </h2>
          
          <p className="text-base md:text-lg text-gray-500/90 dark:text-gray-400 max-w-2xl mx-auto mt-2 leading-relaxed px-4 font-medium tracking-tight">
            Your intelligent digital health companion. Manage your prescriptions, seamlessly understand dosages, and schedule your medication routines effortlessly.
          </p>

          <Link to="/scan" className="mt-8 bg-brand-blue text-white font-bold tracking-wide text-[0.95rem] px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(0,163,255,0.25)] dark:shadow-blue-500/20 hover:shadow-[0_10px_25px_rgba(0,163,255,0.4)] dark:hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer relative z-50">
            <span>OPEN MEDVISION</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Locked Chatbot Bottom Bar within viewport */}
        <div className="absolute bottom-6 md:bottom-10 w-full max-w-2xl px-6 md:px-0 z-50 left-1/2 -translate-x-1/2">
          <motion.div whileTap={{ scale: 1.05 }}>
            <Link to="/chatbot" className="block relative group shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_15px_50px_rgba(0,163,255,0.15)] bg-white/70 dark:bg-[#161B22]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 cursor-pointer ring-1 ring-gray-100/50 dark:ring-transparent">
              <input 
                type="text" 
                placeholder="Ask Chatbot..." 
                readOnly
                className="w-full bg-transparent rounded-full py-4 pl-7 pr-16 text-gray-800 dark:text-gray-200 text-base focus:outline-none transition-all duration-300 placeholder-gray-400 cursor-pointer pointer-events-none font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-blue text-white p-2.5 rounded-full shadow-[0_4px_15px_rgba(0,163,255,0.4)] cursor-pointer pointer-events-none group-hover:bg-blue-500 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.6)]">
                <ArrowRight size={20} className="stroke-[2.5]" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about" 
        className="min-h-screen flex flex-col justify-center py-16 px-4 max-w-5xl mx-auto w-full relative z-10 scroll-mt-20"
      >
         <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Mission</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-3 text-lg px-2 font-medium">We believe taking medication safely should be accessible and universally understood.</p>
         </div>
         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--card-bg)] dark:bg-slate-800 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 dark:border-slate-700 hover:-translate-y-[10px] hover:shadow-[0_20px_50px_rgba(0,163,255,0.15)] transition-all duration-500 group relative overflow-hidden cursor-default">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10 group-hover:bg-brand-blue/10 transition-colors"></div>
               <div className="bg-white/80 dark:bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-gray-100/50 dark:border-transparent shadow-sm transition-all duration-500 text-brand-blue group-hover:shadow-[0_0_20px_rgba(0,163,255,0.5)] group-hover:text-brand-blue dark:text-blue-300">
                 <Activity size={26} />
               </div>
               <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Empowering Patients</h3>
               <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">Medvision bridges the gap between doctors and home. We decode complex medical jargon into easy-to-understand advice.</p>
            </div>
            <div className="bg-[var(--card-bg)] dark:bg-slate-800 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 dark:border-slate-700 hover:-translate-y-[10px] hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-500 group relative overflow-hidden cursor-default">
               <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400/5 rounded-br-full -z-10 group-hover:bg-indigo-400/10 transition-colors"></div>
               <div className="bg-white/80 dark:bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-gray-100/50 dark:border-transparent shadow-sm transition-all duration-500 text-indigo-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:text-indigo-500 dark:text-indigo-300">
                 <Shield size={26} />
               </div>
               <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Guarding Your Health</h3>
               <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">Our AI cross-references your medications to detect dangerous interactions before they happen, flawlessly monitoring safety.</p>
            </div>
         </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        id="features" 
        className="min-h-screen flex flex-col justify-center py-16 px-4 w-full md:max-w-6xl mx-auto scroll-mt-20 mt-8 mb-16"
      >
        <div className="bg-transparent backdrop-blur-3xl text-gray-900 dark:text-white rounded-[2.5rem] relative overflow-hidden pb-16 pt-14 w-full min-h-[70vh] flex flex-col justify-center transition-colors duration-300">
            {/* Soft grid background effect tailored to mode */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwxNjMsMjU1LDAuMDUpIi8+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-60 dark:opacity-30 pointer-events-none"></div>

            <div className="relative z-10 w-full mb-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Revolutionary Features</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">Next-generation pharmaceutical tools right in your pocket.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 px-6 lg:px-10">
                    <div className="bg-white/60 dark:bg-slate-800 backdrop-blur-xl transition-all duration-500 p-8 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:-translate-y-[10px] group cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(0,163,255,0.12)] dark:hover:shadow-[0_15px_40px_rgba(0,163,255,0.15)] hover:border-brand-blue/30 dark:hover:border-slate-600 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-brand-blue/10 dark:bg-brand-blue/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-brand-blue dark:text-blue-300 border border-gray-100 dark:border-transparent shadow-sm group-hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] group-hover:text-white group-hover:bg-brand-blue transition-all duration-500">
                            <ScanLine size={28} />
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Smart Scanning</h3>
                        <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">Instantly read prescription labels and categorize your intake utilizing powerful camera integration and OCR.</p>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800 backdrop-blur-xl transition-all duration-500 p-8 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:-translate-y-[10px] group cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)] dark:hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30 dark:hover:border-slate-600 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-purple-500 dark:text-purple-300 border border-gray-100 dark:border-transparent shadow-sm group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:text-white group-hover:bg-purple-500 transition-all duration-500">
                            <Brain size={28} />
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">AI Consultations</h3>
                        <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">Chat with an intelligent digital pharmacist to understand exactly what your pills do and when to take them.</p>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800 backdrop-blur-xl transition-all duration-500 p-8 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:-translate-y-[10px] group cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] dark:hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 dark:hover:border-slate-600 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-emerald-500 dark:text-emerald-300 border border-gray-100 dark:border-transparent shadow-sm group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:text-white group-hover:bg-emerald-500 transition-all duration-500">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Secure History</h3>
                        <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-medium text-sm md:text-base">Keep endless immutable encrypted records of your drug intake synced directly back to your cloud session securely.</p>
                    </div>
                </div>
            </div>
        </div>
      </motion.section>
    </main>
  );
}
