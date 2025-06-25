import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const requestBody = {
      cantidadAGenerar: 10,
      primeroAMostrar: 0,
      cantidadAMostrar: 10,
      paso: 0.1,
      mediaLlegadaLavado: 5,
      mediaLlegadaLimpieza: 3,
      mediaFinLavado: 4,
      mediaFinLimpieza: 2
    };

    fetch("http://localhost:3000/api/simular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del backend:", data);
        setDatos(data);
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  }, []);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th colSpan={34}>Datos generales</th>
            {datos.length > 0 && datos[0].slice(34).map((_, i) => (
              <th key={`vehiculo-header-${i}`} colSpan={4}>Vehículo {i + 1}</th>
            ))}
          </tr>
          <tr>
            {/* Cabecera de los primeros 34 campos */}
            {[
              "N", "Eventos", "Reloj", "RND", "Tiempo entre llegadas", "Próxima Llegada Lavado",
              "RND", "Tiempo entre llegadas", "Próxima Llegada Limpieza", "RND", "Tipo Vehículo",
              "RND", "Tiempo de lavado", "Fin lavado 1", "Fin lavado 2", "RND", "Tiempo Limpieza",
              "Fin Limpieza", "H inicial", "Tiempo de secado", "Fin Secado Máquina", "Estado lavado 1",
              "Estado lavado 2", "Cola Lavado", "Estado Limpieza", "Cola Limpieza", "Estado Secadora",
              "Ac tiempo lavado", "Ac tiempo limpieza", "Ac tiempo secado máquina",
              "Ac espera lavado", "Ac espera limpieza", "Cont lavado terminado",
              "Cont limpieza terminada", "Cont vehículos secados"
            ].map((header, idx) => (
              <th key={`header-${idx}`}>{header}</th>
            ))}

            {/* Cabecera de subcampos de cada Vehículo */}
            {datos.length > 0 && datos[0].slice(34).map((vehiculo, i) => (
              ["Estado", "Tiempo Llegada", "Humedad", "Inicio secado solo"].map((subHeader, j) => (
                <th key={`vehiculo-${i}-sub-${j}`}>{subHeader}</th>
              ))
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, filaIndex) => (
            <tr key={`fila-${filaIndex}`}>
              {fila.slice(0, 34).map((valor, colIndex) => (
                <td key={`fila-${filaIndex}-col-${colIndex}`}>
                  {valor !== null && valor !== undefined ? valor.toString() : "N/D"}
                </td>
              ))}

              {/* Si hay objetos tipo Vehiculo, renderizar algunas propiedades */}
              {fila.slice(34).map((vehiculo, vehiculoIndex) => (
                vehiculo && typeof vehiculo === "object" ? (
                  [
                    vehiculo.estado,
                    vehiculo.tiempoLlegada,
                    vehiculo.humedad,
                    vehiculo.tiempoComienzoSecadoSolo
                  ].map((val, idx) => (
                    <td key={`vehiculo-${vehiculoIndex}-campo-${idx}`}>
                      {val !== null && val !== undefined ? val.toString() : "N/D"}
                    </td>
                  ))
                ) : (
                  <td key={`vehiculo-${vehiculoIndex}`}>N/D</td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default App
