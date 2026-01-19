import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Lock, Save, Terminal } from 'lucide-react';
import { Story, AdminState } from '../types';

const Admin: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [state, setState] = useState<AdminState>({
    isAuthenticated: false,
    draftTitle: '',
    draftDate: new Date().toISOString().split('T')[0],
    draftContent: '',
    draftType: 'story',
    draftExcerpt: ''
  });
  const [jsonOutput, setJsonOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // This is NOT secure. It is a client-side gate only.
  // The goal is just to hide the tool from casual visitors.
  const checkKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey.toLowerCase() === 'cosmos') {
      setState(prev => ({ ...prev, isAuthenticated: true }));
    } else {
      alert('Access Denied. Invalid Frequency.');
    }
  };

  const generateJson = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      title: state.draftTitle,
      date: state.draftDate,
      type: state.draftType,
      excerpt: state.draftExcerpt,
      content: state.draftContent
    };

    const jsonString = JSON.stringify(newStory, null, 2) + ',';
    setJsonOutput(jsonString);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative">
        <Link to="/" className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel p-8 rounded-xl border border-white/10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/5 rounded-full border border-white/5">
               <Lock className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 heading-font">Secure Channel</h2>
          <form onSubmit={checkKey} className="space-y-4">
            <div>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter Access Key..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-[0_0_20px_rgba(8,145,178,0.3)]"
            >
              Authenticate
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Hint: The key is "cosmos"
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-y-auto">
      <Link to="/" className="fixed top-6 left-6 z-50 text-slate-500 hover:text-white transition-colors p-2 bg-slate-900/80 rounded-full backdrop-blur">
          <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Editor Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-xl border border-white/10 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold heading-font">Content Generator</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs uppercase text-slate-500 mb-1">Type</label>
                 <select 
                   value={state.draftType}
                   onChange={(e) => setState({...state, draftType: e.target.value as 'story' | 'poem'})}
                   className="w-full bg-slate-900/50 border border-white/10 rounded p-2 text-slate-200 focus:border-cyan-500 outline-none"
                 >
                   <option value="story">Story</option>
                   <option value="poem">Poem</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs uppercase text-slate-500 mb-1">Date</label>
                 <input 
                   type="date"
                   value={state.draftDate}
                   onChange={(e) => setState({...state, draftDate: e.target.value})}
                   className="w-full bg-slate-900/50 border border-white/10 rounded p-2 text-slate-200 focus:border-cyan-500 outline-none"
                 />
               </div>
            </div>

            <div>
               <label className="block text-xs uppercase text-slate-500 mb-1">Title</label>
               <input 
                 type="text"
                 value={state.draftTitle}
                 onChange={(e) => setState({...state, draftTitle: e.target.value})}
                 className="w-full bg-slate-900/50 border border-white/10 rounded p-2 text-slate-200 focus:border-cyan-500 outline-none heading-font font-bold text-lg"
                 placeholder="Enter title..."
               />
            </div>

            <div>
               <label className="block text-xs uppercase text-slate-500 mb-1">Excerpt (Short description)</label>
               <textarea 
                 value={state.draftExcerpt}
                 onChange={(e) => setState({...state, draftExcerpt: e.target.value})}
                 className="w-full bg-slate-900/50 border border-white/10 rounded p-2 text-slate-200 focus:border-cyan-500 outline-none h-24 resize-none"
                 placeholder="A brief hook..."
               />
            </div>

            <div>
               <label className="block text-xs uppercase text-slate-500 mb-1">Content (HTML allowed)</label>
               <textarea 
                 value={state.draftContent}
                 onChange={(e) => setState({...state, draftContent: e.target.value})}
                 className="w-full bg-slate-900/50 border border-white/10 rounded p-2 text-slate-200 focus:border-cyan-500 outline-none h-64 font-mono text-sm"
                 placeholder="<p>Write your story here...</p>"
               />
            </div>

            <button 
              onClick={generateJson}
              className="w-full flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors font-bold"
            >
              <Save className="w-4 h-4" />
              Generate JSON Object
            </button>
          </div>
        </motion.div>

        {/* Output Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-xl border border-white/10 flex flex-col h-full"
        >
          <div className="mb-4">
             <h2 className="text-xl font-bold heading-font mb-2">Output</h2>
             <p className="text-sm text-slate-400">
               Since this is a static site, you cannot publish directly to the server. 
               Copy the object below and append it to the `INITIAL_STORIES` array in `data/stories.ts`, then commit to GitHub.
             </p>
          </div>

          <div className="flex-grow bg-black/50 rounded-lg border border-white/10 p-4 relative overflow-hidden group">
            <pre className="text-green-400 font-mono text-xs md:text-sm whitespace-pre-wrap break-all h-full overflow-y-auto">
              {jsonOutput || '// Generated JSON will appear here...'}
            </pre>
            
            {jsonOutput && (
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-white/10 transition-colors"
                title="Copy to Clipboard"
              >
                {copySuccess ? <span className="text-xs font-bold text-green-400">Copied!</span> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;