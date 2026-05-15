import { motion } from "framer-motion";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

export function ResumeMockup() {
  return (
    <div className="relative h-[420px] w-full">
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-aurora opacity-30 blur-3xl" />

      {/* Main resume card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="glass absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <FileText className="h-4 w-4 text-accent" />
          <span className="text-xs font-medium">resume_v3.pdf</span>
          <span className="ml-auto text-[10px] text-muted-foreground">analyzing…</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-2/3 rounded bg-white/20" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-5/6 rounded bg-white/10" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-2 w-1/2 rounded bg-white/20" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-4/5 rounded bg-white/10" />
        </div>
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-12 rounded bg-gradient-to-b from-accent/40 to-transparent"
          initial={{ top: 0 }}
          animate={{ top: ["0%", "85%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating ATS card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -left-2 top-6 w-[180px] rounded-2xl p-4 shadow-xl"
      >
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ATS Score</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gradient">92</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.4, delay: 0.3 }} className="h-full bg-gradient-primary" />
        </div>
      </motion.div>

      {/* Floating skill match */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="glass absolute -right-2 bottom-8 w-[200px] rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="font-medium">Skill match improved</span>
        </div>
        <div className="mt-3 space-y-2">
          {["React", "TypeScript", "Node.js"].map((s) => (
            <div key={s} className="flex items-center gap-2 text-[11px]">
              <CheckCircle2 className="h-3 w-3 text-accent" />
              <span>{s}</span>
              <span className="ml-auto text-muted-foreground">+12%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}