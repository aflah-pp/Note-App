import React from "react";
import { useTheme } from "../context/ThemeContext";

function Notes({ note, onDelete }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formattedDate = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`group relative flex flex-col justify-between p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-default hover:-translate-y-0.5 ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          : "bg-white border border-black/[0.08] hover:bg-white hover:border-black/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at 50% 0%, rgba(94,106,210,0.08), transparent 70%)",
        }}
      />

      <div className="relative space-y-2 mb-4">
        <h3
          className={`text-base font-semibold leading-snug line-clamp-2 ${
            isDark ? "text-white/90" : "text-[#111110]"
          }`}
        >
          {note.title}
        </h3>

        <p
          className={`text-sm leading-relaxed line-clamp-4 ${
            isDark ? "text-white/45" : "text-black/55"
          }`}
        >
          {note.content}
        </p>
      </div>

      <div
        className={`relative flex items-center justify-between pt-4 border-t ${
          isDark ? "border-white/[0.06]" : "border-black/[0.06]"
        }`}
      >
        <div className="space-y-0.5">
          <p
            className={`text-[10px] uppercase tracking-wider ${
              isDark ? "text-white/25" : "text-black/30"
            }`}
          >
            Created
          </p>

          <p
            className={`text-xs ${
              isDark ? "text-white/40" : "text-black/50"
            }`}
          >
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {note.created_by && (
            <span className="text-xs text-[#5E6AD2] font-medium">
              @{note.created_by}
            </span>
          )}

          <button
            onClick={() => onDelete(note.id)}
            className={`p-1.5 rounded-lg border border-transparent transition-all duration-200 ${
              isDark
                ? "text-white/20 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20"
                : "text-black/30 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
            }`}
            aria-label="Delete note"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;