import { useState } from 'react';
import './App.css';
import FormularioSimulacion from './components/Form.jsx';
import './index.css';


function App() {
  const [datos, setDatos] = useState([]);
  return (
    <main className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Simulador de Lavadero</h1>
      <FormularioSimulacion onResultadoRecibido={setDatos} />
      <div className="overflow-auto max-w-full">
        <table className="table-auto w-full text-sm border border-gray-300">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th colSpan={34} className="text-left px-2 py-1 border">Datos generales</th>
              {datos.length > 0 && datos[0].slice(34).map((_, i) => (
                <th key={`vehiculo-header-${i}`} colSpan={4} className="text-left px-2 py-1 border">
                  Vehículo {i + 1}
                </th>
              ))}
            </tr>
            <tr>
              {["N", "Eventos", "Reloj", "RND", "Tiempo entre llegadas", "Próxima Llegada Lavado",
                "RND", "Tiempo entre llegadas", "Próxima Llegada Limpieza", "RND", "Tipo Vehículo",
                "RND", "Tiempo de lavado", "Fin lavado 1", "Fin lavado 2", "RND", "Tiempo Limpieza",
                "Fin Limpieza", "H inicial", "Tiempo de secado", "Fin Secado Máquina", "Estado lavado 1",
                "Estado lavado 2", "Cola Lavado", "Estado Limpieza", "Cola Limpieza", "Estado Secadora",
                "Ac tiempo lavado", "Ac tiempo limpieza", "Ac tiempo secado máquina",
                "Ac espera lavado", "Ac espera limpieza", "Cont lavado terminado",
                "Cont limpieza terminada", "Cont vehículos secados"]
                .map((header, idx) => (
                  <th key={`header-${idx}`} className="px-2 py-1 border text-xs text-left">
                    {header}
                  </th>
                ))}
              {datos.length > 0 && datos[0].slice(34).map((vehiculo, i) => (
                ["Estado", "Tiempo Llegada", "Humedad", "Inicio secado solo"].map((subHeader, j) => (
                  <th
                    key={`vehiculo-${i}-sub-${j}`}
                    className="px-2 py-1 border text-xs text-left"
                  >
                    {subHeader}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, filaIndex) => (
              <tr key={`fila-${filaIndex}`} className={filaIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {fila.slice(0, 34).map((valor, colIndex) => (
                  <td key={`fila-${filaIndex}-col-${colIndex}`} className="px-2 py-1 border">
                    {valor !== null && valor !== undefined ? valor.toString() : "N/D"}
                  </td>
                ))}
                {fila.slice(34).map((vehiculo, vehiculoIndex) => (
                  vehiculo && typeof vehiculo === "object" ? (
                    [vehiculo.estado, vehiculo.tiempoLlegada, vehiculo.humedad, vehiculo.tiempoComienzoSecadoSolo]
                      .map((val, idx) => (
                        <td key={`vehiculo-${vehiculoIndex}-campo-${idx}`} className="px-2 py-1 border">
                          {val !== null && val !== undefined ? val.toString() : "N/D"}
                        </td>
                      ))
                  ) : (
                    <td key={`vehiculo-${vehiculoIndex}`} className="px-2 py-1 border">N/D</td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
