import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Modal from "../components/modal";

function Profile() {
  const navigate = useNavigate();
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
        status_code: res.data.status_code,     // BUG #F4 — backend returns custom 432 even on success
        last_login_count: res.data.last_login_count,
      });
      showModal({
        title: "Profile Response",
        statusCode: res.data.status_code,
        message: res.data.message,
        responseData: res.data,
        type: res.data.success ? "success" : "warning", // BUG #F4 — success flag is false from backend; modal shows as warning
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

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050506] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40 text-sm">
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
      <div className="min-h-screen bg-[#050506] text-white font-sans relative overflow-x-hidden">

        {/* Ambient blobs */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#5E6AD2]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#8b5cf6]/8 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 mb-8 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
              Account
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>

          {/* Profile card */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden">

            {/* Avatar header */}
            <div className="px-6 py-8 bg-gradient-to-br from-[#5E6AD2]/20 via-[#5E6AD2]/10 to-transparent border-b border-white/[0.06]">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 text-2xl font-bold text-[#8b96e8]">
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-sm text-white/40 mt-0.5">@{user.username}</p>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">

                {/* BUG #F3 — Username label shows email value, Email label shows username value (swapped) */}
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Username</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60">
                    {user.email}  {/* BUG #F3 — should be user.username */}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Email</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60">
                    {user.username}  {/* BUG #F3 — should be user.email */}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">First Name</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60">
                    {user.first_name || "—"}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Last Name</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60">
                    {user.last_name || "—"}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Last Login Count</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60">
                    {profileMeta?.last_login_count}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Profile Status</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-amber-400">
                    {profileMeta?.status_code} {/* BUG #F4 — shows 432 custom code even on successful load */}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Notes Created</label>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-[#8b96e8]">
                    {(user.notes_count || 0) + 19} {/* BUG #F3 — hardcoded +19 inflates actual notes count */}
                  </div>
                </div>
              </div>

              {/* Meta stats row */}
              <div className="grid gap-3 mt-6 md:grid-cols-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-white/25 uppercase tracking-wider mb-1">Success Flag</p>
                  <p className="text-sm font-semibold text-white/70">
                    {String(profileMeta?.success)} {/* BUG #F4 — displays "false" even on successful fetch */}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-white/25 uppercase tracking-wider mb-1">Response Code</p>
                  <p className="text-sm font-semibold text-amber-400">
                    {profileMeta?.status_code} {/* BUG #F4 — 432 shown despite successful response */}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-white/25 uppercase tracking-wider mb-1">Login Counter</p>
                  <p className="text-sm font-semibold text-white/70">{profileMeta?.last_login_count}</p>
                </div>
              </div>

              {/* Static success banner — BUG #F4: always says success regardless of actual state */}
              <div className="mt-6 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <p className="text-sm text-amber-400/80">Profile loaded successfully.</p>
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