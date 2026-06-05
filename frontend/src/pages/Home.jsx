import { useState, useEffect } from "react";
import api from "../api/axios";
import Note from "../components/Notes";
import Modal from "../components/Modal";
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
    setModalData({
      title,
      statusCode,
      message,
      responseData,
      type,
    });

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
      const res = await api.post("/api/notes/", {
        title,
        content,
      });

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
      setLoading(true);
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
    navigate("/logout");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <div className="flex justify-end gap-5">
        <button
          onClick={() => {
            navigate("/user");
          }}
          className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Create a Note</h2>

        <form
          onSubmit={createNote}
          className="p-6 space-y-4 bg-white rounded-lg shadow-md"
        >
          <div>
            <label className="block mb-1 text-gray-600">Title</label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Content</label>

            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Notes</h2>

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
