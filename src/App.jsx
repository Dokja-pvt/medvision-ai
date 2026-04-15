import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Chatbot from './pages/Chatbot';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Help from './pages/Help';
import About from './pages/About';
import Features from './pages/Features';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route Component
const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Page Transition Wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
    className="w-full flex-grow flex flex-col"
  >
    {children}
  </motion.div>
);

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-lg font-medium text-brand-blue">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans relative overflow-x-hidden w-full transition-all duration-300">
      {/* Overlay for Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[105] transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)} 
      />
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={session?.user} />
      
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={session?.user} />
      
      <div className="flex-1 flex flex-col w-full relative pt-24 z-[1]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
            
            <Route path="/scan" element={
              <ProtectedRoute session={session}>
                <PageTransition><Scan /></PageTransition>
              </ProtectedRoute>
            } />
            
            <Route path="/chatbot" element={
              <ProtectedRoute session={session}>
                <PageTransition><Chatbot user={session?.user} /></PageTransition>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute session={session}>
                <PageTransition><Settings user={session?.user} /></PageTransition>
              </ProtectedRoute>
            } />
            
            <Route path="/help" element={<PageTransition><Help /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
      <footer className="w-full py-6 text-center text-[11px] text-slate-500/50 dark:text-slate-400/30 font-light tracking-widest uppercase print:hidden z-10 relative pointer-events-none">
         Created by Dokja
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
         <Toaster position="top-center" toastOptions={{ duration: 4000, style: { borderRadius: '12px', padding: '16px', color: '#1f2937', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' } }} />
         <AppContent />
      </ThemeProvider>
    </Router>
  )
}

export default App;
