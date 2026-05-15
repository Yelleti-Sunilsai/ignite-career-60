import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";

const links = [
  { label: "Features", to: "/#features" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/#about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-md opacity-60 -z-10" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Resumind</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-primary text-white shadow-[0_0_20px_oklch(0.58_0.24_295/0.5)] hover:opacity-90">
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass fixed inset-x-4 top-20 rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.to} className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              
              <div className="h-px bg-white/10 my-2" />

              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-3 px-2 py-1">
                      <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-[10px] font-bold text-white">
                        {user?.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user?.email}</p>
                      </div>
                   </div>
                   <Button asChild variant="ghost" size="sm" className="justify-start">
                     <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                   </Button>
                   <Button asChild variant="ghost" size="sm" className="justify-start text-red-400 hover:text-red-400">
                     <Link to="/login" onClick={() => {
                        useAuthStore.getState().logout();
                        setOpen(false);
                     }}>Logout</Link>
                   </Button>
                </div>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm"><Link to="/login" onClick={() => setOpen(false)}>Login</Link></Button>
                  <Button asChild size="sm" className="bg-gradient-primary text-white"><Link to="/signup" onClick={() => setOpen(false)}>Get Started</Link></Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}