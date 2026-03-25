import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit, Target, Code2, Users, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-200 h-150 bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center box-glow">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-white">PrepAI</span>
        </div>
        <button onClick={() => navigate("/login")}
          className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center gap-2"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero */}
      <main className="grow flex flex-col items-center justify-center text-center px-6 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">The ultimate AI interview companion</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6"
        >
          Land Your Dream Job With <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary text-glow animate-pulse">
            AI-Powered
          </span> Prep
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          Paste your resume and the target job description. Our AI analyzes your fit, identifies skill gaps, and generates personalized technical and behavioral questions.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={() => navigate('/login')}
          className="group relative px-8 py-4 bg-primary text-white font-bold rounded-2xl text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 box-glow"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center gap-2">
            Start Free Analysis <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
        </motion.button>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24"
        >
          {[
            { icon: Target, title: "Skill Gap Detection", desc: "Instantly see what you're missing compared to the JD." },
            { icon: Code2, title: "Technical Questions", desc: "Practice with custom coding and architecture questions." },
            { icon: Users, title: "Behavioral Scenarios", desc: "Prepare for cultural fit and leadership interviews." }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl text-left hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}