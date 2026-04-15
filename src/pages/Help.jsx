export default function Help() {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-6 duration-300">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Help & Support</h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">Frequently asked questions and guides for Medvision AI.</p>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
           <h2 className="text-xl font-bold text-brand-blue mb-4">How to use the Smart Scanner</h2>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Simply navigate to the Scanner module and grant permissions to your device camera. Position your prescription bottle or medical label so the text is clearly visible, and click "Capture".
           </p>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you don't have a camera, use the "Upload" button to parse an existing photo organically. Wait a few seconds for the Gemini Multimodal Vision array to synthesize a markdown extraction block!
           </p>
        </div>

        <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
           <h2 className="text-xl font-bold text-brand-blue mb-4">How the AI Works</h2>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Medvision AI uses Google's latest `gemini-2.5-flash` endpoint securely wired directly into your local buffers. Every image captured is securely passed natively avoiding 3rd party OCR scraping.
           </p>
        </div>

        <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
           <h2 className="text-xl font-bold text-brand-blue mb-4">Contact Support</h2>
           <div className="mt-4 flex flex-col space-y-3 text-gray-700 dark:text-slate-300 border-l-4 border-brand-blue pl-4">
              <p>If you need assistance, find a bug, or want to discuss the tech stack behind Medvision AI, feel free to reach out:</p>
              
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white">Email:</span>
                <a href="mailto:mabbpl1@gmail.com" className="text-brand-blue hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors">
                  mabbpl1@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/furqan-mohammad/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors">
                  linkedin.com/in/furqan-mohammad
                </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
