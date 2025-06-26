"use client";

import { useState } from "react";
import { Car, Droplets, Timer, Settings } from "lucide-react";
import { simular } from "../services/simulation.js";

function FormularioSimulacion({ onResultadoRecibido }) {
  const [formData, setFormData] = useState({
    cantidadAGenerar: 100,
    primeroAMostrar: 0,
    cantidadAMostrar: 50,
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

    // Validar que todos los campos estén completos
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" || value === null || value === undefined) {
        alert(`El campo "${key}" es obligatorio.`);
        return;
      }

      // Validar que sean números y no contengan letras u otros caracteres
      if (isNaN(value)) {
        alert(`El campo "${key}" debe ser un número válido.`);
        return;
      }

      // Validar que no sean negativos
      if (parseFloat(value) < 0) {
        alert(`El campo "${key}" no puede ser negativo.`);
        return;
      }
    }

    // Validar relación entre campos
    const cantidadAGenerar = parseInt(formData.cantidadAGenerar);
    const primeroAMostrar = parseInt(formData.primeroAMostrar);
    const cantidadAMostrar = parseInt(formData.cantidadAMostrar);
    const cantidadLineasAMostrar = primeroAMostrar + cantidadAMostrar;

    if (cantidadLineasAMostrar > cantidadAGenerar) {
      alert("La suma de 'primero a mostrar' + 'cantidad a mostrar' no puede superar la cantidad a generar.");
      return;
    }

    try {
      const data = await simular(formData);
      console.log("Datos recibidos:", data);
      onResultadoRecibido(data);
    } catch (err) {
      console.error("Error en la petición:", err);
      alert("Ocurrió un error al intentar simular. Intente nuevamente.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-xl rounded-lg">
      <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg px-6 py-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Car className="h-8 w-8" />
          <Droplets className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Configuración de Simulación</h2>
        <p className="text-blue-100 mt-2">
          Ajusta los parámetros para simular el funcionamiento del lavadero
        </p>
      </div>
      <div className="p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Sección de Configuración General */}
          <div className="lg:col-span-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Configuración General
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="cantidadAGenerar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad a Generar
                </label>
                <input
                  id="cantidadAGenerar"
                  type="number"
                  name="cantidadAGenerar"
                  value={formData.cantidadAGenerar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="primeroAMostrar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Primero a Mostrar
                </label>
                <input
                  id="primeroAMostrar"
                  type="number"
                  name="primeroAMostrar"
                  value={formData.primeroAMostrar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cantidadAMostrar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad a Mostrar
                </label>
                <input
                  id="cantidadAMostrar"
                  type="number"
                  name="cantidadAMostrar"
                  value={formData.cantidadAMostrar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="paso"
                  className="block text-sm font-medium text-gray-700"
                >
                  Paso
                </label>
                <input
                  id="paso"
                  type="number"
                  step="any"
                  name="paso"
                  value={formData.paso}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sección de Tiempos de Llegada */}
          <div className="lg:col-span-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Timer className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Tiempos de Llegada
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="mediaLlegadaLavado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Media Llegada Lavado
                </label>
                <input
                  id="mediaLlegadaLavado"
                  type="number"
                  step="any"
                  name="mediaLlegadaLavado"
                  value={formData.mediaLlegadaLavado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mediaLlegadaLimpieza"
                  className="block text-sm font-medium text-gray-700"
                >
                  Media Llegada Limpieza
                </label>
                <input
                  id="mediaLlegadaLimpieza"
                  type="number"
                  step="any"
                  name="mediaLlegadaLimpieza"
                  value={formData.mediaLlegadaLimpieza}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-green-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Sección de Tiempos de Servicio */}
          <div className="lg:col-span-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-5 w-5 text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Tiempos de Servicio
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="mediaFinLavado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Media Fin Lavado
                </label>
                <input
                  id="mediaFinLavado"
                  type="number"
                  step="any"
                  name="mediaFinLavado"
                  value={formData.mediaFinLavado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-cyan-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mediaFinLimpieza"
                  className="block text-sm font-medium text-gray-700"
                >
                  Media Fin Limpieza
                </label>
                <input
                  id="mediaFinLimpieza"
                  type="number"
                  step="any"
                  name="mediaFinLimpieza"
                  value={formData.mediaFinLimpieza}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-cyan-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-12 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-md shadow-lg hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              <Car className="mr-2 h-5 w-5" />
              Iniciar Simulación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioSimulacion;
