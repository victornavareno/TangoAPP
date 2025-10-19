import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("subscriber");

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    city: "Caceres",
    terms: false,
    address: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.username,
      email: form.email,
      password: form.password,
      role: role,
      city: form.city,
      ...(role === "host" && { address: form.address }),
    };

    try {
      // Register the user
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data);

        // Automatically log in after successful registration
        const loginResponse = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          // Store the token and role in localStorage
            //TODO refactor to make this safe - add Auth0
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("role", loginData.role);
          console.log("User logged in:", loginData);

          // Navigate to the correct dashboard based on role
          if (loginData.role === "host") {
            navigate("/hostDashboard");
          } else {
            navigate("/subscriberDashboard");
          }
        } else {
          alert(
            "Login failed after registration. Please try logging in manually."
          );
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1533] via-[#2d1b4e] to-[#1a1533] text-white flex flex-col items-center justify-center p-4">
      <Header />
      <main className="flex items-center justify-center w-full flex-grow px-4">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 max-w-5xl w-full">
          {/* --- Form Column --- */}
          <div className="bg-white/10 p-8 md:p-10 rounded-2xl shadow-2xl w-full lg:w-1/2 border border-white/10 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold">Registra tu Local</h1>
              <p className="text-white/70 mt-2">Crea tu perfil y empieza a crear Eventos.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                  {role === "host" ? "Nombre del Local" : "Nombre de Usuario"}
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder={role === "host" ? "Ej: La Taberna del Lúpulo" : "Ej: Alex García"}
                  value={form.username}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu.email@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Crea una contraseña segura"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">
                  Ciudad
                </label>
                <select
                  id="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                >
                  <option value="Caceres">Cáceres</option>
                  <option value="Badajoz">Badajoz</option>
                </select>
              </div>
              {role === "host" && (
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-2">
                    Dirección del Local
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Ej: Plaza Mayor, 10"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                  />
                </div>
              )}
              <div className="flex items-center pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded bg-white/10 border-white/30 text-[#ec008c] focus:ring-[#ec008c]"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-white/70">
                  Acepto los{" "}
                  <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="font-medium text-white hover:underline">
                    Términos y Condiciones
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 font-bold bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white rounded-lg transition-transform transform hover:scale-105"
              >
                Crear Cuenta {role === "host" ? "como Local" : "como Usuario"}
              </button>
            </form>

            <p className="text-white/60 text-center mt-8 text-sm">
              ¿Ya tienes cuenta?{" "}
              <span
                className="font-medium text-pink-400 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Inicia sesión
              </span>
            </p>
          </div>

          {/* --- Image Column --- */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <img
              src="/friends_bar.png"
              alt="Gente disfrutando en un bar"
              className="rounded-2xl shadow-2xl object-cover h-full w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
