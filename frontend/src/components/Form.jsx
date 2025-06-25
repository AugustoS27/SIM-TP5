import React, { useState } from 'react';
import { simular } from '../services/simulation.js';

function FormularioSimulacion({ onResultadoRecibido }) {
    const [formData, setFormData] = useState({
        cantidadAGenerar: 10,
        primeroAMostrar: 0,
        cantidadAMostrar: 10,
        paso: 0.1,
        mediaLlegadaLavado: 2,
        mediaLlegadaLimpieza: 4,
        mediaFinLavado: 6,
        mediaFinLimpieza: 20,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await simular(formData);
            console.log("Datos recibidos:", data);
            onResultadoRecibido(data);
        } catch (err) {
            console.error("Error en la petición:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto mb-6 bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Cantidad a Generar</label>
                <input type="number" name="cantidadAGenerar" value={formData.cantidadAGenerar} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Primero a Mostrar</label>
                <input type="number" name="primeroAMostrar" value={formData.primeroAMostrar} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Cantidad a Mostrar</label>
                <input type="number" name="cantidadAMostrar" value={formData.cantidadAMostrar} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Paso</label>
                <input type="number" step="any" name="paso" value={formData.paso} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Media Llegada Lavado</label>
                <input type="number" step="any" name="mediaLlegadaLavado" value={formData.mediaLlegadaLavado} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Media Llegada Limpieza</label>
                <input type="number" step="any" name="mediaLlegadaLimpieza" value={formData.mediaLlegadaLimpieza} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Media Fin Lavado</label>
                <input type="number" step="any" name="mediaFinLavado" value={formData.mediaFinLavado} onChange={handleChange} className="input-style" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Media Fin Limpieza</label>
                <input type="number" step="any" name="mediaFinLimpieza" value={formData.mediaFinLimpieza} onChange={handleChange} className="input-style" />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-center pt-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold shadow"
                >
                    Simular
                </button>
            </div>
        </form>
    );
}

export default FormularioSimulacion;
