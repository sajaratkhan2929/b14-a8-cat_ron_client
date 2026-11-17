"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("booknook-light");

  useEffect(() => {
    const saved = localStorage.getItem("booknook-theme");
    if (saved === "booknook-light" || saved === "booknook-dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggle = () => {
    const next = theme === "booknook-light" ? "booknook-dark" : "booknook-light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("booknook-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="btn btn-ghost btn-circle btn-sm"
    >
      {theme === "booknook-light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}