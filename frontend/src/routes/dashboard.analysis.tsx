import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Brain,
  Target,
  Briefcase,
  FileSearch,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateRecentResume } from "@/services/resume.service";

export const Route = createFileRoute("/dashboard/analysis")({
  component: AnalysisPage,
});

interface AnalysisData {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestedImprovements: string[];
  recommendedRoles: string[];
}

function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedData = localStorage.getItem("resumeAnalysis");
      if (storedData) {
        try {
          const parsedResponse = JSON.parse(storedData);
          const aiRawContent = parsedResponse.aiAnalysis;
          
          let parsedAI;
          if (typeof aiRawContent === 'string') {
            // Safe JSON extraction from AI string
            const jsonMatch = aiRawContent.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? jsonMatch[0] : aiRawContent;
            parsedAI = JSON.parse(jsonStr);
          } else {
            parsedAI = aiRawContent;
          }

          // Helper to ensure we always have an array
          const ensureArray = (val: any): string[] => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string') {
               // Try to split by common delimiters if it's a string
               return val.split(/\n|,/).map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
            }
            return [];
          };

          // Map with fallback values to ensure safety
          setAnalysis({
            atsScore: Number(parsedAI.atsScore || parsedAI["atsScore"] || parsedAI["ATS Score"] || 0),
            summary: parsedAI.summary || parsedAI["summary"] || parsedAI["Resume Summary"] || "No summary available.",
            strengths: ensureArray(parsedAI.strengths || parsedAI["strengths"] || parsedAI["Strengths"]),
            weaknesses: ensureArray(parsedAI.weaknesses || parsedAI["weaknesses"] || parsedAI["Weaknesses"]),
            missingSkills: ensureArray(parsedAI.missingSkills || parsedAI["missingSkills"] || parsedAI["Missing Skills"]),
            suggestedImprovements: ensureArray(parsedAI.suggestedImprovements || parsedAI["suggestedImprovements"] || parsedAI["Suggested Improvements"]),
            recommendedRoles: ensureArray(parsedAI.recommendedRoles || parsedAI["recommendedRoles"] || parsedAI["Recommended Job Roles"]),
          });
          // Sync to DB
          if (parsedResponse.file && parsedResponse.path) {
            updateRecentResume(parsedResponse.file, parsedResponse.path).catch(console.error);
          }
        } catch (error) {
          console.error("Failed to parse analysis data", error);
        }
      }
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <DashboardShell title="Analyzing Resume" subtitle="Our AI is crunching the numbers...">
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="rounded-full bg-gradient-primary p-4 glow-purple"
          >
            <Loader2 className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="mt-8 text-2xl font-bold">Parsing Insights...</h2>
          <p className="mt-2 text-muted-foreground text-center max-w-sm">
            We're extracting technical metrics and career recommendations from your resume.
          </p>
          
          <div className="mt-12 grid w-full max-w-4xl gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 opacity-20">
             {[1,2,3].map(i => (
                <div key={i} className="h-48 glass rounded-3xl animate-pulse" />
             ))}
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!analysis) {
    return (
      <DashboardShell title="No Analysis Found" subtitle="Upload a resume to get started">
        <div className="flex flex-col items-center justify-center py-20 glass rounded-[3rem] border-dashed border-white/10">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <FileSearch className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="mt-8 text-3xl font-bold">Start Your Analysis</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-md">
            Unlock AI-powered insights into your resume compatibility. Our system will scan for ATS keywords, strengths, and career paths.
          </p>
          <Button asChild className="mt-10 h-14 px-8 rounded-2xl bg-gradient-primary text-lg glow-purple">
            <Link to="/dashboard/upload" className="flex items-center gap-2">
              Upload Resume <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="AI Resume Analysis"
      subtitle="Detailed ATS and AI-powered insights"
    >
      <div className="space-y-6">
        {/* TOP SECTION */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ATS SCORE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass relative overflow-hidden rounded-3xl p-8 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="h-24 w-24 bg-cyan-500/10 blur-3xl rounded-full" />
            </div>
            
            <div className="flex items-center gap-2 text-sm font-medium tracking-widest text-muted-foreground">
              <Target className="h-4 w-4 text-accent" />
              ATS COMPATIBILITY
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[12px] border-white/5">
                <svg className="absolute h-full w-full -rotate-90 overflow-visible">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="84"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={`${(analysis.atsScore / 100) * 527} 527`}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-1000"
                  />
                </svg>

                <div className="text-center">
                  <div className="text-6xl font-black text-white leading-none">
                    {analysis.atsScore}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-tighter text-muted-foreground">
                    Percentile
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 rounded-2xl p-4 text-center text-sm font-medium ${
              analysis.atsScore > 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
            }`}>
              {analysis.atsScore > 80 ? "High interview probability detected." : 
               analysis.atsScore > 50 ? "Moderate compatibility. Needs work." : "Critical gaps identified."}
            </div>
          </motion.div>

          {/* SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Brain className="h-6 w-6 text-fuchsia-400" />
                Expert Perspective
              </div>

              <p className="mt-6 text-lg leading-relaxed text-foreground/80 font-medium">
                {analysis.summary}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:bg-white/10">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  Focus Area
                </div>
                <div className="mt-2 text-xl font-bold text-white">
                  Technical Expertise
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:bg-white/10">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  AI Sentiment
                </div>
                <div className="mt-2 text-xl font-bold text-cyan-400">
                  {analysis.atsScore > 75 ? "Highly Positive" : "Needs Refinement"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STRENGTHS + WEAKNESSES */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* STRENGTHS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-emerald-400">
              <div className="bg-emerald-500/20 p-2 rounded-xl">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              Key Strengths
            </div>

            <div className="mt-8 space-y-4">
              {analysis.strengths.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5 transition-all hover:bg-emerald-500/10"
                >
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-foreground/90 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
              {analysis.strengths.length === 0 && <p className="text-muted-foreground italic">No strengths identified.</p>}
            </div>
          </motion.div>

          {/* WEAKNESSES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-yellow-400">
               <div className="bg-yellow-500/20 p-2 rounded-xl">
                <AlertTriangle className="h-6 w-6" />
              </div>
              Critical Gaps
            </div>

            <div className="mt-8 space-y-4">
              {analysis.weaknesses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-5 transition-all hover:bg-yellow-500/10"
                >
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0" />
                  <span className="text-foreground/90 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
               {analysis.weaknesses.length === 0 && <p className="text-muted-foreground italic">No weaknesses identified.</p>}
            </div>
          </motion.div>
        </div>

        {/* MISSING SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 text-xl font-bold text-cyan-400">
            <div className="bg-cyan-500/20 p-2 rounded-xl">
              <Sparkles className="h-6 w-6" />
            </div>
            Missing Industry Keywords
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {analysis.missingSkills.map((skill, index) => (
              <div
                key={index}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-500/10 transition-colors"
              >
                {skill}
              </div>
            ))}
             {analysis.missingSkills.length === 0 && <p className="text-muted-foreground italic">Your resume is keyword-rich!</p>}
          </div>
        </motion.div>

        {/* IMPROVEMENTS + ROLES */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* IMPROVEMENTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-fuchsia-400">
              <div className="bg-fuchsia-500/20 p-2 rounded-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              Strategic Improvements
            </div>

            <div className="mt-8 space-y-4">
              {analysis.suggestedImprovements.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-white/5 p-5 font-medium leading-relaxed"
                >
                  {item}
                </div>
              ))}
               {analysis.suggestedImprovements.length === 0 && <p className="text-muted-foreground italic">No suggestions available.</p>}
            </div>
          </motion.div>

          {/* ROLES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-cyan-400">
              <div className="bg-cyan-500/20 p-2 rounded-xl">
                <Briefcase className="h-6 w-6" />
              </div>
              Target Career Roles
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.recommendedRoles.map((role, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-cyan-500/10 bg-cyan-500/10 p-5 text-center font-bold text-white shadow-lg shadow-cyan-500/5 transition-transform hover:-translate-y-1"
                >
                  {role}
                </div>
              ))}
               {analysis.recommendedRoles.length === 0 && <p className="text-muted-foreground italic">No roles recommended.</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}