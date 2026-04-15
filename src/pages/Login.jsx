import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Successfully logged in!');
      navigate('/');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 w-full animate-in fade-in zoom-in-95 duration-300 relative z-10">
      <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-md w-full border border-gray-100 relative">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Log in to manage your prescriptions.</p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {errorMsg}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-slate-900 placeholder:text-slate-500"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-slate-900 placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-blue text-white font-bold tracking-wide text-lg py-3.5 rounded-[12px] shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-300 flex justify-center items-center mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={22} />
                Authenticating...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          Don't have an account? <Link to="/signup" className="text-brand-blue font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
