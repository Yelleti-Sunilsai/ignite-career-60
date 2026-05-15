import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPassword });


function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reset link sent to your email!");
  };

  return (
    <AuthShell 
      title="Reset password" 
      subtitle="Enter your email to receive a reset link." 
      footer={<><Link to="/login" className="text-accent hover:underline">Back to login</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button 
          type="submit" 
          className="w-full bg-gradient-primary text-white glow-purple"
        >
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
