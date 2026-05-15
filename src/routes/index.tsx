import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Zap, Target, FileSearch, Brain, Wand2,
  Upload, Search, BarChart3, Rocket, CheckCircle2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AnimatedBackground, FloatingParticles } from "@/components/site/Background";
import { ResumeMockup } from "@/components/site/ResumeMockup";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Brain, title: "AI Resume Analysis", desc: "Deep semantic analysis of every section, scored against millions of hires." },
  { icon: Target, title: "ATS Optimization", desc: "Beat applicant tracking systems with keyword and formatting fixes that actually work." },
  { icon: Wand2, title: "Smart Rewrite", desc: "One-click rewrites of bullets and summaries tuned to your target role." },
  { icon: FileSearch, title: "Job Matching", desc: "Paste any JD — instantly see your match score and missing skills." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Track resume health, views and improvements over time." },
  { icon: Zap, title: "Lightning Fast", desc: "Get a full breakdown in under 8 seconds. No waiting, no fluff." },
];

const steps = [
  { icon: Upload, title: "Upload", desc: "Drop in your PDF or DOCX." },
  { icon: Search, title: "Analyze", desc: "Our AI scores every section." },
  { icon: Wand2, title: "Optimize", desc: "Apply AI suggestions in one click." },
  { icon: Rocket, title: "Apply", desc: "Send a resume that actually lands." },
];

const testimonials = [
  { name: "Maya Chen", role: "Software Engineer @ Stripe", quote: "Got 3 interviews in a week after running my resume through Resumind. The keyword analysis is unreal." },
  { name: "Daniel Park", role: "Product Manager", quote: "Finally something that explains what ATS actually wants. Polished, fast, and genuinely smart." },
  { name: "Aisha Ravi", role: "Data Scientist @ Meta", quote: "The rewrite suggestions read like they were written by a senior recruiter. Total game changer." },
];

const faqs = [
  { q: "How does the ATS scoring work?", a: "We replicate the parsing logic of major ATS systems (Greenhouse, Lever, Workday) and score formatting, keyword density, and section structure." },
  { q: "Is my data private?", a: "Yes. Resumes are encrypted at rest and never used to train models. You can delete everything in one click." },
  { q: "What file types are supported?", a: "PDF and DOCX. We preserve original formatting while extracting structured data." },
  { q: "Do you offer a free plan?", a: "Yes — 3 free analyses every month, forever. No credit card required." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />

      {/* HERO */}
      <section className="relative px-6 pt-40 pb-24">
        <FloatingParticles />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-muted-foreground">New • GPT-powered analysis 2.0</span>
            </div>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Build Resumes <br />
              That Get <span className="text-gradient animate-gradient-text bg-gradient-aurora bg-clip-text">Interviews</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              AI-powered ATS analysis, resume optimization, and job matching — all in one beautifully fast platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-white shadow-[0_0_30px_oklch(0.58_0.24_295/0.55)] hover:opacity-90">
                <Link to="/upload">Analyze Resume <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5">
                <Link to="/dashboard">Live Demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[295, 210, 340, 90].map((h, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background" style={{ background: `oklch(0.6 0.2 ${h})` }} />
                ))}
              </div>
              <span><b className="text-foreground">12,400+</b> resumes optimized this week</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <ResumeMockup />
          </motion.div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-border/40 bg-card/20 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm uppercase tracking-widest text-muted-foreground">
          {["Stripe", "Linear", "Vercel", "Notion", "Framer", "Figma"].map((c) => (
            <span key={c} className="opacity-70">{c}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Features" title="Everything you need to land the interview" desc="A complete AI toolkit built for modern job seekers." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass group relative overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-[0_0_25px_oklch(0.58_0.24_295/0.45)]">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Workflow" title="From upload to offer in 4 steps" desc="A magical, end-to-end resume pipeline." />
          <div className="relative mt-14">
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass relative rounded-2xl p-6 text-center"
                >
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary glow-purple">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</div>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CARDS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {/* ATS demo */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-accent">ATS Score</div>
            <h3 className="mt-2 text-2xl font-semibold">Your resume is performing</h3>
            <div className="mt-6 flex items-center gap-6">
              <ScoreRing value={87} />
              <div className="space-y-2 text-sm">
                {[
                  { label: "Format", val: 95 },
                  { label: "Keywords", val: 82 },
                  { label: "Structure", val: 91 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-20 text-muted-foreground">{row.label}</span>
                    <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-gradient-primary" style={{ width: `${row.val}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{row.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Match demo */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-accent">Job Match</div>
            <h3 className="mt-2 text-2xl font-semibold">Senior Frontend Engineer</h3>
            <div className="mt-4 text-sm text-muted-foreground">Match score</div>
            <div className="mt-1 text-5xl font-bold text-gradient">94%</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "GraphQL", "Tailwind", "Testing"].map((t, i) => (
                <span key={t} className={`rounded-full border px-3 py-1 text-xs ${i % 4 === 3 ? "border-destructive/40 text-destructive" : "border-accent/40 text-accent"}`}>
                  {i % 4 === 3 ? "+ " : "✓ "}{t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Loved by" title="Trusted by ambitious professionals" desc="" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-primary" />
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHead eyebrow="FAQ" title="Questions, answered" desc="" />
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="glass mb-3 rounded-2xl border-0 px-5">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="glass relative overflow-hidden rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-aurora opacity-20" />
            <div className="relative">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Land your next interview.</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Free forever for the first 3 analyses. No card required.</p>
              <Button asChild size="lg" className="mt-7 bg-gradient-primary text-white glow-purple">
                <Link to="/signup">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs uppercase tracking-widest text-accent">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-28 w-28">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="50" cy="50" r={r} stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.24 295)" />
            <stop offset="100%" stopColor="oklch(0.72 0.16 210)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div>
          <div className="text-3xl font-bold text-gradient">{value}</div>
          <div className="-mt-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">score</div>
        </div>
      </div>
    </div>
  );
}
