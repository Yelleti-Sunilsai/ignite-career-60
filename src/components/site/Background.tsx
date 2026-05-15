import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.58 0.24 295 / 0.5), transparent 70%)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.16 210 / 0.45), transparent 70%)" }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.26 340 / 0.35), transparent 70%)" }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function FloatingParticles({ count = 18 }: { count?: number }) {
  const particles = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const dur = 8 + (i % 6);
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/60"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          />
        );
      })}
    </div>
  );
}