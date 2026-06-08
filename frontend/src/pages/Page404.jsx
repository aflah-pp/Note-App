import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#050506] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#5E6AD2]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">

        {/* 404 number */}
        <div className="text-[120px] font-bold leading-none bg-gradient-to-br from-white/10 via-white/5 to-transparent bg-clip-text text-transparent select-none mb-2">
          404
        </div>

        {/* Accent line */}
        <div className="w-12 h-0.5 bg-[#5E6AD2] rounded-full mb-6" />

        <h2 className="text-xl font-semibold text-white/80 mb-3">Page not found</h2>
        <p className="text-sm text-white/35 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Head back to login or create a new account.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#5E6AD2] rounded-xl hover:bg-[#6B76D9] shadow-[0_0_20px_rgba(94,106,210,0.3)] hover:shadow-[0_0_28px_rgba(94,106,210,0.45)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-semibold text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.10] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
          >
            Register
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 text-sm font-semibold text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.10] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;