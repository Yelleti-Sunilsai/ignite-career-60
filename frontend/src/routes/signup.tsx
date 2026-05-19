import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { registerUser, verifyOtp } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await verifyOtp({ email, otp });
      setAuth(data.user, data.token);
      toast.success("Account verified successfully!");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell 
      title={step === 1 ? "Create account" : "Verify Email"} 
      subtitle={step === 1 ? "Start your journey to a better career." : "Enter the 6-digit code sent to your email."} 
      footer={<>Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link></>}
    >
      {step === 1 ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="glass border-white/10"><Mail className="mr-2 h-4 w-4" />Google</Button>
            <Button variant="outline" className="glass border-white/10"><Github className="mr-2 h-4 w-4" />GitHub</Button>
          </div>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" />
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
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
        </>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <Label>One-Time Password</Label>
            <Input 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text" 
              maxLength={6}
              placeholder="123456" 
              className="mt-1.5 bg-white/5 text-center text-2xl tracking-[0.5em]" 
              required 
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-primary text-white glow-purple"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify Email"}
          </Button>
          <div className="text-center text-sm">
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="text-muted-foreground hover:text-white"
            >
              Back to Sign Up
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
