import { useNavigate } from "react-router-dom";

function HostDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Host Dashboard</h1>
      <p className="text-lg text-gray-300 mb-6">
        Manage your events and settings here!
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default HostDashboard;
