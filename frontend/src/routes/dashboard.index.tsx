import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  FileText, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Eye, 
  Lightbulb, 
  Clock, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadarChart, Radar, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  BarChart, Bar, CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { getRecentResumes, RecentResume } from "@/services/resume.service";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({ component: Dashboard });

const atsTrend = [
  { d: "Mon", v: 62 }, { d: "Tue", v: 68 }, { d: "Wed", v: 71 },
  { d: "Thu", v: 76 }, { d: "Fri", v: 81 }, { d: "Sat", v: 85 }, { d: "Sun", v: 92 },
];
const radar = [
  { skill: "React", you: 90, role: 80 },
  { skill: "TS", you: 85, role: 80 },
  { skill: "Node", you: 70, role: 75 },
  { skill: "GraphQL", you: 55, role: 70 },
  { skill: "Cloud", you: 65, role: 60 },
  { skill: "Testing", you: 78, role: 70 },
];
const views = [
  { d: "W1", v: 12 }, { d: "W2", v: 22 }, { d: "W3", v: 38 }, { d: "W4", v: 54 },
];

function Dashboard() {
  const [recentResumes, setRecentResumes] = useState<RecentResume[]>([]);

  useEffect(() => {
    getRecentResumes().then(setRecentResumes).catch(console.error);
  }, []);

  return (
    <DashboardShell title="Welcome back" subtitle="Here's how your resume is performing this week.">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Target} label="ATS Score" value="92" delta="+8" gradient />
        <Stat icon={Sparkles} label="Resume Health" value="A+" delta="Strong" />
        <Stat icon={TrendingUp} label="Skills Match" value="87%" delta="+12%" />
        <Stat icon={Eye} label="Resume Views" value="248" delta="+34" />
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">ATS trend</div>
                <h3 className="mt-1 text-lg font-semibold">Last 7 days</h3>
              </div>
              <Link to="/dashboard/upload" className="text-xs text-muted-foreground hover:text-foreground flex items-center">
                Upload New <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <AreaChart data={atsTrend}>
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.58 0.24 295)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.58 0.24 295)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" stroke="oklch(0.65 0.02 280)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.65 0.02 280)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.1 0.01 280)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                  <Area dataKey="v" stroke="oklch(0.72 0.16 210)" strokeWidth={2.5} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Resumes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold">Recent Resumes</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/upload">View All</Link>
              </Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {recentResumes.length > 0 ? (
                recentResumes.slice(0, 4).map((resume, i) => (
                  <motion.div 
                    key={resume.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass group relative overflow-hidden rounded-2xl p-5"
                  >
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 group-hover:bg-accent/10 transition-colors">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold truncate max-w-[150px]">{resume.file_name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(resume.opened_at))} ago
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-accent">{resume.ats_score}</div>
                        <div className="text-[10px] uppercase tracking-tighter text-muted-foreground">ATS</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="h-5 w-5 rounded-full border border-background bg-muted text-[8px] flex items-center justify-center">AI</div>
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 gap-1 px-2 text-xs hover:bg-accent/10 hover:text-accent" asChild>
                        <Link to="/dashboard/optimizer">
                          Optimize <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="sm:col-span-2 glass rounded-2xl p-8 text-center border-dashed">
                  <p className="text-muted-foreground italic">No recent resumes yet. Upload one to start!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-accent">Skill radar</div>
            <h3 className="mt-1 text-lg font-semibold">You vs Role</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <RadarChart data={radar}>
                  <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.7 0.02 280)", fontSize: 10 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar dataKey="role" stroke="oklch(0.72 0.16 210)" fill="oklch(0.72 0.16 210)" fillOpacity={0.2} />
                  <Radar dataKey="you" stroke="oklch(0.58 0.24 295)" fill="oklch(0.58 0.24 295)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-accent" /><h3 className="text-lg font-semibold">AI Insights</h3></div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Add 2 metrics to your most recent role",
                "Include 'GraphQL' — appears in 78% of target JDs",
                "Shorten summary to 3 lines for ATS",
                "Use stronger action verbs in bullets 2–4",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ icon: Icon, label, value, delta, gradient }: { icon: any; label: string; value: string; delta: string; gradient?: boolean }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="glass relative overflow-hidden rounded-2xl p-5">
      {gradient && <div className="absolute inset-0 bg-gradient-aurora opacity-10" />}
      <div className="relative flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5"><Icon className="h-4 w-4 text-accent" /></div>
      </div>
      <div className="relative mt-3 flex items-baseline gap-2">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-xs text-accent">{delta}</div>
      </div>
    </motion.div>
  );
}