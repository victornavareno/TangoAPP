"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowLeft, User } from "lucide-react";
import Header from "../components/Header";
import RouletteComponent  from "../components/RouletteComponent";

// MOCKED DATA
const mockedEvents = [
    {
        id_event: 1,
        name: "Noche de Dardos en Bar Mistura",
        description: "¡Ven a demostrar tu puntería! Torneo de dardos con premios para los ganadores. Cerveza artesanal de barril toda la noche. Un ambiente relajado para conocer gente nueva y pasar un buen rato.",
        date: "2025-10-04",
        time: "21:00",
        city: "Cáceres",
        locationName: "Bar Mistura",
        max_capacity: 30,
        imageUrl: "/event1.png",
        organizer: "Bar Mistura",
        subscribers: [ {id: 1, name: "Lucía"}, {id: 2, name: "Javier"}, {id: 3, name: "Sofía"}, {id: 4, name: "Marcos"} ]
    },
    {
        id_event: 2,
        name: "Juegos de Mesa con Carlos",
        description: "Tarde relajada de juegos de mesa en la Plaza Mayor. Trae tu juego favorito o únete a una partida de Catan, Carcassonne o lo que surja. ¡Para todos los niveles!",
        date: "2025-09-27",
        time: "18:00",
        city: "Cáceres",
        locationName: "Plaza Mayor",
        max_capacity: 20,
        imageUrl: "/event2.png",
        organizer: "Carlos R.",
        subscribers: [ {id: 5, name: "Pedro"}, {id: 6, name: "Elena"}, {id: 7, name: "Ana"} ]
    },
    {
        id_event: 3,
        name: "Concierto Acústico: Ana en Vivo",
        description: "Disfruta de una noche íntima con la música en directo de Ana, versionando clásicos del pop-rock español. Ambiente acogedor y buenos cócteles.",
        date: "2025-10-10",
        time: "22:30",
        city: "Cáceres",
        locationName: "La Taberna del Fuego",
        max_capacity: 50,
        imageUrl: "/event3.png",
        organizer: "La Taberna del Fuego",
        subscribers: [ {id: 8, name: "David"}, {id: 9, name: "Laura"}, {id: 10, name: "Sergio"} ]
    },
    {
        id_event: 4,
        name: "Trivial Friki Semanal",
        description: "¿Eres el que más sabe de Marvel, Star Wars o El Señor de los Anillos? Demuéstralo en nuestro Trivial Friki. Equipos de hasta 4 personas.",
        date: "2025-09-25",
        time: "20:00",
        city: "Cáceres",
        locationName: "El Gato Negro",
        max_capacity: 40,
        imageUrl: "/event4.png",
        organizer: "El Gato Negro",
        subscribers: [ {id: 11, name: "Isabel"}, {id: 12, name: "Pablo"} ]
    },
    {
        id_event: 5,
        name: "Intercambio de Idiomas",
        description: "Practica inglés, francés, alemán o cualquier idioma que quieras enseñar o aprender. Un evento social para conocer gente nueva de todo el mundo.",
        date: "2025-09-29",
        time: "19:00",
        city: "Cáceres",
        locationName: "Café Lisboa",
        max_capacity: 25,
        imageUrl: "/event5.png",
        organizer: "Café Lisboa",
        subscribers: [ {id: 13, name: "John"}, {id: 14, name: "Marie"}, {id: 15, name: "Klaus"} ]
    },
    {
        id_event: 6,
        name: "Jam Session de Jazz",
        description: "Noche de improvisación musical. Tráete tu instrumento y únete a la banda o simplemente ven a disfrutar del mejor jazz en directo en un patio con historia.",
        date: "2025-10-02",
        time: "21:30",
        city: "Cáceres",
        locationName: "El Corral de las Cigüeñas",
        max_capacity: 60,
        imageUrl: "/event6.png",
        organizer: "El Corral de las Cigüeñas",
        subscribers: [ {id: 16, name: "Miguel"}, {id: 17, name: "Carmen"} ]
    },
    {
        id_event: 7,
        name: "Quedada Fotográfica por el Casco Antiguo",
        description: "Únete a nuestro grupo para capturar la magia de la parte antigua de Cáceres al atardecer. No importa si usas una réflex o el móvil, ¡lo importante es la creatividad!",
        date: "2025-10-05",
        time: "18:30",
        city: "Cáceres",
        locationName: "Arco de la Estrella",
        max_capacity: 15,
        imageUrl: "/event1.png",
        organizer: "Cristina F.",
        subscribers: [ {id: 18, name: "Raquel"}, {id: 19, name: "Mario"}, {id: 20, name: "Álvaro"} ]
    },
    {
        id_event: 8,
        name: "Cata de Vinos y Quesos Extremeños",
        description: "Una experiencia para los sentidos. Degustación guiada de 4 vinos de la tierra y una selección de los mejores quesos de Extremadura. Plazas limitadas.",
        date: "2025-10-11",
        time: "20:00",
        city: "Cáceres",
        locationName: "Bodega El Secreto",
        max_capacity: 12,
        imageUrl: "/event2.png",
        organizer: "Bodega El Secreto",
        subscribers: [ {id: 21, name: "Paula"}, {id: 22, name: "Diego"} ]
    },
    {
        id_event: 9,
        name: "Monólogo de Comedia",
        description: "¡Noche de risas aseguradas con el cómico local Javi Durán! Ven a desconectar y a disfrutar de un buen rato con su nuevo espectáculo.",
        date: "2025-09-26",
        time: "22:00",
        city: "Cáceres",
        locationName: "The Wild Rover",
        max_capacity: 70,
        imageUrl: "/event3.png",
        organizer: "The Wild Rover",
        subscribers: [ {id: 23, name: "Andrea"}, {id: 24, name: "Jorge"} ]
    },
    {
        id_event: 10,
        name: "Taller de Salsa y Bachata",
        description: "Iniciación a los ritmos latinos. No necesitas pareja ni experiencia previa. Aprende los pasos básicos y quédate a la fiesta para practicar.",
        date: "2025-10-03",
        time: "21:00",
        city: "Cáceres",
        locationName: "Discoteca Mambo",
        max_capacity: 40,
        imageUrl: "/event4.png",
        organizer: "Discoteca Mambo",
        subscribers: [ {id: 25, name: "Sara"}, {id: 26, name: "Víctor"}, {id: 27, name: "Nerea"} ]
    }
];

