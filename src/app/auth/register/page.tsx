"use client";

import React, { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

// Reusing the ElegantShape component from the landing page
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface RegisterResponse {
  email?: string;
  name?: string;
  user?: {
    email: string;
    name: string;
  };
  message?: string;
  success?: boolean;
  token?: string;
}

interface ApiError {
  message: string;
}

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if((password.length)<8){
      setError("Password too small");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!apiUrl) {
        throw new Error(
          "API URL is not defined. Please add it to your .env.local file as NEXT_PUBLIC_API_URL"
        );
      }

      console.log(
        "Submitting registration to:",
        `${apiUrl}/api/auth/register-user`
      );

      const response = await axios.post<RegisterResponse>(
        `${apiUrl}/api/auth/register-user`,
        {
          name,
          email,
          password,
        }
      );

      console.log("Registration response:", response.data);

      if (response.data) {
        const userEmail =
          response.data.email || response.data.user?.email || "";
        const userName = response.data.name || response.data.user?.name || name;

        if (userEmail) {
          if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("userName", userName);
          }

          setSuccess(true);

          setTimeout(() => router.push("/"), 1500);
        } else if (
          response.data.success ||
          response.data.message?.toLowerCase().includes("success")
        ) {
          setSuccess(true);

          if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userName", name);
          }
          
          setTimeout(() => router.push('/'), 1500);
        } else {
           
          console.warn(
            "Unexpected but successful response format:",
            response.data
          );
          setSuccess(true);

          if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userName", name);
          }
          
          setTimeout(() => router.push('/'), 1500);
        }
      } else {
        throw new Error("Empty response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 mx-auto"
        >
          <Circle className="h-2 w-2 fill-rose-500/80" />
          <span className="text-sm text-white/60 tracking-wide">AnguliLekha</span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full backdrop-blur-sm bg-white/[0.03] border border-white/[0.08] rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Create Account
            </h2>
            <p className="text-white/40 mt-2 tracking-wide">
              Join us to experience real-time ISL recognition
            </p>
          </div>

          {error && (
            <Alert className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <AlertDescription>Registration successful!</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/60 block text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/[0.03] border-white/[0.08] focus:border-white/20 text-white placeholder:text-white/30 focus:bg-white/[0.05]"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60 block text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.03] border-white/[0.08] focus:border-white/20 text-white placeholder:text-white/30 focus:bg-white/[0.05]"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/60 block text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.03] border-white/[0.08] focus:border-white/20 text-white placeholder:text-white/30 focus:bg-white/[0.05]"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/60 block text-sm">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white/[0.03] border-white/[0.08] focus:border-white/20 text-white placeholder:text-white/30 focus:bg-white/[0.05]"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-medium rounded-md transition-all duration-300 border-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-300 hover:text-white transition-colors">
                Sign In
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
};

export default RegisterPage;