import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Type, FileText, Calendar, Clock, Users, Image } from "lucide-react";

function CreateEventPage() {
    const navigate = useNavigate();
    const [eventForm, setEventForm] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        max_capacity: "",
        imageUrl: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEventForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos a tu API
        console.log("Evento a crear:", eventForm);
        alert("¡Evento creado con éxito! (Simulación)");
        navigate("/hostDashboard"); // O a la página que prefieras
    };

    const FormInput = ({ id, label, type, placeholder, value, icon: Icon }) => (
        <div>
            <label htmlFor={id} className="flex items-center text-sm font-medium text-white/80 mb-2">
                <Icon className="h-4 w-4 mr-2" />
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1533] via-[#2d1b4e] to-[#1a1533] text-white flex flex-col items-center p-4">
            <Header />
            <main className="flex flex-col items-center justify-center w-full flex-grow pt-24">
                <div className="bg-white/10 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold">Crea un Nuevo Evento</h1>
                        <p className="text-white/70 mt-2">Rellena los detalles para dar vida a tu próxima experiencia.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <FormInput
                            id="name"
                            label="Nombre del Evento"
                            type="text"
                            placeholder="Ej: Noche de Monólogos"
                            value={eventForm.name}
                            icon={Type}
                        />

                        <div>
                            <label htmlFor="description" className="flex items-center text-sm font-medium text-white/80 mb-2">
                                <FileText className="h-4 w-4 mr-2" />
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                placeholder="Describe tu evento, qué lo hace especial..."
                                value={eventForm.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full p-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-[#ec008c] focus:border-[#ec008c] transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                id="date"
                                label="Fecha"
                                type="date"
                                value={eventForm.date}
                                icon={Calendar}
                            />
                            <FormInput
                                id="time"
                                label="Hora"
                                type="time"
                                value={eventForm.time}
                                icon={Clock}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                id="max_capacity"
                                label="Capacidad Máxima"
                                type="number"
                                placeholder="Ej: 50"
                                value={eventForm.max_capacity}
                                icon={Users}
                            />
                            <FormInput
                                id="imageUrl"
                                label="URL de la Imagen"
                                type="text"
                                placeholder="https://ejemplo.com/imagen.png"
                                value={eventForm.imageUrl}
                                icon={Image}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-bold bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white rounded-lg transition-transform transform hover:scale-105"
                        >
                            Crear Evento
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default CreateEventPage;