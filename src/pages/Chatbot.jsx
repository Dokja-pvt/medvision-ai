import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, MessageSquare, Menu, X, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generatePharmaResponse } from '../services/aiService';
import { fetchSessions, fetchSessionMessages, saveSession, updateSessionMessages, deleteSession } from '../services/chatService';
import toast from 'react-hot-toast';

export default function Chatbot({ user }) {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const initialGreeting = { role: 'model', text: "Hello! I am Medvision AI, your professional pharmacy assistant. How can I help you regarding your medicines, dosages, or interactions today?\n\n*Disclaimer: I am an AI, not a doctor. Consult a professional before taking any medication.*" };

  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user?.id) {
       loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    try {
      const data = await fetchSessions(user.id);
      setSessions(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load chat history');
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([initialGreeting]);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleSelectSession = async (sessionId) => {
    setCurrentSessionId(sessionId);
    if (window.innerWidth < 768) setSidebarOpen(false);
    try {
       const sessionMsgs = await fetchSessionMessages(sessionId);
       if (sessionMsgs) setMessages(sessionMsgs);
    } catch (err) {
       console.error(err);
       toast.error("Failed to load conversation");
    }
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    try {
       await deleteSession(sessionId);
       setSessions(prev => prev.filter(s => s.id !== sessionId));
       if (currentSessionId === sessionId) {
          handleNewChat();
       }
       toast.success("Chat securely erased.");
    } catch (err) {
       console.error(err);
       toast.error("Failed to delete chat record.");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    let activeSessionId = currentSessionId;
    
    try {
      if (!activeSessionId) {
         const title = userMessage.substring(0, 25) + (userMessage.length > 25 ? '...' : '');
         activeSessionId = await saveSession(user.id, title, newMessages);
         setCurrentSessionId(activeSessionId);
         setSessions(prev => [{ id: activeSessionId, title }, ...prev]);
      } else {
         await updateSessionMessages(activeSessionId, newMessages);
      }

      const responseText = await generatePharmaResponse(userMessage);
      const finalMessages = [...newMessages, { role: 'model', text: responseText }];
      
      setMessages(finalMessages);
      
      if (activeSessionId) {
         await updateSessionMessages(activeSessionId, finalMessages);
      }

    } catch (err) {
        console.error("Gemini Hook Error Details:", err);
        toast.error("Failed to connect to AI server. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] w-full pt-16 md:pt-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
           className="fixed inset-0 bg-black/50 z-40 md:hidden"
           onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* History Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-72 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-white/5 transition-transform duration-300 ease-in-out z-50 flex flex-col h-full rounded-r-2xl md:rounded-l-2xl md:rounded-r-none shadow-xl md:shadow-none`}>
         <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5">
            <button 
               onClick={handleNewChat}
               className="flex-1 flex items-center space-x-3 text-sm font-bold bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-all"
            >
              <Plus size={18} />
              <span>New Chat</span>
            </button>
            <button className="md:hidden ml-2 p-2 text-gray-500" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
         </div>
         <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {sessions.map(session => (
              <div key={session.id} className="relative group flex items-center w-full">
                 <button 
                   onClick={() => handleSelectSession(session.id)}
                   className={`flex-1 flex items-center space-x-3 text-left py-3 px-3 rounded-xl text-sm transition-all ${currentSessionId === session.id ? 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue pr-10' : 'text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800/50 pr-10'}`}
                 >
                   <MessageSquare size={16} className="flex-shrink-0" />
                   <span className="truncate">{session.title}</span>
                 </button>
                 <button 
                   onClick={(e) => handleDeleteSession(e, session.id)}
                   className="absolute right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                   aria-label="Delete chat"
                 >
                    <Trash2 size={16} />
                 </button>
              </div>
            ))}
            {sessions.length === 0 && (
                <div className="text-center mt-10 text-gray-400 text-xs px-4">
                  No active memory logs.
                </div>
            )}
         </div>
      </div>

      {/* Master Chat Window */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0B0F1A] md:rounded-r-2xl border-y border-r border-gray-100 dark:border-white/5 relative">
        
        {/* Header Block inline overlaying chat */}
        <div className="absolute top-0 w-full bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4 flex items-center z-10">
           <button className="md:hidden mr-4 p-2 -ml-2 text-gray-500" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
           </button>
           <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center">
             <Bot className="mr-2 text-brand-blue" size={26} />
             Medvision AI
           </h1>
        </div>

        {/* Scrollable Arrays */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-24 pb-20 space-y-8 scroll-smooth custom-scrollbar">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in zoom-in-95 duration-200`}>
                   {msg.role === 'model' && (
                     <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 self-end mb-2">
                         <Bot className="text-brand-blue" size={20} />
                     </div>
                   )}
                   <div className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-6 py-4 shadow-sm text-base md:text-lg ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-sm' : 'bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-sm'}`}>
                      {msg.role === 'user' ? (
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none text-current leading-relaxed">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                      )}
                   </div>
                   {msg.role === 'user' && (
                     <div className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center border border-gray-200 dark:border-slate-600 shadow-inner self-end mb-2">
                         <User className="text-gray-500 dark:text-gray-300" size={20} />
                     </div>
                   )}
                </div>
            ))}
            
            {loading && (
                <div className="flex w-full justify-start animate-in fade-in duration-300">
                  <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 self-end mb-2">
                         <Bot className="text-brand-blue" size={20} />
                  </div>
                  <div className="max-w-[75%] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl rounded-bl-sm px-6 py-5 flex items-center space-x-2">
                     <span className="w-2.5 h-2.5 rounded-full bg-brand-blue/40 animate-pulse"></span>
                     <span className="w-2.5 h-2.5 rounded-full bg-brand-blue/60 animate-pulse delay-75"></span>
                     <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse delay-150"></span>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
        </div>
        
        {/* Dynamic Input Frame */}
        <div className="absolute bottom-0 w-full p-4 md:p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-[#0B0F1A] dark:via-[#0B0F1A] flex-shrink-0">
            <form onSubmit={handleSend} className="relative group max-w-3xl mx-auto shadow-[0_5px_30px_rgb(0,0,0,0.05)] rounded-full">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Ask about interactions, dosages, or medical limits..." 
                  className="w-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600/50 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-gray-800 dark:text-white shadow-inner text-base md:text-lg" 
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-blue text-white p-3 md:p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:dark:bg-slate-700 active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-2 font-medium">Medvision AI can make mistakes. Consider verifying important information.</p>
        </div>
      </div>
    </div>
  )
}
