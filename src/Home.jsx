function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-purple-900 text-white flex flex-col items-center">
      {/* Header */}
      {/* <header className="w-full max-w-5xl flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <img src="/logo_tango.png" alt="Tango logo" className="h-20" />
        </div>
      </header> */}

      {/* Main Content */}
      <main className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mt-10 px-5">
        {/* Text Section */}
        <div className="text-center md:text-left space-y-6 max-w-lg">
          <h1 className="text-6xl md:text-6xl font-bold leading-tight">
            Encuentra <span className="text-purple-500">amigos</span> en tu
            ciudad!
          </h1>
          <p className="text-3xl text-gray-300">
            Únete a eventos y disfruta experiencias únicas en grupo.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="px-12 py-4 bg-gray-600 text-white text-xl rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform">
              Saber más
            </button>
            <button
              className="px-12 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform"
              onClick={() => (window.location.href = "/login")}
            >
              Prueba Tango!
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="ml-20 mt-10 md:mt-0">
          <img
            src="/friends1.png"
            alt="Friends"
            className="rounded-3xl"
            style={{
              boxShadow:
                "-5px 20px 85px rgba(200, 0, 140, 0.5), -5px 20px 45px rgba(147, 64, 255, 0.5)",
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
