import { Home, ScanLine, Bot, Settings, HelpCircle, LogOut, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import logo from '../assets/logo.jpeg';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose, user }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="fixed inset-y-0 left-0 z-[110] w-80 bg-white dark:bg-[#0B0F1A] shadow-2xl shadow-gray-900/20 dark:shadow-black border-r border-gray-100 dark:border-white/5 flex flex-col transition-colors duration-300 print:hidden"
        >
        {/* User Profile */}
        <div className={`flex items-center justify-between p-6 mt-4 ${!user ? 'pt-8' : 'mb-2'}`}>
           {user ? (
             <Link to="/settings" onClick={onClose} className="flex items-center space-x-4 cursor-pointer group w-full overflow-hidden">
                 <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-200 dark:border-white/10 group-hover:border-brand-blue transition-colors">
                   <img 
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=00A3FF&color=fff&bold=true`} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                   />
                </div>
                <div className="flex-1 min-w-0 pr-2 flex items-center">
                   <p className="font-extrabold text-gray-900 dark:text-white text-lg leading-tight truncate group-hover:text-brand-blue transition-colors">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                </div>
             </Link>
           ) : (
             <div className="flex-1">
               <p className="font-extrabold text-gray-900 dark:text-white text-2xl tracking-tighter">Welcome Guest</p>
               <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">Sign in to sync your scans.</p>
             </div>
           )}
           <button onClick={onClose} className="p-2 -mr-2 flex-shrink-0 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
             <X size={22} />
           </button>
        </div>
        
        {/* Main Links */}
        <div className="flex-1 py-4 px-4 space-y-1">
            <NavLink to="/" onClick={onClose} className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 w-full rounded-2xl transition-all duration-200 font-bold ${isActive ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-brand-blue/5 dark:hover:bg-white/5 hover:text-brand-blue dark:hover:text-white'}`}>
                <Home size={24} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/scan" onClick={onClose} className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 w-full rounded-2xl transition-all duration-200 font-bold ${isActive ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-brand-blue/5 dark:hover:bg-white/5 hover:text-brand-blue dark:hover:text-white'}`}>
                <ScanLine size={24} />
                <span>Smart Scanner</span>
            </NavLink>
            <NavLink to="/chatbot" onClick={onClose} className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 w-full rounded-2xl transition-all duration-200 font-bold ${isActive ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-brand-blue/5 dark:hover:bg-white/5 hover:text-brand-blue dark:hover:text-white'}`}>
                <Bot size={24} />
                <span>Pharma Bot</span>
            </NavLink>
            <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 w-full rounded-2xl transition-all duration-200 font-bold ${isActive ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-brand-blue/5 dark:hover:bg-white/5 hover:text-brand-blue dark:hover:text-white'}`}>
                <Settings size={24} />
                <span>Account Settings</span>
            </NavLink>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-white/5 space-y-2 mb-2">
            <Link to="/help" onClick={onClose} className="flex items-center space-x-4 px-5 py-3 w-full rounded-xl transition-colors text-gray-500 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white">
                <HelpCircle size={22} />
                <span>Help & Support</span>
            </Link>
            
            {!user ? (
              <div className="pt-2 flex gap-3">
                <Link to="/login" onClick={onClose} className="flex-1 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white font-bold py-3 text-center rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                  Log In
                </Link>
                <Link to="/signup" onClick={onClose} className="flex-1 bg-brand-blue text-white font-bold py-3 text-center rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-brand-blue/20 bg-gradient-to-r from-brand-blue to-blue-500">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button onClick={() => { supabase.auth.signOut(); onClose(); }} className="flex items-center space-x-4 px-5 py-3 w-full rounded-xl transition-colors text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 mt-2">
                  <LogOut size={22} />
                  <span>Logout Account</span>
              </button>
            )}
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
