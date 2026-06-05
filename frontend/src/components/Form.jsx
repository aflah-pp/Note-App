import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/Constants";
import { useState, useEffect } from "react";

function Form({ route, method }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Live validation function
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (!value.trim()) {
          return "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email address";
        }
        return "";

      case "username":
        if (!value.trim()) {
          return "Username is required";
        } else if (value.length < 4) {
          return "Username must be at least 4 characters";
        }
        return "";

      case "password":
        if (method === "register" && value.length > 0 && value.length < 6) {
          return "Password must be at least 6 characters";
        }
        return "";

      case "confirmPassword":
        if (method === "register" && value !== password) {
          return "Passwords do not match";
        }
        return "";

      default:
        return "";
    }
  };

  // Live validation on input change
  useEffect(() => {
    const newErrors = { ...errors };

    if (method === "register") {
      if (touched.email) {
        const emailError = validateField("email", email);
        if (emailError) newErrors.email = emailError;
        else delete newErrors.email;
      }

      if (touched.username) {
        const usernameError = validateField("username", username);
        if (usernameError) newErrors.username = usernameError;
        else delete newErrors.username;
      }

      if (touched.password) {
        const passwordError = validateField("password", password);
        if (passwordError) newErrors.password = passwordError;
        else delete newErrors.password;
      }

      if (touched.confirmPassword) {
        const confirmError = validateField("confirmPassword", confirmPassword);
        if (confirmError) newErrors.confirmPassword = confirmError;
        else delete newErrors.confirmPassword;
      }
    } else {
      if (touched.username) {
        const usernameError = validateField("username", username);
        if (usernameError) newErrors.username = usernameError;
        else delete newErrors.username;
      }
    }

    setErrors(newErrors);
  }, [username, password, email, confirmPassword, touched, method]);

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const validateRegister = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    if (method === "register") {
      setTouched({
        email: true,
        username: true,
        password: true,
        confirmPassword: true,
      });
    } else {
      setTouched({ username: true });
    }

    setLoading(true);
    setErrorMessage("");

    try {
      if (method === "register") {
        const valid = validateRegister();

        if (!valid) {
          setLoading(false);
          return;
        }
      }

      const payload =
        method === "login"
          ? {
              username,
              password,
            }
          : {
              username,
              password,
              email,
              first_name: firstName,
              last_name: lastName,
            };

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.detail || "An error occurred, please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-normal text-gray-900">{name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {method === "login" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {method === "register" && (
          <div className="mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Email address"
                className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-sky-500 ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              placeholder="Username"
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-sky-500 ${
                errors.username && touched.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.username && touched.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="Password"
              className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-sky-500 ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {method === "register" && (
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Confirm password"
                className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-sky-500 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="p-2 text-sm text-center text-red-600 rounded bg-red-50">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-sm font-medium text-white transition-colors rounded shadow-sm bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : (
              name
            )}
          </button>

          <div className="pt-2 text-center">
            <p className="text-sm text-gray-500">
              {method === "login" ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Login
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
