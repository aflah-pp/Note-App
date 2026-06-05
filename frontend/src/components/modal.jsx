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

  const statusStyles = {
    success: {
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    error: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-700",
    },
    warning: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    info: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
  };

  const style = statusStyles[type] || statusStyles.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl">
        <div
          className={`flex items-center justify-between border-l-4 ${style.border} p-4`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="p-1 text-gray-500 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className={`rounded-lg p-3 ${style.bg}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Status Code</span>

              <span className={`rounded px-3 py-1 font-bold ${style.text}`}>
                {statusCode}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Message</h4>

            <div className="p-3 border rounded-lg bg-gray-50">
              {message || "No message received"}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Response Data</h4>

            <pre className="p-4 overflow-auto text-sm text-green-400 bg-gray-900 rounded-lg max-h-64">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
