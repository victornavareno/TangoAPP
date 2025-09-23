"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// --- DATOS MOCKEADOS ---
const mockedEvents = [
    {
        id_event: 1,
        name: "Noche de Dardos en Bar Mistura",
        description: "¡Ven a demostrar tu puntería! Torneo de dardos con premios para los ganadores. Cerveza artesanal de barril toda la noche.",
        date: "2025-10-04",
        time: "21:00",
        city: "Cáceres",
        locationName: "Bar Mistura",
        max_capacity: 30,
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
        subscribers: [1, 2, 3, 4, 5, 6]
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
        subscribers: Array.from({length: 45}, (_, i) => i + 1)
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8]
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
        subscribers: Array.from({length: 68}, (_, i) => i + 1)
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
        subscribers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
];

function EventsExplorer() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const getRandomEventImage = () => {
        const imageNumber = Math.floor(Math.random() * 6) + 1; // Del 1 al 6
        return `/event${imageNumber}.png`;
    };

    const getRandomCategoryColor = () => {
        const colors = ['bg-pink-500', 'bg-purple-600'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    useEffect(() => {
        // API called (mocked)
        const fetchMockEvents = () => {
            try {
                // random img is assigned to event
                const eventsWithRandomProps = mockedEvents.map(event => ({
                    ...event,
                    imageUrl: getRandomEventImage(),
                    categoryColor: getRandomCategoryColor() // Nueva propiedad para el color de la categoría
                }));
                setEvents(eventsWithRandomProps);
            } catch (err) {
                setError("Error al cargar los datos mockeados.");
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchMockEvents();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Cargando eventos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
            {/* Header */}
            <Header />

            {/* Event Cards */}
            <div className="py-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24">
                {events.map((event) => (
                    <div
                        key={event.id_event}
                        onClick={() => navigate(`/event/${event.id_event}`)}
                        className="cursor-pointer bg-gradient-to-b from-[#1A1A2E] to-[#2A2A3E] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
                    >
                        {/* Event Header */}
                        <div className="relative h-48 bg-gray-800 flex items-center justify-center">
                            <span className={`absolute top-4 right-4 ${event.categoryColor} text-white px-3 py-1 text-sm rounded-full`}>
                                {event.id_event % 3 === 0
                                    ? "Fiesta"
                                    : event.id_event % 3 === 1
                                        ? "Social"
                                        : "Entretenimiento"}
                            </span>
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {event.description || "No description available."}
                            </p>
                            <div className="space-y-3 text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.locationName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {event.subscribers.length}/{event.max_capacity} asistentes
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Join Button */}
                        <div className="px-6 pb-6">
                            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Unirse al evento
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-400 text-sm">
                © 2025 Keda. Todos los derechos reservados.
            </footer>
        </div>
    );
}

export default EventsExplorer;