import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardShell title="Settings" subtitle="Configure your application preferences">
      <div className="grid gap-6">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you want to be notified about your resume analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <Switch id="marketing-emails" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <button className="rounded-lg bg-white/5 border border-border/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
                Change Password
             </button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
