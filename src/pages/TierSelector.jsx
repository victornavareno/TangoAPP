import React from 'react';
import { CheckCircle, Star, Crown, ArrowRight } from 'lucide-react';
import Header from '../components/Header'; // Asumiendo que quieres mantener el header

const tiers = [
    {
        name: 'Básico',
        price: 'Gratis',
        priceDetails: 'para siempre',
        description: 'La puerta de entrada para que tu negocio empiece a conectar con la comunidad de Cáceres.',
        features: [
            'Perfil de negocio verificado',
            '2 eventos al mes',
            'Elegible para sistema de recompensas',
        ],
        buttonText: 'Empezar Gratis',
        styles: {
            bg: 'bg-gray-800/50',
            border: 'border-gray-700',
            button: 'bg-white/10 text-white hover:bg-white/20',
            iconColor: 'text-gray-400'
        }
    },
    {
        name: 'Pulse',
        price: '29€',
        priceDetails: '/mes',
        description: 'Aumenta tu visibilidad y atrae más clientes de forma proactiva con nuestras herramientas de crecimiento.',
        features: [
            'Todo lo del plan Básico',
            '10 eventos al mes',
            '1 Evento Destacado por semana',
            'Panel de analíticas básicas',
        ],
        buttonText: 'Elegir Pulse',
        isPopular: true,
        styles: {
            bg: 'bg-gradient-to-b from-[#1a1a3a] to-[#2a1a4a]',
            border: 'border-purple-500',
            button: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90',
            iconColor: 'text-purple-400'
        }
    },
    {
        name: 'Partner',
        price: '79€',
        priceDetails: '/mes',
        description: 'La solución definitiva para convertir Keda! en tu principal canal de marketing y fidelización.',
        features: [
            'Todo lo del plan Pulse',
            'Eventos ilimitados',
            'Múltiples Eventos Destacados',
            'Notificaciones Push Dirigidas',
            'Panel de analíticas avanzadas',
        ],
        buttonText: 'Contactar',
        styles: {
            bg: 'bg-yellow-900/20',
            border: 'border-yellow-500',
            button: 'bg-yellow-500 text-black hover:bg-yellow-400',
            iconColor: 'text-yellow-400'
        }
    }
];

const TierCard = ({ tier }) => (
    <div className={`relative flex flex-col h-full p-8 rounded-2xl border ${tier.styles.border} ${tier.styles.bg} shadow-lg`}>
        {tier.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    MÁS POPULAR
                </span>
            </div>
        )}
        <div className="flex-grow">
            <div className='flex items-center gap-3 mb-2'>
                {tier.name === 'Partner' ? <Crown className={tier.styles.iconColor} /> : tier.name === 'Pulse' ? <Star className={tier.styles.iconColor} /> : <CheckCircle className={tier.styles.iconColor} />}
                <h3 className="text-2xl font-bold">{tier.name}</h3>
            </div>
            <p className="text-gray-400 mb-6 min-h-[60px]">{tier.description}</p>
            
            <div className="mb-8">
                <span className="text-5xl font-extrabold">{tier.price}</span>
                <span className="text-gray-400">{tier.priceDetails}</span>
            </div>

            <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${tier.styles.iconColor}`} />
                        <span className='text-gray-300'>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="mt-10">
            <button className={`w-full py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${tier.styles.button}`}>
                {tier.buttonText} <ArrowRight size={18}/>
            </button>
        </div>
    </div>
);

function TierSelector() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
            <Header />
            <div className="container mx-auto px-6 py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Planes pensados para <span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>ti</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Elige el nivel que mejor se adapta a tu negocio y empieza a conectar con miles de usuarios en Cáceres.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map(tier => (
                        <TierCard key={tier.name} tier={tier} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TierSelector;
