import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GOOGLE_CLIENT_ID =
//   "546746297206-rt5ie770a29noedr9l7210nknrr5pqqh.apps.googleusercontent.com";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // HANDLE INPUT
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // NORMAL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", data.role);

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 800);
      } else if (data.requires_otp) {
        toast.info("OTP required. Please verify.");
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        toast.error(data.error || data.detail || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Server connection error");
    }

    setLoading(false);
  };

  return (
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-1">Login</h2>
        <p className="text-center text-gray-500 mb-4">Access your account</p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F2A44] text-white py-2 rounded-lg hover:bg-[#14385C] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* GOOGLE LOGIN - Commented for now */}
        {/*
        <div className="mt-4 text-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
        */}

        {/* REGISTER */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <a
            href="/register"
            className="text-[#1F7A63] font-semibold hover:underline ml-1"
          >
            Register
          </a>
        </p>
      </div>
    </div>
    // </GoogleOAuthProvider>
  );
};

export default LoginForm;
