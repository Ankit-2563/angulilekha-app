"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setIsAuthenticated(!!email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/level" },
    { name: "Test", path: "/test" }, // 👈 New link added here
    { name: "About", path: "/about-us" },
  ];

  return (
    <header className="bg-black/90 backdrop-blur-sm shadow-md py-4 px-6 md:px-20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold text-white">AnguliLekha</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex gap-6 text-lg text-white/70">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`px-3 py-1 rounded transition ${
                pathname === link.path
                  ? "text-white bg-gray-800"
                  : "hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center px-4 py-1.5 text-base font-medium text-white border overflow-hidden transition-all"
              style={{
                borderWidth: "1px",
                borderImage:
                  "linear-gradient(to right, #fda4af, rgba(255,255,255,0.9), #a5b4fc) 1",
                WebkitBackgroundClip: "padding-box",
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="relative inline-flex items-center justify-center px-4 py-1.5 text-base font-medium text-white border overflow-hidden transition-all"
              style={{
                borderWidth: "1px",
                borderImage:
                  "linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #fda4af) 1",
                WebkitBackgroundClip: "padding-box",
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-4 bg-black/95">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 rounded transition text-lg ${
                  pathname === link.path
                    ? "text-white bg-gray-800"
                    : "text-white/70 hover:text-white hover:bg-gray-800/50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="relative inline-flex items-center justify-center px-4 py-1.5 mt-2 text-base font-medium text-white border rounded-full overflow-hidden w-full transition-all"
                style={{
                  borderWidth: "1px",
                  borderImage:
                    "linear-gradient(to right, #fda4af, rgba(255,255,255,0.9), #a5b4fc) 1",
                  WebkitBackgroundClip: "padding-box",
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="relative inline-flex items-center justify-center px-4 py-1.5 mt-2 text-base font-medium text-white border rounded-full overflow-hidden w-full transition-all"
                style={{
                  borderWidth: "1px",
                  borderImage:
                    "linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #fda4af) 1",
                  WebkitBackgroundClip: "padding-box",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
