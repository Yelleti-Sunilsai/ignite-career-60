import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue optimizing." footer={<>Don't have an account? <Link to="/signup" className="text-accent hover:underline">Sign up</Link></>}>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="glass border-white/10"><Mail className="mr-2 h-4 w-4" />Google</Button>
        <Button variant="outline" className="glass border-white/10"><Github className="mr-2 h-4 w-4" />GitHub</Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" /></div>
      <form className="space-y-4">
        <div><Label>Email</Label><Input type="email" placeholder="you@company.com" className="mt-1.5 bg-white/5" /></div>
        <div>
          <div className="flex items-center justify-between"><Label>Password</Label><Link to="/forgot-password" className="text-xs text-accent hover:underline">Forgot?</Link></div>
          <Input type="password" placeholder="••••••••" className="mt-1.5 bg-white/5" />
        </div>
        <Button className="w-full bg-gradient-primary text-white glow-purple">Log in</Button>
      </form>
    </AuthShell>
  );
}