import { useState, useEffect } from "react";
import api from "../api/axios";
import Note from "../components/Notes";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const showModal = ({ title, statusCode, message, responseData, type }) => {
    setModalData({ title, statusCode, message, responseData, type });
    setModalOpen(true);
  };

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
    } catch (err) {
      showModal({
        title: "Failed to Fetch Notes",
        statusCode: err.response?.status || 500,
        message: err.response?.data?.detail || "Unable to load notes.",
        responseData: err.response?.data,
        type: "error",
      });
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/notes/", { title, content });
      if (res.status === 201) {
        setTitle("");
        setContent("");
        await getNotes();
        showModal({
          title: "Note Created",
          statusCode: res.status,
          message: "Note created successfully.",
          responseData: res.data,
          type: "success",
        });
      }
    } catch (err) {
      showModal({
        title: "Create Note Response",
        statusCode: err.response?.status || 500,
        message:
          err.response?.data?.detail ||
          "Request completed with an unexpected response.",
        responseData: err.response?.data,
        type: "error",
      });
      await getNotes();
    } finally {
      setLoading(true); // BUG #F2 — should be setLoading(false); button permanently disabled after first submit
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}`);
      showModal({
        title: "Delete Response",
        statusCode: res.status,
        message: "Delete request completed.",
        responseData: res.data,
        type: "success",
      });
      await getNotes();
    } catch (err) {
      showModal({
        title: "Delete Failed",
        statusCode: err.response?.status || 500,
        message: err.response?.data?.detail || "Failed to delete note.",
        responseData: err.response?.data,
        type: "error",
      });
      await getNotes();
    }
  };

  const handleLogout = () => {
    navigate("/logout"); // BUG #F5 — no token clearance, /logout route does not exist
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white font-sans relative overflow-x-hidden">

      {/* Ambient background blobs */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Hero Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
              Workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              My Notes
            </h1>
            <p className="mt-1 text-sm text-white/40">Capture thoughts. Build clarity.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </div>

            <button
              onClick={() => navigate("/user")}
              className="px-4 py-2 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-[#5E6AD2] rounded-lg hover:bg-[#6B76D9] shadow-[0_0_20px_rgba(94,106,210,0.3)] hover:shadow-[0_0_28px_rgba(94,106,210,0.45)] transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Create Note Card */}
        <section className="mb-10">
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="px-6 pt-5 pb-1 border-b border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">New Note</h2>
            </div>
            <form onSubmit={createNote} className="p-6 space-y-4">
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#5E6AD2]/60 focus:ring-1 focus:ring-[#5E6AD2]/30 transition-all duration-200"
              />
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="What's on your mind..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#5E6AD2]/60 focus:ring-1 focus:ring-[#5E6AD2]/30 transition-all duration-200 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2.5 text-sm font-semibold text-white bg-[#5E6AD2] rounded-xl hover:bg-[#6B76D9] shadow-[0_0_20px_rgba(94,106,210,0.35)] transition-all duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(94,106,210,0.5)]"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Notes Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white/80">All Notes</h2>
            <span className="text-xs text-white/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              {notes.length} total
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-2xl bg-white/[0.02] border border-white/[0.06] border-dashed">
              <div className="w-14 h-14 mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white/30 text-sm font-medium mb-1">No notes yet</p>
              <p className="text-white/15 text-xs">Create your first note above to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <Note key={note.id} note={note} onDelete={deleteNote} />
              ))}
            </div>
          )}
        </section>
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
    </div>
  );
}

export default Home;