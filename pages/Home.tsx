import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 flex flex-col items-center max-w-4xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
             <Star className="w-3 h-3 text-cyan-300" fill="currentColor" />
             <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Est. 2024</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-50 to-slate-400 pb-4 text-glow mb-6 heading-font">
            ASTRAL ARCHIVES
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl leading-relaxed font-light mb-12">
            A digital sanctuary for stories born from the void. 
            Drift through tales of distant stars and quiet emotions.
          </p>

          <Link to="/stories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-lg backdrop-blur-sm transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="flex items-center gap-3">
                <span className="text-lg tracking-widest uppercase text-slate-200">Enter The Archive</span>
                <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="w-full py-24 md:py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-100 heading-font">The Signal</h2>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed story-font">
              <p>
                In the vast expanse of the internet, silence is a luxury. This space is designed to be a quiet corner of the cosmos, where words can breathe without the suffocation of algorithms.
              </p>
              <p>
                Here, I collect fragments of imagination—short stories of future history, poetry of present longing, and observations from the edge of the known.
              </p>
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden text-right"
          >
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-100 heading-font">The Transmission</h2>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed story-font flex flex-col items-end">
              <p className="max-w-2xl">
                We are all transmitting signals into the dark, hoping something, or someone, receives them. These stories are my signals. 
              </p>
              <p className="max-w-2xl">
                There are no comments here. No likes. Just the connection between the writer's mind and the reader's imagination.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;