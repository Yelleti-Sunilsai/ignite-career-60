import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles, Target, TrendingUp, Eye, Lightbulb } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadarChart, Radar, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  BarChart, Bar, CartesianGrid,
} from "recharts";

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
  return (
    <DashboardShell title="Welcome back, Ada" subtitle="Here's how your resume is performing this week.">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Target} label="ATS Score" value="92" delta="+8" gradient />
        <Stat icon={Sparkles} label="Resume Health" value="A+" delta="Strong" />
        <Stat icon={TrendingUp} label="Skills Match" value="87%" delta="+12%" />
        <Stat icon={Eye} label="Resume Views" value="248" delta="+34" />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent">ATS trend</div>
              <h3 className="mt-1 text-lg font-semibold">Last 7 days</h3>
            </div>
            <Link to="/dashboard/analytics" className="text-xs text-muted-foreground hover:text-foreground">View all <ArrowUpRight className="ml-1 inline h-3 w-3" /></Link>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
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

        <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-accent">Skill radar</div>
          <h3 className="mt-1 text-lg font-semibold">You vs Role</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
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
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold">Resume views</h3>
          <p className="text-xs text-muted-foreground">Last 4 weeks</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer>
              <BarChart data={views}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="d" stroke="oklch(0.65 0.02 280)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.65 0.02 280)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.1 0.01 280)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="oklch(0.58 0.24 295)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-accent" /><h3 className="text-lg font-semibold">Suggestions</h3></div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Add 2 metrics to your most recent role",
              "Include 'GraphQL' — appears in 78% of target JDs",
              "Shorten summary to 3 lines for ATS",
              "Use stronger action verbs in bullets 2–4",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                <FileText className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
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