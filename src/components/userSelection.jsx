import { useNavigate } from "react-router-dom";

function UserSelection() {
  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Header with Logo */}
      <header className="absolute top-5 left-5">
        <img
          src="/logo_tango.png"
          alt="Tango logo"
          className="h-16 cursor-pointer"
          onClick={() => navigate("/")} // Navigate to the homepage
        />
      </header>

      {/* User Selection Content */}
      <div className="text-center px-6">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-500">
          ¿Cómo quieres usar Tango?
        </h1>
        <p className="text-gray-300 mb-10">
          Elige tu tipo de cuenta para empezar a vivir experiencias únicas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Option: Normal User */}
          <div
            onClick={() => navigate("/explorar-eventos")}
            className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              Soy Usuario
            </h2>
            <p className="text-gray-300">
              Encuentra y únete a eventos en tu ciudad. Conoce nuevas personas y
              vive momentos increíbles.
            </p>
            <button className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Explorar Eventos
            </button>
          </div>

          {/* Option: Local / Host */}
          <div
            onClick={() => navigate("/crear-evento")}
            className="bg-gray-800 rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              Soy Local / Restaurante
            </h2>
            <p className="text-gray-300">
              Organiza eventos únicos en tu bar o restaurante y conecta con
              nuevas personas.
            </p>
            <button className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Crear Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
