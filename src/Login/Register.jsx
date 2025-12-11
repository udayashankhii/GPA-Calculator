import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    college_name: "",
    faculty: "",
    program: "",
    semester: "",
    role: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");

      toast.success("OTP sent to your email ✅");
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0F2A44] mb-6">
          Create PU CGPA Calculator Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          {["username", "email", "phone_number"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1F7A63]"
            />
          ))}

          {/* College Dropdown */}
          <select
            name="college_name"
            value={formData.college_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#1F7A63]"
          >
            <option value="">Select College</option>
            <option value="NCIT">NCIT</option>
            <option value="Everest Engineering College">Everest Engineering College</option>
            <option value="Cosmos College">Cosmos College</option>
            <option value="GBS">GBS</option>
            <option value="PU Central">PU Central</option>
          </select>

          {/* Faculty */}
          <input
            name="faculty"
            placeholder="FACULTY"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1F7A63]"
          />

          {/* Program Dropdown */}
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#1F7A63]"
          >
            <option value="">Select Program</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="IT Engineering">IT Engineering</option>
          </select>

          {/* Semester Dropdown (1 → 8) */}
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#1F7A63]"
          >
            <option value="">Select Semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                {i + 1} Semester
              </option>
            ))}
          </select>

          {/* Password Fields */}
          {["password", "confirm_password"].map((field) => (
            <input
              key={field}
              type="password"
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1F7A63]"
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#1F7A63] text-white font-semibold hover:bg-[#1A5F4E] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
