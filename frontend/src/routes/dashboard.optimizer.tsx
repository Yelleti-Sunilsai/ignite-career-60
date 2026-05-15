import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Target,
  Award,
  CheckCircle2,
  Copy,
  Download,
  ArrowRight,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Layout,
  FileText,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { optimizeResume, OptimizedResumeData, updateRecentResume } from "@/services/resume.service";

export const Route = createFileRoute("/dashboard/optimizer")({
  component: OptimizerPage,
});

function OptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OptimizedResumeData | null>(null);
  const [resumeInfo, setResumeInfo] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("resumeAnalysis");
    if (saved) {
      const parsed = JSON.parse(saved);
      setResumeInfo(parsed);
      if (parsed.file && parsed.path) {
        updateRecentResume(parsed.file, parsed.path).catch(console.error);
      }
    }
    
    const savedOptimized = localStorage.getItem("optimizedResume");
    if (savedOptimized) {
      setData(JSON.parse(savedOptimized));
    }
  }, []);

  const handleOptimize = async () => {
    if (!resumeInfo?.extractedText) {
      toast.error("Please upload a resume first");
      return;
    }

    try {
      setLoading(true);
      const optimized = await optimizeResume({
        resumeText: resumeInfo.extractedText,
        fileName: resumeInfo.file,
        filePath: resumeInfo.path,
        atsScore: resumeInfo.aiAnalysis?.atsScore
      });
      setData(optimized);
      localStorage.setItem("optimizedResume", JSON.stringify(optimized));
      toast.success("Resume optimized with AI");
    } catch (error) {
      toast.error("Optimization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (!resumeInfo) {
    return (
      <DashboardShell title="AI Optimizer" subtitle="Enhance your resume for maximum impact">
        <div className="flex h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 glass">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/5">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">No resume found</h2>
          <p className="mt-2 text-muted-foreground">Upload your resume to start optimizing with AI</p>
          <Button asChild className="mt-8 bg-gradient-primary">
            <a href="/dashboard/upload">Upload Now</a>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell 
      title="AI Resume Optimizer" 
      subtitle="Strategically enhanced by our advanced AI engine"
    >
      <div className="space-y-8">
        {/* Header Action Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass relative overflow-hidden rounded-3xl p-8"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Cpu className="h-32 w-32" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Sparkles className="h-3 w-3" />
                AI ENHANCEMENT ENGINE
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Ready to Optimize?</h2>
              <p className="max-w-md text-muted-foreground">
                Our AI will rewrite your summary, refine your experience, and inject high-impact keywords to beat the ATS.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleOptimize} 
              disabled={loading}
              className="h-14 bg-gradient-primary px-8 text-lg font-bold glow-purple"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Run AI Optimizer
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {data && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Score & Keywords */}
            <div className="space-y-8 lg:col-span-1">
              {/* ATS Improvement Score */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">ATS Improvement</h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-5xl font-black text-accent">+{data.atsImprovementScore}%</span>
                  <span className="mb-2 text-sm text-muted-foreground">potential boost</span>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Current Score: {resumeInfo.aiAnalysis?.atsScore || 65}%</span>
                    <span className="text-accent">Projected: {data.totalAtsScore}%</span>
                  </div>
                  <Progress value={data.totalAtsScore} className="h-2 bg-white/5" />
                </div>
              </motion.div>

              {/* Keyword Injection */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">ATS Keywords</h3>
                  <Target className="h-5 w-5 text-neon-pink" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Inject these into your resume to rank higher</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.atsKeywords.map((kw, i) => (
                    <span key={i} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs border border-white/5 hover:border-accent/30 transition-colors">
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Skill Enhancement */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Skill Formatting</h3>
                  <Layout className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-6 space-y-3">
                  {data.formattedSkills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Suggested Certifications */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-3xl p-6 border-l-4 border-l-neon-purple"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Next Steps</h3>
                  <Award className="h-5 w-5 text-neon-purple" />
                </div>
                <div className="mt-4 space-y-4">
                  {data.suggestedCertifications.map((cert, i) => (
                    <div key={i} className="rounded-xl bg-white/5 p-3 text-xs">
                      <div className="font-bold text-neon-purple">Recommended Cert</div>
                      <div className="mt-1">{cert}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Optimized Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Professional Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Optimized Professional Summary</h3>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.optimizedSummary)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-6 relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-primary rounded-full opacity-50" />
                  <p className="text-lg leading-relaxed italic text-white/90">
                    "{data.optimizedSummary}"
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-accent">
                  <CheckCircle2 className="h-4 w-4" />
                  Optimized with 12+ industry-specific keywords
                </div>
              </motion.div>

              {/* Project Improvements (Before vs After) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold px-2">Project Optimizations</h3>
                {data.improvedProjects.map((project, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass overflow-hidden rounded-3xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-6 bg-white/[0.02] border-r border-white/5">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Original</div>
                        <p className="text-sm text-muted-foreground">{project.original}</p>
                      </div>
                      <div className="p-6 bg-accent/[0.03] relative">
                        <div className="absolute top-4 right-4 text-accent/20">
                          <Zap className="h-8 w-8" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">Optimized</div>
                        <p className="text-sm font-medium text-white/90">{project.optimized}</p>
                        <button 
                          onClick={() => copyToClipboard(project.optimized)}
                          className="mt-4 flex items-center gap-1.5 text-xs text-accent hover:underline"
                        >
                          <Copy className="h-3 w-3" />
                          Copy optimized version
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Verbs & Wording */}
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-3xl p-6"
                >
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-accent" />
                    Wording Upgrades
                  </h4>
                  <div className="space-y-4">
                    {data.wordingImprovements.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 text-xs">
                        <span className="text-muted-foreground line-through decoration-destructive/50">{item.original}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="font-bold text-accent">{item.replacement}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-3xl p-6"
                >
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-neon-pink" />
                    Action Verbs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.actionVerbSuggestions.map((verb, i) => (
                      <span key={i} className="rounded-full bg-neon-pink/10 px-3 py-1 text-[10px] font-bold text-neon-pink border border-neon-pink/20 uppercase tracking-tight">
                        {verb}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bonus: Download Report */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between rounded-3xl border border-accent/20 bg-accent/5 p-8"
              >
                <div>
                  <h3 className="text-lg font-bold">Download Optimization Report</h3>
                  <p className="text-sm text-muted-foreground">Get a full breakdown of all suggested changes in PDF format.</p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
