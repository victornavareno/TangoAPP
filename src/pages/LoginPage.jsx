import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // Update form state when inputs change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        console.log("User logged in:", data);

        // Redirect based on role
          // For now there are 2 roles, Event Creator "host" and Event Assistant (may call it "user")
          // A new "admin" role may be added for monitoring purposes
        if (data.role === "host") {
          navigate("/hostDashboard");
        } else {
          navigate("/subscriberDashboard"); // Adjust this screen
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1533] via-[#2d1b4e] to-[#1a1533] text-white flex flex-col items-center justify-center">
      {/* Reusable Header */}
      <Header />
      {/* Login Form */}
      <div className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white rounded-lg hover:bg-pink-400"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <span
              className="text-pink-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
