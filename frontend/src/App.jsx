import { useState } from "react";
import "./App.css";
import FormularioSimulacion from "./components/Form.jsx";
import "./index.css";

function App() {
  const [datos, setDatos] = useState([]);
  const maxVehiculos = datos.reduce((max, fila) => {
    const vehiculosEnFila = fila.slice(35).length;
    return Math.max(max, vehiculosEnFila);
  }, 0);
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
                  colSpan={6}
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
    </main>
  );
}

export default App;