function EventDetail() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isRouletteOpen, setRouletteOpen] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const findEvent = () => {
            try {
                const eventId = parseInt(id, 10);
                const foundEvent = mockedEvents.find(e => e.id_event === eventId);

                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    setError("Evento no encontrado.");
                }
            } catch (err) {
                setError("Error al cargar el evento.");
            } finally {
                setTimeout(() => setLoading(false), 300);
            }
        };
        findEvent();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Cargando evento...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <p className="text-2xl text-red-500 mb-4">{error}</p>
                <button onClick={() => navigate('/explorar-eventos')} className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">Volver a Eventos</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white relative">
            <Header />

            <button
                onClick={() => navigate('/explorar-eventos')}
                className="absolute top-24 right-6 md:right-12 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
                <ArrowLeft size={16} />
                <span>Volver a Eventos</span>
            </button>

            <main className="container mx-auto px-6 pt-32 pb-12">
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
                    <img src={event.imageUrl || '/event.png'} alt={event.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <h1 className="absolute bottom-6 left-6 text-4xl md:text-6xl font-extrabold tracking-tight">{event.name}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-500 pb-2">Sobre el evento</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
                        <h3 className="text-2xl font-bold mt-8 mb-4">Organizador</h3>
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                            <User className="text-pink-500" />
                            <span className="font-medium">{event.organizer}</span>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-b from-[#1A1A2E] to-[#2A2A3E] p-6 rounded-2xl shadow-lg space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-purple-400" size={20} />
                                <span>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-purple-400" size={20} />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="text-purple-400" size={20} />
                                <span>{event.locationName}, {event.city}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="text-purple-400" size={20} />
                                <span>{event.subscribers.length} / {event.max_capacity} asistentes</span>
                            </div>

                            <button
                                onClick={() => setRouletteOpen(true)}
                                className="w-full mt-4 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity">
                                ¡Unirse al Evento!
                            </button>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Asistentes ({event.subscribers.length})</h3>
                        <div className="space-y-3">
                            {event.subscribers.map(sub => (
                                <div key={sub.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold">{sub.name.charAt(0)}</div>
                                    <span>{sub.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <RouletteComponent
                isOpen={isRouletteOpen}
                onClose={() => setRouletteOpen(false)}
            />
        </div>
    );
}

export default EventDetail;