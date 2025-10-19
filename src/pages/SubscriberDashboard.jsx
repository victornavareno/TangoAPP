import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react";

// Datos simulados de eventos a los que el usuario se ha unido
const mockedJoinedEvents = [
    {
        id_event: 1,
        name: "Noche de Dardos en Bar Mistura",
        date: "2025-10-04",
        time: "21:00",
        locationName: "Bar Mistura",
        imageUrl: "/event1.png",
        isPast: false,
    },
    {
        id_event: 5,
        name: "Intercambio de Idiomas",
        date: "2025-09-29",
        time: "19:00",
        locationName: "Café Lisboa",
        imageUrl: "/event5.png",
        isPast: false,
    },
    {
        id_event: 9,
        name: "Monólogo de Comedia",
        date: "2024-08-15",
        time: "22:00",
        locationName: "The Wild Rover",
        imageUrl: "/event3.png",
        isPast: true,
    },
    {
        id_event: 2,
        name: "Juegos de Mesa con Carlos",
        date: "2024-08-10",
        time: "18:00",
        locationName: "Plaza Mayor",
        imageUrl: "/event2.png",
        isPast: true,
    },
];

const EventCard = ({ event, navigate }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div
            className={`bg-white/5 rounded-2xl shadow-lg overflow-hidden border border-white/10 transition-all duration-300 transform hover:-translate-y-2 ${event.isPast ? 'opacity-60' : ''}`}
        >
            <img src={event.imageUrl} alt={event.name} className="h-48 w-full object-cover" />
            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 truncate">{event.name}</h3>
                <div className="space-y-2 text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-pink-400" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-pink-400" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-pink-400" />
                        <span>{event.locationName}</span>
                    </div>
                </div>
                {event.isPast ? (
                    <div className="text-center font-bold text-white/50 py-2 rounded-lg bg-white/5">
                        Evento Finalizado
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-center gap-2 text-green-400 font-semibold mb-4">
                            <CheckCircle className="h-5 w-5" />
                            <span>¡Estás dentro!</span>
                        </div>
                        <button
                            onClick={() => navigate(`/event/${event.id_event}`)}
                            className="w-full py-3 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors"
                        >
                            Ver Detalles
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

function SubscriberDashboard() {
    const navigate = useNavigate();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        // Simulación de carga de datos
        const upcoming = mockedJoinedEvents.filter(e => !e.isPast);
        const past = mockedJoinedEvents.filter(e => e.isPast);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1533] via-[#2d1b4e] to-[#1a1533] text-white">
            {/* Header */}
            <header className="w-full flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
                <img
                    src="/logo_keda_pink.png"
                    alt="Keda logo"
                    className="h-24 cursor-pointer"
                    onClick={() => navigate("/")}
                />
                <button
                    className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold text-lg transition hover:bg-white/20"
                    onClick={() => navigate("/explorar-eventos")}
                >
                    Explorar Eventos
                </button>
            </header>

            <main className="px-6 md:px-12 lg:px-24 pb-20">
                {/* Próximos Eventos */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Mis Próximas Aventuras</h1>
                    <p className="text-lg text-white/70">¡Prepárate! Estos son los eventos a los que te has unido.</p>
                    {upcomingEvents.length > 0 ? (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {upcomingEvents.map(event => <EventCard key={event.id_event} event={event} navigate={navigate} />)}
                        </div>
                    ) : (
                        <p className="mt-8 text-white/50">Aún no te has apuntado a ningún evento. ¡Anímate a explorar!</p>
                    )}
                </div>

                {/* Eventos Pasados */}
                <div>
                    <h2 className="text-3xl font-bold mb-2">Recuerdos de Eventos</h2>
                    <p className="text-lg text-white/70">Un vistazo a las experiencias que ya has vivido.</p>
                    {pastEvents.length > 0 ? (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {pastEvents.map(event => <EventCard key={event.id_event} event={event} navigate={navigate} />)}
                        </div>
                    ) : (
                        <p className="mt-8 text-white/50">Aquí aparecerán los eventos a los que asistas.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default SubscriberDashboard;