import { useState, useEffect } from "react";
import api from "../api/axios";
import Note from "../components/Notes";
import { useNavigate } from "react-router-dom";


function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      alert("Failed to fetch notes.");
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
        alert("Note created!");
      }
    } catch (err) {
      console.error("Failed to create note:", err);
      alert("Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}`);
      if (res.status === 204) {
        alert("Note deleted!");
        await getNotes();
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
      alert("Failed to delete note.");
    }
  };
 

  const navigate = useNavigate()


  const handleLogout = () => {
    navigate("/logout")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
  <button
  onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
  >
    Logout
  </button>
</div>

      {/* Create Note Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Note</h2>
        <form
          onSubmit={createNote}
          className="bg-white shadow-md p-6 rounded-lg space-y-4"
        >
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Content</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>

      {/* Notes List Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes found.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Note key={note.id} note={note} onDelete={deleteNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;