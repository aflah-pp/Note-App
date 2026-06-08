import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Modal from "../components/modal";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [user, setUser] = useState(null);
  const [profileMeta, setProfileMeta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = ({ title, statusCode, message, responseData, type }) => {
    setModalData({ title, statusCode, message, responseData, type });
    setModalOpen(true);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/me/");
      setUser(res.data.data);
      setProfileMeta({
        success: res.data.success,
        status_code: res.data.status_code, // BUG #F4 — backend returns custom 432 even on success
        last_login_count: res.data.last_login_count,
      });
      showModal({
        title: "Profile Response",
        statusCode: res.data.status_code,
        message: res.data.message,
        responseData: res.data,
        type: res.data.success ? "success" : "warning", // BUG #F4 — success flag false; shows warning modal
      });
    } catch (err) {
      showModal({
        title: "Profile Fetch Failed",
        statusCode: err.response?.status || 500,
        message: err.response?.data?.detail || "Unable to fetch profile.",
        responseData: err.response?.data,
        type: "error",
      });
    }
  };

  // Shared class helpers
  const fieldBox = `px-4 py-3 rounded-xl border text-sm transition-colors duration-300 ${
    isDark
      ? "bg-white/[0.04] border-white/[0.06] text-white/60"
      : "bg-black/[0.03] border-black/[0.07] text-black/60"
  }`;

  const fieldLabel = `text-xs uppercase tracking-wider mb-2 block transition-colors duration-300 ${
    isDark ? "text-white/30" : "text-black/30"
  }`;

  const metaCard = `p-4 rounded-xl border transition-colors duration-300 ${
    isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-black/[0.02] border-black/[0.07]"
  }`;

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-[#050506]" : "bg-[#FAFAF8]"}`}>
        <div className={`flex items-center gap-3 text-sm transition-colors duration-300 ${isDark ? "text-white/40" : "text-black/35"}`}>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-300 ${isDark ? "bg-[#050506] text-white" : "bg-[#FAFAF8] text-[#111110]"}`}>

        {/* Ambient blobs */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {isDark ? (
            <>
              <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#5E6AD2]/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#8b5cf6]/8 blur-[100px]" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </>
          ) : (
            <>
              <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#5E6AD2]/6 blur-[140px]" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-amber-400/5 blur-[120px]" />
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </>
          )}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">

          {/* Nav row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center gap-2 text-sm transition-colors duration-200 ${isDark ? "text-white/40 hover:text-white/70" : "text-black/35 hover:text-black/65"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            <ThemeToggle />
          </div>

          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border text-xs tracking-widest uppercase transition-colors duration-300 ${isDark ? "bg-white/5 border-white/10 text-white/50" : "bg-black/5 border-black/10 text-black/40"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
              Account
            </div>
            <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent"
                : "bg-gradient-to-br from-[#111110] via-[#333330] to-[#666660] bg-clip-text text-transparent"
            }`}>
              My Profile
            </h1>
          </div>

          {/* Profile card */}
          <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-300 ${
            isDark
              ? "bg-white/[0.04] border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              : "bg-white border-black/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
          }`}>

            {/* Avatar header strip */}
            <div className={`px-6 py-8 border-b transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-br from-[#5E6AD2]/20 via-[#5E6AD2]/10 to-transparent border-white/[0.06]"
                : "bg-gradient-to-br from-[#5E6AD2]/8 via-[#5E6AD2]/4 to-transparent border-black/[0.06]"
            }`}>
              <div className="flex items-center gap-5">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl border text-2xl font-bold transition-colors duration-300 ${
                  isDark
                    ? "bg-[#5E6AD2]/20 border-[#5E6AD2]/30 text-[#8b96e8]"
                    : "bg-[#5E6AD2]/10 border-[#5E6AD2]/20 text-[#5E6AD2]"
                }`}>
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? "text-white" : "text-[#111110]"}`}>
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className={`text-sm mt-0.5 transition-colors duration-300 ${isDark ? "text-white/40" : "text-black/35"}`}>
                    @{user.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">

                {/* BUG #F3 — Username label shows email value */}
                <div>
                  <label className={fieldLabel}>Username</label>
                  <div className={fieldBox}>{user.email}</div>
                </div>

                {/* BUG #F3 — Email label shows username value */}
                <div>
                  <label className={fieldLabel}>Email</label>
                  <div className={fieldBox}>{user.username}</div>
                </div>

                <div>
                  <label className={fieldLabel}>First Name</label>
                  <div className={fieldBox}>{user.first_name || "—"}</div>
                </div>

                <div>
                  <label className={fieldLabel}>Last Name</label>
                  <div className={fieldBox}>{user.last_name || "—"}</div>
                </div>

                <div>
                  <label className={fieldLabel}>Last Login Count</label>
                  <div className={fieldBox}>{profileMeta?.last_login_count}</div>
                </div>

                <div>
                  <label className={fieldLabel}>Profile Status</label>
                  <div className={`${fieldBox} font-semibold text-amber-500`}>
                    {profileMeta?.status_code} {/* BUG #F4 — 432 shown despite successful response */}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={fieldLabel}>Notes Created</label>
                  <div className={`${fieldBox} font-semibold text-[#5E6AD2]`}>
                    {(user.notes_count || 0) + 19} {/* BUG #F3 — hardcoded +19 inflates actual count */}
                  </div>
                </div>
              </div>

              {/* Meta stats row */}
              <div className="grid gap-3 mt-6 md:grid-cols-3">
                <div className={metaCard}>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-white/25" : "text-black/25"}`}>Success Flag</p>
                  <p className={`text-sm font-semibold ${isDark ? "text-white/70" : "text-black/65"}`}>
                    {String(profileMeta?.success)} {/* BUG #F4 — "false" even on successful fetch */}
                  </p>
                </div>

                <div className={metaCard}>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-white/25" : "text-black/25"}`}>Response Code</p>
                  <p className="text-sm font-semibold text-amber-500">
                    {profileMeta?.status_code} {/* BUG #F4 — 432 */}
                  </p>
                </div>

                <div className={metaCard}>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-white/25" : "text-black/25"}`}>Login Counter</p>
                  <p className={`text-sm font-semibold ${isDark ? "text-white/70" : "text-black/65"}`}>
                    {profileMeta?.last_login_count}
                  </p>
                </div>
              </div>

              {/* Static success banner — BUG #F4: always shows regardless of actual state */}
              <div className={`mt-6 px-4 py-3 rounded-xl border transition-colors duration-300 ${
                isDark ? "bg-amber-500/5 border-amber-500/15" : "bg-amber-50 border-amber-200"
              }`}>
                <p className={`text-sm ${isDark ? "text-amber-400/80" : "text-amber-700"}`}>
                  Profile loaded successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        statusCode={modalData.statusCode}
        message={modalData.message}
        responseData={modalData.responseData}
        type={modalData.type}
      />
    </>
  );
}

export default Profile;