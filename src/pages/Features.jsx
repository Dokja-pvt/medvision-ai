import { ScanLine, Bot, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Smart Clinical Scanner",
      description: "Harness Google Gemini Multimodal Vision to natively scan any complex pill bottle or handwritten prescription document instantly translating chemical structures.",
      icon: <ScanLine className="text-brand-blue" size={32} />
    },
    {
      title: "Persistent Pharma AI",
      description: "Ask open-ended followups leveraging your active chat history mapped explicitly against a professional pharmacy systems logic interface natively.",
      icon: <Bot className="text-brand-blue" size={32} />
    },
    {
      title: "Secure Edge Memory",
      description: "Your session buffers are isolated! Supabase provides stateless authentication tying your explicit active memory directly into protected Postgres clusters.",
      icon: <ShieldCheck className="text-brand-blue" size={32} />
    },
    {
      title: "Lightning Core Transitions",
      description: "Constructed natively using React + Vite bypassing standard middleware routing delivering instant intelligence perfectly formatted over dynamic Markdown bindings.",
      icon: <Zap className="text-brand-blue" size={32} />
    }
  ];

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-6 duration-500 mt-2">
      <div className="text-center mb-16">
         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">System Capabilities</h1>
         <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">Explore the raw technical architecture fueling Medvision AI's clinical ecosystem natively mapped directly on your device.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
         {features.map((feat, idx) => (
             <div key={idx} className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-2 group cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                   {feat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{feat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">{feat.description}</p>
             </div>
         ))}
      </div>
    </div>
  );
}
