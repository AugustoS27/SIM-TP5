import Vehiculo from "../models/vehiculo.model.js";

export default function llegadaVehiculoLimpieza(
  vectorActual,
  vectorAnterior,
  reloj,
  mediaLlegadaLimpieza,
  mediaFinLimpieza,
  limpieza
) {
  //Generar la proxima llegada Limpieza
  const rndLlegada = Math.random();
  const llegadaLimpieza = -mediaLlegadaLimpieza * Math.log(1 - rndLlegada);
  const proximaLlegada = llegadaLimpieza + reloj;

  //Genera un numero aleatorio para tipo
  const rndTipo = Math.random();
  let tipoVehiculo;
  if (rndTipo < 0.2) {
    tipoVehiculo = "pequeño";
  } else if (rndTipo < 0.5) {
    tipoVehiculo = "mediano";
  } else {
    tipoVehiculo = "pick-up";
  }

  let vehiculo;
  let rndFinLimpieza;
  let tiempoLimpieza;
  let finLimpieza;

  if (limpieza.estado === "libre") {
    limpieza.estado = "ocupado";

    rndFinLimpieza = Math.random();
    tiempoLimpieza = -mediaFinLimpieza * Math.log(1 - rndFinLimpieza);
    finLimpieza = tiempoLimpieza + reloj;
    vehiculo = new Vehiculo(
      tipoVehiculo,
      "siendo limpiado",
      "limpieza",
      reloj,
      reloj
    );
  } else {
    vehiculo = new Vehiculo(
      tipoVehiculo,
      "esperando limpieza",
      "limpieza",
      reloj
    );
    vectorActual[25] += 1; //Aumenta la cola
    vectorActual[15] = null;
    vectorActual[16] = null;
  }

  vectorActual[0] = vectorAnterior[0] + 1; //Aumenta el N
  vectorActual[1] = "Llegada_limpieza"; //Nombre del evento
  vectorActual[2] = reloj; //Reloj
  vectorActual[3] = null;
  vectorActual[4] = null;
  vectorActual[6] = rndLlegada; //Rnd Llegada
  vectorActual[7] = llegadaLimpieza; //Tiempo de llegada
  vectorActual[8] = proximaLlegada; //Proxima llegada
  vectorActual[9] = rndTipo; //Rnd para el tipo de vehiculo
  vectorActual[10] = tipoVehiculo; //Tipo de vehiculo
  vectorActual[11] = null;
  vectorActual[12] = null;
  vectorActual[15] = rndFinLimpieza; //Rnd Fin Limpieza
  vectorActual[16] = tiempoLimpieza; //Tiempo de limpieza
  vectorActual[17] = finLimpieza; //Fin Limpieza
  vectorActual[18] = null;
  vectorActual[19] = null;
  vectorActual[24] = limpieza.estado; //Estado de limpieza
  vectorActual.push(JSON.parse(JSON.stringify(vehiculo))); //Agrega el vehiculo al vector actual
  return vectorActual;
}
