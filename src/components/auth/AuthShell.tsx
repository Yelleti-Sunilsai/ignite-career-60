import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/site/Background";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatedBackground />
      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Side panel */}
        <div className="relative hidden flex-col justify-between p-10 lg:flex">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary"><Sparkles className="h-4 w-4 text-white" /></div>
            <span className="text-lg font-semibold">Resumind</span>
          </Link>
          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass relative max-w-md rounded-3xl p-6">
              <div className="text-xs uppercase tracking-widest text-accent">Live preview</div>
              <div className="mt-4 text-3xl font-bold">"Got 3 interviews in a week."</div>
              <p className="mt-3 text-sm text-muted-foreground">— Maya, Software Engineer @ Stripe</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[92, 88, 95].map((v, i) => (
                  <div key={i} className="rounded-xl bg-white/5 p-3 text-center">
                    <div className="text-xl font-bold text-gradient">{v}</div>
                    <div className="text-[10px] text-muted-foreground">{["ATS", "Match", "Health"][i]}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground">© Resumind. AI for your career.</p>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
            <div className="absolute -inset-px rounded-3xl bg-gradient-aurora opacity-40 blur" />
            <div className="glass relative rounded-3xl p-8">
              <Link to="/" className="mb-6 flex items-center gap-2 lg:hidden">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary"><Sparkles className="h-4 w-4 text-white" /></div>
                <span className="font-semibold">Resumind</span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              <div className="mt-6">{children}</div>
              {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}