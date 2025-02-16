import { useNavigate } from "react-router-dom";

function HostDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
      <h1 className="text-4xl font-bold mb-4">Host Dashboard</h1>
      <p className="text-lg text-gray-300 mb-6">
        Manage your events and track their performance!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/create-event")}
          className="px-8 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
        >
          Create Event
        </button>
        <button
          onClick={() => navigate("/manage-events")}
          className="px-8 py-4 bg-gradient-to-r from-[#e32eff] to-[#ec008c] text-white font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
        >
          Manage Events
        </button>
        <button
          onClick={() => navigate("/event-analytics")}
          className="px-8 py-4 bg-gradient-to-r from-[#882eff] to-[#ec008c] text-white font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
        >
          View Analytics
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default HostDashboard;
