import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Search, PartyPopper, Gift } from "lucide-react";

const HowItWorks = React.forwardRef((props, ref) => {
    const navigate = useNavigate();

    return (
        <div ref={ref} className="bg-[#0f0f1e] py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                    Vivir experiencias es así de <span className="bg-gradient-to-r from-[#e32eff] to-[#ec008c] bg-clip-text text-transparent">fácil</span>
                </h2>
                <p className="text-xl text-white mb-16 max-w-2xl mx-auto">
                    Hemos diseñado Keda! para que encontrar planes y gente nueva sea más intuitivo que nunca.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center">
                        <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#ec008c] to-[#e32eff] flex items-center justify-center">
                            <Search size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Explora y Elige</h3>
                        <p className="text-white">
                            Navega entre decenas de eventos únicos en tu ciudad, desde catas de vino a torneos de dardos.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center">
                        <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#ec008c] to-[#e32eff] flex items-center justify-center">
                            <PartyPopper size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Únete y Conoce Gente</h3>
                        <p className="text-white">
                            Apúntate con un solo clic y prepárate para compartir la experiencia con otras personas con tus mismos intereses.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center">
                        <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#ec008c] to-[#e32eff] flex items-center justify-center">
                            <Gift size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Gana Premios Exclusivos</h3>
                        <p className="text-white">
                            Al unirte a eventos de locales, giras una ruleta y ganas premios. ¡Tu QR es la llave para canjearlos!
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <button
                        className="px-16 py-5 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform"
                        onClick={() => navigate("/userSelection")}
                    >
                        ¡Empezar a disfrutar!
                    </button>
                </div>
            </div>
        </div>
    );
});


function Hero() {
    const navigate = useNavigate();
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const howItWorksRef = useRef(null);

    useEffect(() => {
        if (showHowItWorks && howItWorksRef.current) {
            howItWorksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showHowItWorks]);

    const handleLearnMoreClick = () => {
        setShowHowItWorks(true);
    };

    return (
        <div>
            <div
                className="relative min-h-screen bg-cover bg-center bg-fixed text-white flex flex-col"
                style={{ backgroundImage: "url('/city_background.png')" }}
            >
                <div className="absolute inset-0" />
                <div className="relative z-10">
                    <header className="container mx-auto px-6 py-8">
                        <div className="flex items-center">
                            <img src="/logo_keda_pink.png" alt="Keda logo" className="h-32 mt-6 mb-0 py-0" />
                        </div>
                    </header>

                    <main className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between mt-12 gap-8 lg:gap-16">
                        <div className="max-w-xl lg:max-w-xl">
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
                            <p className="text-2xl text-white mb-10">
                                <span className="font-normal">Únete a eventos y disfruta</span>
                                <br />
                                <span className="font-bold">experiencias</span> únicas en grupo
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <button
                                    onClick={handleLearnMoreClick}
                                    className="px-12 py-4 bg-white/10 text-white text-xl rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform"
                                >
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

                        <div className="relative flex-1 flex justify-center lg:justify-end">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ec008c] to-[#882eff] opacity-30 blur-2xl rounded-[32px] transform scale-105" />
                            <img
                                src="/friends_bar.png"
                                alt="Friends enjoying time together"
                                className="relative rounded-[32px] w-full h-auto object-cover lg:max-w-full"
                            />
                        </div>
                    </main>
                </div>
            </div>

            {showHowItWorks && <HowItWorks ref={howItWorksRef} />}
        </div>
    );
}

export default Hero;