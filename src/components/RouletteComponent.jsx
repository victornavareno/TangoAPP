import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

const prizeData = [
    { option: '1 Cerveza Gratis', style: { backgroundColor: '#e32eff', textColor: 'white' } },
    { option: 'Tapa Gratis', style: { backgroundColor: '#ec008c', textColor: 'white' } },
    { option: 'Sin premio 😔', style: { backgroundColor: '#4b5563', textColor: 'white' } },
    { option: '50% Dto. Cóctel', style: { backgroundColor: '#882eff', textColor: 'white' } },
    { option: 'Sin premio 😔', style: { backgroundColor: '#4b5563', textColor: 'white' } },
    { option: 'Patatas Bravas', style: { backgroundColor: '#ec008c', textColor: 'white' } },
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

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setMustSpin(false);
                setPrizeResult(null);
                setShowResult(false);
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
    };

    const handleCloseAndNotify = () => {
        if (onJoinSuccess) {
            onJoinSuccess();
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a2e] p-8 rounded-2xl shadow-2xl text-white max-w-md w-full text-center border border-white/10">
                {showResult && prizeResult ? (
                    <div>
                        {prizeResult.name.toLowerCase().includes('sin premio') ? (
                            <>
                                <h2 className="text-4xl font-bold text-gray-400 mb-4">¡Otra vez será!</h2>
                                <p className="text-gray-300 text-lg mb-8">No te preocupes, ¡lo importante es participar y disfrutar del evento!</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#e32eff] to-[#ec008c] bg-clip-text text-transparent mb-2">¡ENHORABUENA!</h2>
                                <p className="text-white text-lg mb-4">Has ganado:</p>
                                <p className="text-4xl font-extrabold mb-6">{prizeResult.name}</p>

                                {/* --- AQUÍ ESTÁ EL CUADRADO BLANCO --- */}
                                <div className="inline-block p-4 mb-6">
                                    <div className="w-40 h-40 bg-white rounded-lg"></div>
                                </div>

                                <p className="text-gray-400 text-sm">Muestra esta pantalla en el local para canjear tu premio.</p>
                            </>
                        )}
                        <button onClick={handleCloseAndNotify} className="mt-8 w-full px-8 py-3 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            ¡Genial!
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">¡Confirma y Gana!</h2>
                        <p className="text-gray-300 mb-8">Gira la ruleta al unirte y consigue un premio.</p>
                        <div className="mb-8 relative flex items-center justify-center">
                            <div className="absolute -top-3 z-10" style={{ left: 'calc(50% - 15px)'}}>
                                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-t-[25px] border-t-white border-r-[15px] border-r-transparent"></div>
                            </div>
                            <Wheel mustStartSpinning={mustSpin} prizeNumber={prizeNumber} data={prizeData} onStopSpinning={handleStopSpinning} backgroundColors={['#2f2f4a', '#1a1a2e']} textColors={['#ffffff']} outerBorderColor={'#ffffff30'} outerBorderWidth={5} innerBorderColor={'#ffffff30'} innerRadius={20} innerBorderWidth={10} radiusLineColor={'#ffffff30'} radiusLineWidth={2} fontSize={14} textDistance={75} />
                        </div>
                        <button onClick={handleSpinClick} disabled={mustSpin} className="w-full px-12 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                            {mustSpin ? 'Girando...' : 'Girar y Unirme'}
                        </button>
                        <button onClick={onClose} disabled={mustSpin} className="mt-4 w-full text-gray-400 py-2 transition-colors hover:text-white disabled:opacity-50">
                            Ahora no
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RouletteComponent;