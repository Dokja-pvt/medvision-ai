import { useState, useRef } from 'react';
import { LogOut, User as UserIcon, Moon, Sun, Camera, Save, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Settings({ user }) {
  const { theme, toggleTheme } = useTheme();
  
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    let finalAvatarUrl = user?.user_metadata?.avatar_url || '';

    try {
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalAvatarUrl = data.publicUrl;
      }

      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: finalAvatarUrl }
      });

      if (error) throw error;
      
      toast.success("Profile Updated Successfully!");
      setAvatarFile(null); // Reset file buffer
      
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile. Make sure the 'avatars' bucket is public.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-300">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Account Settings</h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">Manage your profile, notifications, and privacy preferences.</p>
      
      {/* Profile Information Block */}
      <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-none p-6 md:p-10 mb-8">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <UserIcon className="mr-3 text-brand-blue" />
            Profile Information
         </h2>

         <div className="space-y-6 bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/5 p-6 md:p-8 rounded-2xl relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              {/* Avatar Uploader UI */}
              <div 
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#161B22] shadow-md group cursor-pointer flex-shrink-0 bg-gray-100 dark:bg-slate-800"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-brand-blue/50">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={28} />
                </div>
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Display Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name" 
                  className="w-full text-lg font-medium text-gray-900 dark:text-white bg-white dark:bg-[#0B0F1A] border border-gray-200 dark:border-white/10 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                <div className="text-base font-medium text-gray-900 dark:text-white bg-white dark:bg-[#0B0F1A] border border-gray-200 dark:border-white/10 px-4 py-3.5 rounded-xl shadow-sm opacity-70 cursor-not-allowed">
                  {user?.email || 'N/A'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Account ID</label>
                <div className="text-sm font-mono bg-white dark:bg-[#0B0F1A] border border-gray-200 dark:border-white/10 px-4 py-3.5 rounded-xl text-gray-600 dark:text-gray-400 shadow-sm overflow-x-auto w-full opacity-70 cursor-not-allowed cursor-default">
                  {user?.id || 'N/A'}
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex justify-end">
               <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-brand-blue hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30 transition-all duration-300 active:scale-95"
               >
                  {loading ? <Loader2 size={20} className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
                  <span>Save Changes</span>
               </button>
            </div>
         </div>
      </div>

      {/* Theme Preferences */}
      <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-none p-6 md:p-10 mb-8">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <Moon className="mr-3 text-brand-blue" />
            Theme Preferences
         </h2>
         <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/5 p-6 rounded-2xl">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle Lumina dark mode interface natively.</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center p-3 px-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0F1A] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm w-full md:w-auto"
            >
              {theme === 'dark' ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
              <span className="font-bold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
         </div>
      </div>
      
      {/* Action Settings / Sign Out */}
      <div className="bg-white dark:bg-[#161B22] border border-gray-100 dark:border-white/10 rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-none p-6 md:p-10 flex border-t-4 border-t-red-500">
         <button 
             onClick={() => supabase.auth.signOut()} 
             className="flex items-center justify-center space-x-2 text-red-500 hover:text-white font-bold border border-red-200 dark:border-red-500/30 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 w-full p-4 rounded-xl transition-all duration-300"
             aria-label="Logout user"
         >
             <LogOut size={20} />
             <span>Sign Out of Medvision</span>
         </button>
      </div>

    </div>
  )
}
