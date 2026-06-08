import React from "react";

function Modal({
  isOpen,
  onClose,
  title = "API Response",
  statusCode,
  message,
  responseData,
  type = "info",
}) {
  if (!isOpen) return null;

  const typeConfig = {
    success: {
      accent: "bg-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      accent: "bg-red-500",
      badge: "bg-red-500/10 text-red-400 border border-red-500/20",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      accent: "bg-amber-500",
      badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
    },
    info: {
      accent: "bg-[#5E6AD2]",
      badge: "bg-[#5E6AD2]/10 text-[#8b96e8] border border-[#5E6AD2]/20",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#0d0d0f] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden">

        {/* Accent top bar */}
        <div className={`h-0.5 w-full ${config.accent}`} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className={`p-1.5 rounded-lg ${config.badge}`}>
              {config.icon}
            </span>
            <h2 className="text-sm font-semibold text-white/80">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-white/40 uppercase tracking-wider">Status Code</span>
            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-md ${config.badge}`}>
              {statusCode}
            </span>
          </div>

          <div>
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Message</p>
            <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/60">
              {message || "No message received"}
            </div>
          </div>

          <div>
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Response Data</p>
            <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.06] text-xs text-emerald-400/80 overflow-auto max-h-48 leading-relaxed font-mono">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-semibold text-white/70 bg-white/[0.06] border border-white/[0.08] rounded-xl hover:bg-white/[0.10] hover:text-white transition-all duration-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;