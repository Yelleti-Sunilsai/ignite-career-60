import { 
  LogOut, 
  Settings, 
  User, 
  ChevronDown 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProfileDropdown() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    toast.success("Logged out successfully");
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-white/5 p-1.5 pr-3 transition-colors hover:bg-white/10">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-primary text-[10px] text-white">
              {user.name.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden text-left lg:block">
            <p className="text-xs font-semibold leading-none">{user.name}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground leading-none">{user.email}</p>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 glass border-border/40 p-1.5">
        <DropdownMenuLabel className="p-2">
          <p className="text-xs font-medium text-muted-foreground">My Account</p>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/40" />
        
        <DropdownMenuItem 
          onClick={() => navigate({ to: "/dashboard/profile" })}
          className="flex cursor-pointer items-center gap-2 rounded-lg py-2 focus:bg-white/10"
        >
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate({ to: "/dashboard/settings" })}
          className="flex cursor-pointer items-center gap-2 rounded-lg py-2 focus:bg-white/10"
        >
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/40" />

        <DropdownMenuItem 
          onClick={handleLogout}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-lg py-2",
            "text-red-400 focus:bg-red-500/10 focus:text-red-400",
            "transition-all duration-300 group"
          )}
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span className="text-sm font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LogoutButton({ className }: { className?: string }) {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: "/login" });
        toast.success("Logged out successfully");
    };

    return (
        <button
            onClick={handleLogout}
            className={cn(
                "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl",
                "bg-white/5 p-3 text-sm font-medium text-red-400 backdrop-blur-md",
                "border border-white/10 transition-all duration-300",
                "hover:bg-red-500/10 hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]",
                className
            )}
        >
            <div className="flex h-5 w-5 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <LogOut className="h-4 w-4" />
            </div>
            <span>Sign Out</span>
            
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
    );
}
