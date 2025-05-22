import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-purple-200 p-6">
      <h1 className="text-7xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. Please go back to login or register a new account.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go to Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300"
        >
          Register
        </Link>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
