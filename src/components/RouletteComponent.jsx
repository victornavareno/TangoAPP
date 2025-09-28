import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Confetti from 'react-confetti';

const prizeData = [
    { option: '1 Cerveza Gratis', style: { backgroundColor: '#e32eff', textColor: '#ffffff' } },
    { option: 'Tapa Gratis', style: { backgroundColor: '#ec008c', textColor: '#ffffff' } },
    { option: 'Sin premio 😔', style: { backgroundColor: '#4b5563', textColor: '#dddddd' } },
    { option: '50% Dto. Cóctel', style: { backgroundColor: '#882eff', textColor: '#ffffff' } },
    { option: 'Sin premio 😔', style: { backgroundColor: '#4b5563', textColor: '#dddddd' } },
    { option: 'Patatas Bravas', style: { backgroundColor: '#ec008c', textColor: '#ffffff' } },
];

const fetchPrizeFromBackend = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const winningPrize = prizeData[Math.floor(Math.random() * prizeData.length)];
            resolve({ prize: winningPrize });
        }, 1500);
    });
};

const RouletteComponent = ({ isOpen, onClose, onJoinSuccess }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [prizeResult, setPrizeResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setMustSpin(false);
                setPrizeResult(null);
                setShowResult(false);
                setShowConfetti(false); // Reseteamos el confeti
            }, 500);
        }
    }, [isOpen]);

    const handleSpinClick = async () => {
        if (!mustSpin) {
            const { prize } = await fetchPrizeFromBackend();
            const newPrizeNumber = prizeData.findIndex(p => p.option === prize.option);
            setPrizeNumber(newPrizeNumber);
            setPrizeResult({ name: prize.option });
            setMustSpin(true);
        }
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        setShowResult(true);
        // --- WE ACTIVATE CONFETTI ONLY IF THERE IS A PRIZE OF COURSEEE ---
        if (prizeResult && !prizeResult.name.toLowerCase().includes('sin premio')) {
            setShowConfetti(true);
        }
    };

    const handleCloseAndNotify = () => {
        if (onJoinSuccess) onJoinSuccess();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            {showConfetti && <Confetti numberOfPieces={200} recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}

            <div className="bg-[#1a1a2e] p-8 rounded-2xl shadow-2xl text-white max-w-md w-full text-center border border-white/10 relative overflow-hidden">
                {/* LIL BRILLI BRILLI HERE */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>

                {showResult && prizeResult ? (
                    <div className="animate-fade-in z-10 relative">
                        {prizeResult.name.toLowerCase().includes('sin premio') ? (
                            <>
                                <h2 className="text-4xl font-bold text-gray-400 mb-4">¡Otra vez será!</h2>
                                <p className="text-gray-300 text-lg mb-8">
                                    No te preocupes, ¡lo importante es participar y disfrutar del evento!
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#e32eff] to-[#ec008c] bg-clip-text text-transparent mb-2">
                                    ¡ENHORABUENA!
                                </h2>
                                <p className="text-white text-lg mb-4">Has ganado:</p>
                                <div className="my-6 p-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg inline-block">
                                    <p className="text-4xl font-extrabold bg-[#1a1a2e] px-6 py-3 rounded-md">
                                        {prizeResult.name}
                                    </p>
                                </div>
                                <p className="text-gray-400 text-sm mt-4">
                                    Muestra esta pantalla en el local para canjear tu premio.
                                </p>

                                {/* --- QR Mockup  --- */}
                                <div className="mt-6 flex justify-center">
                                    <img
                                        src="/qr_mockup.png"  // <-- tu QR aquí
                                        alt="QR para canjear premio"
                                        className="w-40 h-40 rounded-lg shadow-lg border border-white/10"
                                    />
                                </div>
                            </>
                        )}
                        <button onClick={handleCloseAndNotify} className="mt-8 w-full px-8 py-3 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            ¡Genial!
                        </button>
                    </div>
                ) : (
                    <div className="z-10 relative">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">¡Confirma y Gana!</h2>
                        <p className="text-gray-300 mb-8">Gira la ruleta al unirte y consigue un premio.</p>
                        <div className="mb-8 relative flex items-center justify-center">
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={prizeNumber}
                                data={prizeData}
                                onStopSpinning={handleStopSpinning}
                                spinDuration={0.2}
                                disableInitialAnimation={false}
                                perpendicularText={true}
                                fontSize={16}
                                fontWeight={600}
                                radiusLineWidth={2}
                                outerBorderWidth={8}
                                backgroundColors={['#2f2f4a', '#1a1a2e']}
                                textColors={['#ffffff']}
                                outerBorderColor={'#ffffff20'}
                                innerBorderColor={'#ffffff20'}
                                innerRadius={40}
                                innerBorderWidth={15}
                                radiusLineColor={'#ffffff20'}
                                pointerProps={{
                                    style: { filter: "brightness(10)" } // pointer blanco
                                }}
                            />

                            {/*  LOGO CENTER ROULETTE  */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl border-4 border-purple-400">
                                    <img
                                        src="/logo_keda_pink.png"
                                        alt="Logo_KEDA"
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                            </div>

                            {/* ANIMATED EXTERIOR CIRCLE */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[112%] h-[112%] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-xl opacity-70 animate-pulse"></div>
                            </div>
                        </div>
                        <button onClick={handleSpinClick} disabled={mustSpin} className="w-full px-12 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                            {mustSpin ? 'Girando...' : 'Girar y Unirme'}
                        </button>
                        <button onClick={onClose} disabled={mustSpin} className="mt-4 w-full text-gray-400 py-2 transition-colors hover:text-white disabled:opacity-50">
                            Ahora no
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouletteComponent;