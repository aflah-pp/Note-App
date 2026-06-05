import React from "react";

function Notes({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="p-5 mb-4 transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{note.title}</h3>

        <p className="leading-relaxed text-gray-600">{note.content}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-5 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Created On</span>
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-wide text-blue-500 uppercase">
            Created By
          </span>
          <span className="text-base font-semibold text-blue-700">
            {note.created_by}
          </span>
        </div>

        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 border border-red-200 rounded-lg transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notes;
