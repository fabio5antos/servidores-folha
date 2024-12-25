"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

//   return (
//     <button
//       onClick={toggleTheme}
//       className="fixed bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all z-50"
//       aria-label="Alternar tema"
//     >
//       {resolvedTheme === "dark" ? (
//         <SunIcon className="h-6 w-6" />
//       ) : (
//         <MoonIcon className="h-6 w-6" />
//       )}
//     </button>
//   );
} 