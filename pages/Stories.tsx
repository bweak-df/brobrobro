import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, X } from 'lucide-react';
import { Story } from '../types';
import { INITIAL_STORIES } from '../data/stories';
import Footer from '../components/Footer';

const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStory]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-sm">Return to Base</span>
          </Link>
          <div className="heading-font text-xl font-bold tracking-wider text-slate-200">
            LIBRARY
          </div>
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full px-6 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-8"
          >
            {INITIAL_STORIES.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer glass-panel p-8 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                 </div>
                 
                 <div className="flex items-center gap-3 mb-4 text-xs tracking-widest text-slate-500 uppercase">
                    <span className={`px-2 py-1 rounded border ${story.type === 'poem' ? 'border-purple-500/20 text-purple-300' : 'border-cyan-500/20 text-cyan-300'}`}>
                      {story.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {story.date}
                    </span>
                 </div>

                 <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 group-hover:text-cyan-100 transition-colors heading-font">
                   {story.title}
                 </h2>

                 <p className="text-slate-400 font-light leading-relaxed line-clamp-3 md:line-clamp-2 story-font text-lg">
                   {story.excerpt}
                 </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl h-full max-h-[90vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/5 flex items-start justify-between bg-slate-900/50">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 heading-font text-glow">
                     {selectedStory.title}
                   </h2>
                   <div className="flex items-center gap-4 text-slate-500 text-sm tracking-wider">
                     <span>{selectedStory.date}</span>
                     <span>•</span>
                     <span className="uppercase">{selectedStory.type}</span>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-grow overflow-y-auto p-6 md:p-12 custom-scrollbar">
                <div 
                  className="prose prose-invert prose-lg max-w-none story-font text-slate-300 leading-loose prose-p:mb-6 prose-headings:font-serif prose-headings:text-slate-100"
                  dangerouslySetInnerHTML={{ __html: selectedStory.content }}
                />
                
                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-500/50 mb-4" />
                  <p className="text-slate-600 italic">End of transmission</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stories;