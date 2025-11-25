"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
