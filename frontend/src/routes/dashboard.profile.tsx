import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <DashboardShell title="Profile" subtitle="Manage your account settings and preferences">
      <div className="grid gap-6">
        <Card className="glass border-border/40">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20 rounded-2xl border-2 border-primary/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-primary text-2xl text-white">
                {user.name.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account ID</p>
                    <p className="text-sm font-mono bg-white/5 p-2 rounded-lg border border-border/40">{user.id}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subscription</p>
                    <p className="text-sm bg-accent/20 text-accent px-3 py-1.5 rounded-full inline-block font-medium">Free Plan</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
