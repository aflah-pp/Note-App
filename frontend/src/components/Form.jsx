import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/Constants";
import { useState } from "react";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrorMessage(""); 
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
        alert(error)
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          {name}
        </h1>

        {/* Username Input */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            "Submit"
          )}
        </button>

        {/* Conditional Text */}
        <p className="text-center text-sm text-gray-500">
          {method === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default Form;
