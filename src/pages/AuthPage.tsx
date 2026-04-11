import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { registerUser, signInUser, requestPasswordReset } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, AlertCircle, KeyRound } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────
type RegisterFormValues = {
  name: string;
  email: string;
  age: number;
  phone: string;
  password: string;
  depressionLevel: "Low" | "Medium" | "High";
  role: string;
};

type SignInFormValues = {
  emailOrPhone: string;
  password: string;
};

// ── Sign Up Form ───────────────────────────────────────────────────────
function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      phone: "",
      password: "",
      depressionLevel: "Low",
      role: "Student",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
      localStorage.setItem("registered", "true");
      toast("Account Created", {
        description: `Welcome to MindCare, ${data.name}! We're glad you're here.`,
        icon: <Sparkles className="w-5 h-5 text-purple-400" />,
        className: "!border-purple-500/30 !bg-purple-500/5",
      });
      onSuccess();
    } catch (e: any) {
      toast("Registration failed", {
        description: e.message || "There was a problem creating your account. Please try again.",
        icon: <AlertCircle className="w-5 h-5 text-destructive" />,
        className: "!border-destructive/30 !bg-destructive/5",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="123‑456‑7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depressionLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depression Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

// ── Sign In Form ───────────────────────────────────────────────────────
function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [showReset, setShowReset] = useState(false);
  const form = useForm<SignInFormValues>({
    defaultValues: { emailOrPhone: "", password: "" },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const user = await signInUser(data.emailOrPhone, data.password);
      toast("Welcome Back!", {
        description: `We're happy to see you again, ${user.name || "User"}.`,
        icon: <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />,
        className: "!border-pink-500/30 !bg-pink-500/5",
      });
      onSuccess();
    } catch (e: any) {
      toast("Sign In Failed", {
        description: e.message || "Please check your credentials and try again.",
        icon: <AlertCircle className="w-5 h-5 text-destructive" />,
        className: "!border-destructive/30 !bg-destructive/5",
      });
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues("emailOrPhone");
    if (!email) {
      toast("Email Required", {
        description: "Please enter your email or phone number first.",
        icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
        className: "!border-amber-500/30 !bg-amber-500/5",
      });
      return;
    }
    await requestPasswordReset(email);
    toast("Password Reset", {
      description: "A reset link has been sent to your email address.",
      icon: <KeyRound className="w-5 h-5 text-blue-400" />,
      className: "!border-blue-500/30 !bg-blue-500/5",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com or 123‑456‑7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:underline cursor-pointer"
        >
          Forgot Password?
        </button>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

// ── Auth Page ──────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const navigate = useNavigate();

  const handleSuccess = () => navigate("/");

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "signup" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {mode === "signup"
              ? "Sign up to access personalized mental health insights."
              : "Sign in to continue your journey."}
          </p>

          {mode === "signup" ? (
            <SignUpForm onSuccess={handleSuccess} />
          ) : (
            <SignInForm onSuccess={handleSuccess} />
          )}

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
