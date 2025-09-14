import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        // The main container div is updated here
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed text-white"
            style={{ backgroundImage: "url('/city_background.png')" }}
        >
            <div className="absolute inset-0" />
            {/* This div creates the dark overlay for better text readability */}
            {/*<div className="absolute inset-0 bg-black/70" /> */}

            {/* Your content needs a z-index to be on top of the overlay */}
            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-6 py-8">
                    <div className="flex items-center">
                        <img src="/logo_keda_pink.png" alt="Tango logo" className="h-32 mt-6 mb-0 py-0" />
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between mt-12 gap-8">
                    {/* Left Column */}
                    <div className="max-w-2xl">
                        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6">
              <span className="inline-block">
                Encuentra{" "}
                  <span className="bg-gradient-to-r from-[#e32eff] to-[#ec008c] bg-clip-text text-transparent">
                  amigos
                </span>
              </span>
                            <br />
                            <span className="inline-block">en Cáceres!</span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-10">
                            <span className="font-normal">Únete a eventos y disfruta</span>
                            <br />
                            <span className="font-bold">experiencias</span> únicas en grupo
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-12 py-4 bg-white/10 text-white text-xl rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform">
                                Saber más
                            </button>
                            <button
                                className="px-12 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform"
                                onClick={() => navigate("/userSelection")}
                            >
                                Prueba Keda!
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative -ml-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ec008c] to-[#882eff] opacity-30 blur-2xl rounded-[32px]" />
                        <img
                            src="/friends_bar.png"
                            alt="Friends enjoying time together"
                            className="relative rounded-[32px] max-w-[600px] w-full object-cover"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Hero;