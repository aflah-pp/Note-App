import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`
        relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
        border transition-all duration-300
        ${isDark
          ? "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80"
          : "bg-black/5 border-black/10 text-black/50 hover:bg-black/10 hover:text-black/80"
        }
      `}
    >
      {/* Sun icon */}
      <svg
        className={`w-4 h-4 transition-all duration-300 ${isDark ? "opacity-40 scale-90" : "opacity-100 scale-100 text-amber-500"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" strokeWidth={2} strokeLinecap="round" />
        <path strokeWidth={2} strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* Track */}
      <span
        className={`
          relative w-9 h-5 rounded-full transition-all duration-300
          ${isDark ? "bg-[#5E6AD2]/40" : "bg-black/15"}
        `}
      >
        <span
          className={`
            absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all duration-300
            ${isDark
              ? "left-4 bg-[#5E6AD2]"
              : "left-0.5 bg-white border border-black/10"
            }
          `}
        />
      </span>

      {/* Moon icon */}
      <svg
        className={`w-4 h-4 transition-all duration-300 ${isDark ? "opacity-100 scale-100 text-[#8b96e8]" : "opacity-40 scale-90"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
  );
}

export default ThemeToggle;