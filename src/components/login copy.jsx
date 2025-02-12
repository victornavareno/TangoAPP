import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function Login() {
  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <header className="p-14">
        <div className="space-x-3">
          <img
            src="/logo_tango.png"
            alt="Saturn logo"
            className="h-24 cursor-pointer" // Make the logo clickable
            onClick={() => navigate("/")} // Navigate to home when clicked
          />
        </div>
      </header>

      <div
        className="bg-gray-800 p-10 rounded-lg shadow-lg"
        style={{ width: "400px", maxWidth: "90%", padding: "2rem" }}
      >
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-xl rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
