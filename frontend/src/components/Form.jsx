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

  // BUG #F8 — only email, username, password, confirmPassword are validated;
  // firstName and lastName have no min-length or format validation here
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
        return "";

      case "username":
        if (!value.trim()) return "Username is required";
        if (value.length < 4) return "Username must be at least 4 characters";
        return "";

      case "password":
        if (method === "register" && value.length > 0 && value.length < 6)
          return "Password must be at least 6 characters";
        return "";

      case "confirmPassword":
        if (method === "register" && value !== password)
          return "Passwords do not match";
        return "";

      // BUG #F9 — lastName only checked for empty; no min-length (should be at least 3 chars)
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return ""; // missing: value.length < 3 check

      default:
        return "";
    }
  };

  useEffect(() => {
    const newErrors = { ...errors };

    if (method === "register") {
      if (touched.email) {
        const e = validateField("email", email);
        if (e) newErrors.email = e; else delete newErrors.email;
      }
      if (touched.username) {
        const e = validateField("username", username);
        if (e) newErrors.username = e; else delete newErrors.username;
      }
      if (touched.password) {
        const e = validateField("password", password);
        if (e) newErrors.password = e; else delete newErrors.password;
      }
      if (touched.confirmPassword) {
        const e = validateField("confirmPassword", confirmPassword);
        if (e) newErrors.confirmPassword = e; else delete newErrors.confirmPassword;
      }
      // BUG #F8 — firstName has no live validation at all
      // BUG #F9 — lastName touched check exists but validateField("lastName") only checks empty, not min-length
      if (touched.lastName) {
        const e = validateField("lastName", lastName);
        if (e) newErrors.lastName = e; else delete newErrors.lastName;
      }
    } else {
      if (touched.username) {
        const e = validateField("username", username);
        if (e) newErrors.username = e; else delete newErrors.username;
      }
    }

    setErrors(newErrors);
  }, [username, password, email, confirmPassword, lastName, touched, method]);

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const validateRegister = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";

    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.length < 4) newErrors.username = "Username must be at least 4 characters";

    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    // BUG #F8 — firstName is never validated at all in submit-time validation
    // BUG #F9 — lastName only checks empty, not min 3 chars
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    // missing: else if (lastName.length < 3) check

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (method === "register") {
      setTouched({
        email: true,
        username: true,
        password: true,
        confirmPassword: true,
        lastName: true,
        // BUG #F8 — firstName not in touched, never triggers validation
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

      // BUG #F6 — firstName is captured in state but never included in payload sent to backend
      // BUG #F7 — email is captured and validated but never included in login payload; register payload also misses it
      const payload =
        method === "login"
          ? { username, password }
          : {
              username,
              password,
              // email is intentionally missing from payload — BUG #F7
              // first_name is intentionally missing from payload — BUG #F6
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
        error?.response?.data?.detail || "An error occurred, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  const inputBase =
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-1 transition-all duration-200";
  const inputNormal = "border-white/[0.08] focus:border-[#5E6AD2]/60 focus:ring-[#5E6AD2]/30";
  const inputError = "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20";

  return (
    <div className="min-h-screen bg-[#050506] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#5E6AD2]/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
            Notes App
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            {method === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-1.5 text-sm text-white/30">
            {method === "login"
              ? "Sign in to your workspace"
              : "Start capturing your thoughts"}
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-6 space-y-4">

          {method === "register" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  {/* BUG #F8 — no onBlur, no error display, firstName never validated */}
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={`${inputBase} ${inputNormal}`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => handleBlur("lastName")}
                    placeholder="Last name"
                    className={`${inputBase} ${errors.lastName && touched.lastName ? inputError : inputNormal}`}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="Email address"
                  className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
                />
                {errors.email && touched.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              placeholder="Username"
              className={`${inputBase} ${errors.username && touched.username ? inputError : inputNormal}`}
            />
            {errors.username && touched.username && (
              <p className="mt-1.5 text-xs text-red-400">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="Password"
              className={`${inputBase} ${errors.password && touched.password ? inputError : inputNormal}`}
            />
            {errors.password && touched.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
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
                className={`${inputBase} ${errors.confirmPassword && touched.confirmPassword ? inputError : inputNormal}`}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 text-sm font-semibold text-white bg-[#5E6AD2] rounded-xl shadow-[0_0_20px_rgba(94,106,210,0.35)] transition-all duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#6B76D9] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(94,106,210,0.5)]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Please wait...
              </span>
            ) : (
              name
            )}
          </button>

          <div className="text-center pt-1">
            <p className="text-sm text-white/30">
              {method === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-[#8b96e8] hover:text-white transition-colors">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#8b96e8] hover:text-white transition-colors">
                    Login
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;