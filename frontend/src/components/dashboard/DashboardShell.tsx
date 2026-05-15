import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  FileSearch,
  Wand2,
  BarChart3,
  Settings,
  User,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";

import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { AnimatedBackground } from "@/components/site/Background";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ProfileDropdown, LogoutButton } from "./ProfileDropdown";


const nav = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: "/dashboard/upload",
    label: "Upload Resume",
    icon: Upload,
  },
  {
    to: "/dashboard/analysis",
    label: "Resume Analysis",
    icon: FileSearch,
  },
  {
    to: "/dashboard/optimizer",
    label: "Optimizer",
    icon: Wand2,
  },
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
];

export function DashboardShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const path = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-background text-foreground">
        <AnimatedBackground />

        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-sidebar/70 backdrop-blur-xl lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border/60 px-5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <span className="font-semibold">
              Resumind
            </span>
          </div>

          <nav className="p-3">
            {nav.map((item) => {
              const active = item.exact
                ? path === item.to
                : path.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative block"
                >
                  <div
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary opacity-20 ring-1 ring-primary/40"
                      />
                    )}

                    <item.icon className="h-4 w-4" />

                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="absolute inset-x-3 bottom-3 space-y-3">
            <div className="glass rounded-2xl p-4">
              <div className="text-xs uppercase tracking-widest text-accent">
                Pro
              </div>

              <div className="mt-1 text-sm font-medium">
                Unlock unlimited analyses
              </div>

              <button className="mt-3 w-full rounded-lg bg-gradient-primary py-2 text-xs font-medium text-white">
                Upgrade
              </button>
            </div>

            <LogoutButton />
          </div>

        </aside>

        {/* Main */}
        <div className="lg:pl-64">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/60 bg-background/60 px-5 backdrop-blur-xl">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search resumes, jobs, skills…"
                className="bg-white/5 pl-9"
              />
            </div>

            <button className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5 hover:bg-white/10">
              <Bell className="h-4 w-4" />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>

            <ProfileDropdown />
          </header>


          <main className="p-6 lg:p-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {title}
                </h1>

                {subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}