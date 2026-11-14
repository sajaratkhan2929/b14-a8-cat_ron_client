"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("booknook-dark");

  useEffect(() => {
    const saved = localStorage.getItem("booknook-theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggle = () => {
    const next = theme === "booknook-dark" ? "booknook-light" : "booknook-dark";
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
      {theme === "booknook-dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}