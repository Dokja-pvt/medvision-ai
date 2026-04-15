import { useState, useEffect } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onMenuToggle, user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
        else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center py-4 px-6 md:px-12 w-full backdrop-blur-md bg-white/70 dark:bg-[#161B22]/80 border-b border-gray-100 dark:border-white/5 transition-all duration-300 pointer-events-auto print:hidden ${isScrolled ? 'shadow-sm dark:shadow-gray-900/50' : ''}`}>
      <div className="flex items-center space-x-4 relative z-[60]">
        <button 
          onClick={onMenuToggle}
          className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-colors p-1 pointer-events-auto"
        >
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link to="/" onClick={(e) => handleNavClick(e, 'top')} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded" />
          <span className="text-brand-blue dark:text-white font-extrabold text-2xl tracking-tighter">MEDVISION.ai</span>
        </Link>
      </div>

      {/* Links */}
      <div className="hidden lg:flex items-center space-x-10 text-gray-600 dark:text-gray-300 font-medium absolute left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
        <a href="/" onClick={(e) => handleNavClick(e, 'top')} className="hover:text-brand-blue dark:hover:text-brand-blue cursor-pointer transition-colors">Home</a>
        <Link to="/about" className="hover:text-brand-blue dark:hover:text-brand-blue cursor-pointer transition-colors">About</Link>
        <Link to="/features" className="hover:text-brand-blue dark:hover:text-brand-blue cursor-pointer transition-colors">Features</Link>
        <Link to="/help" className="hover:text-brand-blue dark:hover:text-brand-blue cursor-pointer transition-colors">Help</Link>
      </div>

      {/* Buttons / User Menu */}
      <div className="flex items-center space-x-4 relative z-[60] pointer-events-auto">
        {/* Dark Mode Toggle */}
        <button 
           onClick={toggleTheme}
           className="p-2 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors relative z-[60] text-gray-600 dark:text-gray-300"
        >
           <motion.div
             initial={false}
             animate={{ rotate: theme === 'dark' ? 180 : 0 }}
             transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
             className="flex items-center justify-center transform"
           >
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
           </motion.div>
        </button>

        {user ? (
          <Link to="/settings" className="flex items-center space-x-3 cursor-pointer group">
            <span className="hidden sm:block text-gray-700 dark:text-gray-200 font-bold group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </span>
            <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0 shadow-sm border-2 border-transparent group-hover:border-brand-blue transition-colors">
              <img 
                src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=00A3FF&color=fff&bold=true`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 font-medium hover:text-gray-900 transition-colors hidden sm:block cursor-pointer">
              Log In
            </Link>
            <Link to="/signup" className="bg-brand-blue text-white px-6 py-2.5 font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/30 active:translate-y-0 active:shadow-md transition-all duration-200 rounded-[12px] cursor-pointer inline-block">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
