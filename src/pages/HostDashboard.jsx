import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, BarChart2, Users, Calendar, Edit, Trash2 } from "lucide-react";

// --- Mock Data ---
const mockHostData = {
    hostName: "Bar Logan Roy",
    stats: {
        totalEvents: 8,
        totalSubscribers: 342,
        averageRating: 4.8,
    },
    upcomingEvents: [
        { id: 1, name: "Noche de Monologos", date: "2025-10-15", subscribers: 45, capacity: 50 },
        { id: 2, name: "Cata de Cervezas Artesanas", date: "2025-10-22", subscribers: 20, capacity: 20 },
        { id: 3, name: "Trivial Friki Semanal", date: "2025-10-29", subscribers: 30, capacity: 40 },
    ],
};

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-5">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
            <p className="text-sm text-white/70">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const EventRow = ({ event, onEdit, onDelete }) => (
    <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between transition-all hover:bg-white/10">
        <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-1">
            <p className="font-bold text-lg w-full md:w-64 truncate">{event.name}</p>
            <div className="flex items-center gap-2 text-sm text-white/70">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
                <Users className="h-4 w-4" />
                <span>{event.subscribers} / {event.capacity}</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={onEdit} className="p-2 text-white/70 hover:text-white transition-colors">
                <Edit className="h-5 w-5" />
            </button>
            <button onClick={onDelete} className="p-2 text-pink-500/70 hover:text-pink-500 transition-colors">
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    </div>
);

function HostDashboard() {
    const navigate = useNavigate();
    const [hostData, setHostData] = useState(mockHostData);

    // backend api call (now its mocked)
    // useEffect(() => {
    //   fetchHostData().then(data => setHostData(data));
    // }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
            {/* Header */}
            <header className="w-full flex items-center justify-between px-6 md:px-12 py-6">
                <img
                    src="/logo_keda_pink.png"
                    alt="Keda logo"
                    className="h-24 cursor-pointer"
                    onClick={() => navigate("/")}
                />
                {/* could add logout button here */}
            </header>

            <main className="px-6 md:px-12 pb-20">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold">Dashboard</h1>
                        <p className="text-lg text-white/70">Bienvenido, {hostData.hostName}</p>
                    </div>
                    <button
                        onClick={() => navigate("/crearEvento")}
                        className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        <PlusCircle className="h-5 w-5" />
                        Crear Nuevo Evento
                    </button>
                </div>

                {/* Stats Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Estadísticas Rápidas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard icon={Calendar} title="Eventos Creados" value={hostData.stats.totalEvents} color="bg-pink-500" />
                        <StatCard icon={Users} title="Suscriptores Totales" value={hostData.stats.totalSubscribers} color="bg-purple-600" />
                        <StatCard icon={BarChart2} title="Valoración Media" value={`${hostData.stats.averageRating} / 5`} color="bg-blue-500" />
                    </div>
                </div>

                {/* Upcoming Events Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>
                    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                        {hostData.upcomingEvents.length > 0 ? (
                            <div className="space-y-4">
                                {hostData.upcomingEvents.map(event => (
                                    <EventRow
                                        key={event.id}
                                        event={event}
                                        onEdit={() => alert(`Editando evento: ${event.name}`)}
                                        onDelete={() => alert(`Eliminando evento: ${event.name}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-white/50 py-8">No tienes eventos programados. ¡Crea uno ahora!</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HostDashboard;
