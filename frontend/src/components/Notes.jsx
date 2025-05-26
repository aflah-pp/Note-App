import React from "react";

function Notes({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
      <p className="text-gray-700 mt-1">{note.content}</p>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>{formattedDate}</span>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notes;
