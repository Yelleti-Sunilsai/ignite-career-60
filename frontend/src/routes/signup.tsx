import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      setAuth(data.user, data.token);
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell 
      title="Create account" 
      subtitle="Start your journey to a better career." 
      footer={<>Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link></>}
    >
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="glass border-white/10"><Mail className="mr-2 h-4 w-4" />Google</Button>
        <Button variant="outline" className="glass border-white/10"><Github className="mr-2 h-4 w-4" />GitHub</Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Full Name</Label>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
            placeholder="John Doe" 
            className="mt-1.5 bg-white/5" 
            required 
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="you@company.com" 
            className="mt-1.5 bg-white/5" 
            required 
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder="••••••••" 
            className="mt-1.5 bg-white/5" 
            required 
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-primary text-white glow-purple"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign up"}
        </Button>
      </form>
    </AuthShell>
  );
}
