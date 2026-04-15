import { Bot, Target, HeartPulse } from 'lucide-react';

export default function About() {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-6 duration-700">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center">
         <Bot className="mr-4 text-brand-blue animate-bounce" size={44} />
         About Medvision
      </h1>
      
      {/* Section 1: The Vision */}
      <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-lg shadow-gray-200/50 dark:shadow-none mb-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 cursor-default">
         <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/5 rounded-bl-full -z-10"></div>
         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <Target className="mr-3 text-brand-blue" />
            The Vision
         </h2>
         <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            Medical information is fundamentally gatekept by complex terminology, confusing prescriptions, and disconnected health portals. Often, patients are handed a bottle with instructions they don't fully understand, potentially leading to dangerous chemical intersections.
         </p>
         <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <strong>Medvision AI was built to democratize medical knowledge</strong>, giving people an incredibly accessible, hyper-intelligent clinical assistant directly in their pocket.
         </p>
      </div>

      {/* Section 2: How It Works */}
      <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-lg shadow-gray-200/50 dark:shadow-none mb-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 cursor-default">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <HeartPulse className="mr-3 text-red-500 animate-pulse" />
            How It Works
         </h2>
         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="h-full bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default rounded-xl p-6">
                   <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-2">1. Snap a Photo</h3>
                   <p className="text-gray-700 dark:text-gray-400 leading-relaxed">Simply snap a picture of any medication label, pill bottle, or physical prescription document using our built-in Smart Scanner array.</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="h-full bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default rounded-xl p-6">
                   <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-2">2. Instant Processing</h3>
                   <p className="text-gray-700 dark:text-gray-400 leading-relaxed">Our Multimodal Vision AI natively ingests the physical layout of the target, standardizing the dosages, mapping active ingredients, and formatting severe safety warnings within seconds.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
