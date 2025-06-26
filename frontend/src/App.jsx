import { useState } from "react";
import "./App.css";
import FormularioSimulacion from "./components/Form.jsx";
import "./index.css";
import { useEffect } from "react";

function App() {
  const [datos, setDatos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosRK4, setDatosRK4] = useState([]);
  const [datosRk4Solo, setDatosRk4Solo] = useState([]);
  const [promedioEsperaLavado, setPromedioEsperaLavado] = useState(0);
  const [promedioEsperaLimpieza, setPromedioEsperaLimpieza] = useState(0);
  const [servicioMasRapido, setServicioMasRapido] = useState("Cualquiera");
  const [promedioTotalSalidaLavado, setPromedioTotalSalidaLavado] = useState(0);
  const [promedioTotalSalidaLimpieza, setPromedioTotalSalidaLimpieza] = useState(0);

  const maxVehiculos = datos.reduce((max, fila) => {
    const vehiculosEnFila = fila.slice(35).length;
    return Math.max(max, vehiculosEnFila);
  }, 0);

  const rungeKutta = async (colIndex, filaIndex, fila) => {
    if (colIndex !== 19) return;
    const reloj = fila[2];
    const humedad = fila[18];

    // Buscar el primer vehículo "SiendoSecadoConSecadora"
    const vehiculos = fila.slice(35);
    const vehiculoObjetivo = vehiculos.find(
      (v) => v && v.estado === "siendo secado con secadora"
    );

    const tiempoSecado = vehiculoObjetivo?.tiempoComienzoSecadoSolo;
    const tipo = vehiculoObjetivo?.tipo;

    if (humedad === undefined || tiempoSecado === undefined) {
      alert("No se realizo Runge Kutta en esta celda.");
      return;
    }

    const respuesta = await fetch("http://localhost:3000/api/rk4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        humedad,
        tipo: tipo,
        reloj,
        tiempoSecado,
      }),
    });
    const resultado = await respuesta.json();
    setDatosRK4(resultado.secadoMaquinaRk4);
    setDatosRk4Solo(resultado.secadoSoloRk4);
    setMostrarModal(true);
  };

  useEffect(() => {
    const ultimaFila = datos[datos.length - 1];
    if (!ultimaFila){
      return;
    }

    const tiempoEsperaLavado = ultimaFila[30];
    const cantidadLavadosTerminados = ultimaFila[32];
    const tiempoTotalLavado = ultimaFila[27];
    
    let promedioLavado = 0
    if (cantidadLavadosTerminados === 0) {
      setPromedioEsperaLavado(0);
      promedioLavado = 0;
    } else {
      const promedioEsperaLavado = tiempoEsperaLavado / cantidadLavadosTerminados;
      setPromedioEsperaLavado(promedioEsperaLavado.toFixed(4));
      promedioLavado = (tiempoTotalLavado + tiempoEsperaLavado) / cantidadLavadosTerminados;
    }
    
    const tiempoEsperaLimpieza = ultimaFila[31];
    const cantidadLimpiezasTerminadas = ultimaFila[33];
    const tiempoTotalLimpieza = ultimaFila[28];
    let promedioLimpieza = 0;
    if (cantidadLimpiezasTerminadas === 0) {
      setPromedioEsperaLimpieza(0);
      promedioLimpieza = 0;
    } else {
      const promedioEsperaLimpieza = tiempoEsperaLimpieza / cantidadLimpiezasTerminadas;
      setPromedioEsperaLimpieza(promedioEsperaLimpieza.toFixed(4)); 
      promedioLimpieza = (tiempoTotalLimpieza + tiempoEsperaLimpieza ) / cantidadLimpiezasTerminadas;
    }
  
    setPromedioTotalSalidaLavado(promedioLavado.toFixed(4))
    setPromedioTotalSalidaLimpieza(promedioLimpieza.toFixed(4));

    if (promedioLavado === 0){
      setServicioMasRapido("Limpieza");
    }
    else if (promedioLimpieza === 0){
      setServicioMasRapido("Lavado");
    }
    else if (promedioLimpieza > promedioLavado) {
      setServicioMasRapido("Lavado");
    } else {
      setServicioMasRapido("Limpieza");
    }

  }, [datos])

  return (
    <main className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Simulador de Lavadero
      </h1>
      <FormularioSimulacion onResultadoRecibido={setDatos} />
      <div className="overflow-y-auto max-h-[600px] border border-gray-300 rounded bg-white shadow">
        <table className="table-auto w-full text-sm border border-gray-300">
          <thead className="sticky top-0 bg-blue-100 text-gray-700 z-10">
            <tr>
              <th colSpan={35} className="text-left px-2 py-1 border">
                Datos generales
              </th>
              {Array.from({ length: maxVehiculos }).map((_, i) => (
                <th
                  key={`vehiculo-header-${i}`}
                  colSpan={7}
                  className="text-left px-2 py-1 border"
                >
                  Vehículo {i + 1}
                </th>
              ))}
            </tr>
            <tr>
              {[
                "N",
                "Eventos",
                "Reloj",
                "RND",
                "Tiempo entre llegadas",
                "Próxima Llegada Lavado",
                "RND",
                "Tiempo entre llegadas",
                "Próxima Llegada Limpieza",
                "RND",
                "Tipo Vehículo",
                "RND",
                "Tiempo de lavado",
                "Fin lavado 1",
                "Fin lavado 2",
                "RND",
                "Tiempo Limpieza",
                "Fin Limpieza",
                "H inicial",
                "Tiempo de secado",
                "Fin Secado Máquina",
                "Estado lavado 1",
                "Estado lavado 2",
                "Cola Lavado",
                "Estado Limpieza",
                "Cola Limpieza",
                "Estado Secadora",
                "Ac tiempo lavado",
                "Ac tiempo limpieza",
                "Ac tiempo secado máquina",
                "Ac espera lavado",
                "Ac espera limpieza",
                "Cont lavado terminado",
                "Cont limpieza terminada",
                "Cont vehículos secados",
              ].map((header, idx) => (
                <th
                  key={`header-${idx}`}
                  className="px-2 py-1 border text-xs text-left"
                >
                  {header}
                </th>
              ))}
              {Array.from({ length: maxVehiculos }).map((_, i) =>
                [
                  "Estado",
                  "Tipo vehiculo",
                  "Tiempo Llegada",
                  "Incio limpieza",
                  "Incio lavado",
                  "Inicio secado solo",
                  "Incio secado máquina",
                ].map((subHeader, j) => (
                  <th
                    key={`vehiculo-${i}-sub-${j}`}
                    className="px-2 py-1 border text-xs text-left"
                  >
                    {subHeader}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, filaIndex) => (
              <tr
                key={`fila-${filaIndex}`}
                className={filaIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {fila.slice(0, 35).map((valor, colIndex) => (
                  <td
                    key={`fila-${filaIndex}-col-${colIndex}`}
                    className="px-2 py-1 border"
                    onClick={() => rungeKutta(colIndex, filaIndex, fila)}
                  >
                    {valor !== null && valor !== undefined
                      ? typeof valor === "number"
                        ? Number.isInteger(valor)
                          ? valor
                          : valor.toFixed(2)
                        : valor.toString()
                      : " "}
                  </td>
                ))}
                {fila.slice(35).map((vehiculo, vehiculoIndex) =>
                  vehiculo ? (
                    [
                      vehiculo.estado,
                      vehiculo.tipo,
                      vehiculo.tiempoLlegada,
                      vehiculo.tiempoComienzoLimpieza,
                      vehiculo.tiempoComienzoLavado,
                      vehiculo.tiempoComienzoSecadoSolo,
                      vehiculo.tiempoComienzoSecadoMaquina,
                    ].map((val, idx) => (
                      <td
                        key={`vehiculo-${vehiculoIndex}-campo-${idx}`}
                        className="px-2 py-1 border"
                      >
                        {val !== null && val !== undefined
                          ? typeof val === "number"
                            ? Number.isInteger(val)
                              ? val
                              : val.toFixed(2)
                            : val.toString()
                          : " "}
                      </td>
                    ))
                  ) : (
                    <td
                      key={`vehiculo-${vehiculoIndex}`}
                      className="px-2 py-1 border"
                    ></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">📊 Estadísticas</h2>

        <div className="grid grid-cols-1 gap-4 text-gray-800 text-sm md:text-base">
          <div className="flex justify-between items-center">
            <span className="font-medium">⏳ Espera promedio lavado:</span>
            <span className="text-gray-700">{promedioEsperaLavado} minutos</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">🧽 Espera promedio limpieza interior:</span>
            <span className="text-gray-700">{promedioEsperaLimpieza} minutos</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">🚘 Prom. salida sistema de lavado:</span>
            <span>{promedioTotalSalidaLavado} minutos</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">🚗 Prom. salida limpieza interior:</span>
            <span>{promedioTotalSalidaLimpieza} minutos</span>
          </div>

          <div className="flex justify-between items-center bg-blue-50 p-2 rounded-md">
            <span className="font-semibold text-blue-700">⚡ Servicio más rápido:</span>
            <span className="text-blue-700 font-bold">{servicioMasRapido}</span>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center flex-col z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] max-h-[95%] max-w-3xl relative overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-900 hover:text-black text-lg"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-blue-700">
              Resultado de Runge-Kutta
            </h3>
            <h4>Secado con máquina</h4>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="table-auto w-full text-sm border border-gray-600 shadow-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-1 border">t</th>
                    <th className="px-3 py-1 border">H</th>
                    <th className="px-3 py-1 border">k1</th>
                    <th className="px-3 py-1 border">k2</th>
                    <th className="px-3 py-1 border">k3</th>
                    <th className="px-3 py-1 border">k4</th>
                    <th className="px-3 py-1 border">t + h</th>
                    <th className="px-3 py-1 border">H + ΔH</th>
                  </tr>
                </thead>
                <tbody>
                  {datosRK4.map((fila, filaIndex) => (
                    <tr
                      key={`rk4-fila-${filaIndex}`}
                      className={
                        filaIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }
                    >
                      <td className="px-3 py-1 border text-center">
                        {fila.ti.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.hi.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.k1.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.k2.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.k3.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.k4.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.t.toFixed(4)}
                      </td>
                      <td className="px-3 py-1 border text-center">
                        {fila.H.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              {datosRk4Solo && datosRk4Solo.length > 0 && <h4>Secado solo</h4>}
              {datosRk4Solo && datosRk4Solo.length > 0 && (
                <div className="overflow-x-auto max-h-[200px]">
                  <table className="table-auto w-full text-sm border border-gray-600 shadow-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-3 py-1 border">t</th>
                        <th className="px-3 py-1 border">H</th>
                        <th className="px-3 py-1 border">k1</th>
                        <th className="px-3 py-1 border">k2</th>
                        <th className="px-3 py-1 border">k3</th>
                        <th className="px-3 py-1 border">k4</th>
                        <th className="px-3 py-1 border">t + h</th>
                        <th className="px-3 py-1 border">H + ΔH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosRk4Solo.map((fila, filaIndex) => (
                        <tr
                          key={`rk4-fila-${filaIndex}`}
                          className={
                            filaIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-3 py-1 border text-center">
                            {fila.ti.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.hi.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.k1.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.k2.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.k3.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.k4.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.t.toFixed(4)}
                          </td>
                          <td className="px-3 py-1 border text-center">
                            {fila.H.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
