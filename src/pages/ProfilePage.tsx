import { useAuth } from "@/lib/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, Activity, BadgeCheck, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // If not logged in, gracefully navigate to auth or return empty securely.
    // Assuming App.tsx handles strict protecting, but we also catch here.
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground mb-4">You are not logged in.</p>
        <Button onClick={() => navigate("/auth")}>Go to Auth</Button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleEditProfile = () => {
    toast.info("Edit Profile feature coming soon!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center pb-8 border-b border-border/30 bg-muted/20">
            <div className="mx-auto flex justify-center mb-4 relative">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                {/* We don't have an uploaded image yet, so default to Fallback initials */}
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {getInitials(user.name || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-1/2 translate-x-10 translate-y-2 bg-green-500 rounded-full h-4 w-4 border-2 border-background" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {user.name || "User"}
            </CardTitle>
            <CardDescription className="text-base mt-1 flex items-center justify-center gap-1">
              <BadgeCheck className="w-4 h-4 text-primary" />
              {user.role} Member
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-6 px-6 sm:px-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.email && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Depression Level
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {user.depressionLevel || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-md">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Age</p>
                  <p className="text-sm">{user.age || "Unknown"}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 border-t border-border/30 px-6 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto min-h-[44px]"
              onClick={handleEditProfile}
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              className="w-full sm:w-auto min-h-[44px]"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
