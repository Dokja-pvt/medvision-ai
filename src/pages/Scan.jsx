import { useState, useRef, useEffect } from 'react';
import { Camera, ScanText, Bot, AlertCircle, Upload, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { analyzeMedicationImage } from '../services/aiService';

export default function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [hasCamera, setHasCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // Scanned Results
  const [aiReport, setAiReport] = useState("");
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setHasCamera(true);
      setError("");
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera. Please check browser permissions.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onloadend = () => {
          const dataUrl = reader.result;
          resolve(dataUrl.split(',')[1]);
       };
       reader.onerror = reject;
       reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setHasCamera(false);
    }
    
    setAnalyzing(true);
    setAiReport("");
    setError("");

    try {
      const base64Image = await readFileAsBase64(file);
      const mimeType = file.type || 'image/jpeg';
      
      const report = await analyzeMedicationImage(base64Image, mimeType);
      setAiReport(report);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process uploaded image. Please ensure the API is connected.");
    } finally {
      setAnalyzing(false);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setAiReport("");
    setError("");
    startCamera();
  };

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setAnalyzing(true);
    setAiReport("");
    setError("");

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Grab natively from hardware viewport
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64Image = dataUrl.split(',')[1];
      
      // Plumb it straight through Gemini Vision
      const report = await analyzeMedicationImage(base64Image, 'image/jpeg');
      setAiReport(report);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process image capture.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300 pt-24 font-sans">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Smart Scanner</h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg">Position your prescription or medication label in the camera view and click capture.</p>
      
      {error && (
        <div className="mt-6 flex items-center bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl font-bold border border-red-100 dark:border-red-500/30">
          <AlertCircle size={20} className="mr-3" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mt-8 print:block print:w-full print:m-0">
        
        {/* Left Side: Camera ViewPort */}
        <div className="bg-[var(--card-bg)] dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group flex flex-col p-4 w-full h-[60vh] lg:h-[70vh] print:hidden">
          
          <div className="relative w-full flex-grow bg-black rounded-3xl overflow-hidden flex flex-col justify-center shadow-inner">
            {uploadedImage ? (
              <div className="relative w-full h-full">
                <img src={uploadedImage} alt="Uploaded Label" className="w-full h-full object-cover" />
                <button 
                  onClick={clearUploadedImage} 
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-50 transition-colors cursor-pointer active:scale-95 pointer-events-auto"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: hasCamera && !analyzing ? 1 : 0.5 }}
              />
            )}
            
            <div className="absolute inset-0 border-4 border-dashed border-white/30 m-8 rounded-xl pointer-events-none"></div>

            {analyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10 text-white p-6 rounded-3xl">
                <ScanText size={48} className="animate-bounce text-brand-blue mb-4" />
                <h3 className="text-xl tracking-tight font-extrabold">AI is processing image...</h3>
                <p className="text-sm font-medium mt-2 text-gray-300 opacity-80 max-w-sm text-center">Identifying critical chemical components strictly within secure medical bounds.</p>
              </div>
            )}
            
            {!hasCamera && !error && !uploadedImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Camera size={48} className="animate-pulse mb-3" />
                <p>Initializing Secure Camera Stream...</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 w-full mt-4">
            <button 
              onClick={captureAndScan}
              disabled={(!hasCamera && !uploadedImage) || analyzing}
              className="bg-brand-blue hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-bold py-4 md:py-5 rounded-2xl w-1/2 flex items-center justify-center shadow-[0_8px_20px_rgba(0,163,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,163,255,0.4)] transition-all duration-300 active:scale-[0.98] cursor-pointer relative z-40 text-sm md:text-lg uppercase tracking-wide"
            >
              <Camera size={24} className="mr-2 md:mr-3" />
              Capture
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={analyzing}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-bold py-4 md:py-5 rounded-2xl w-1/2 flex items-center justify-center shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer relative z-40 text-sm md:text-lg uppercase tracking-wide"
            >
              <Upload size={24} className="mr-2 md:mr-3" />
              Upload
            </button>
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        </div>

        {/* Right Side: Data UI Card Render */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[var(--card-bg)] dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-10 flex-1 relative overflow-hidden group border-t-4 border-t-brand-blue print:border-none print:shadow-none print:w-full print:bg-white print:p-0">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10 transition-colors print:hidden"></div>
             
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center tracking-tight print:text-black">
               <Bot size={28} className="mr-3 text-brand-blue print:hidden" />
               AI Extraction Report
             </h2>

             {analyzing || aiReport ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in h-full flex flex-col">
                  
                  {aiReport ? (
                    <div className="bg-white dark:bg-[#0B0F1A] flex-1 border border-brand-blue/20 dark:border-blue-500/20 p-6 md:p-8 rounded-2xl shadow-sm text-gray-800 dark:text-gray-200 overflow-y-auto w-full custom-scrollbar print:border-none print:shadow-none print:p-0 print:text-black">
                      <div className="prose dark:prose-invert prose-blue max-w-none text-base md:text-lg leading-loose marker:text-brand-blue prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-brand-blue prose-a:text-brand-blue prose-p:mb-5 print:text-black">
                         <ReactMarkdown>{aiReport}</ReactMarkdown>
                      </div>
                      <button 
                        onClick={() => window.print()}
                        className="mt-6 bg-brand-blue/10 hover:bg-brand-blue/20 dark:bg-brand-blue/20 dark:hover:bg-brand-blue/30 text-brand-blue font-bold py-3 px-6 rounded-xl w-full flex items-center justify-center transition-colors print:hidden"
                      >
                         Download / Print Report
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 text-brand-blue font-bold px-4 pt-10">
                       <span className="w-3 h-3 rounded-full bg-brand-blue animate-ping"></span>
                       <span className="text-lg tracking-tight">Generative Vision is synthesizing response...</span>
                    </div>
                  )}

                </div>
             ) : (
                <div className="h-full min-h-[30vh] flex flex-col items-center justify-center text-center opacity-60">
                   <ScanText size={50} className="text-gray-300 dark:text-slate-600 mb-4" />
                   <p className="text-gray-500 dark:text-gray-400 font-medium">Scan an authentic medical label or prescription using the camera module to dynamically populate intelligence grids.</p>
                </div>
             )}
          </div>
        </div>

      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  )
}
