import Vehiculo from "../models/vehiculo.model.js";
import { asignacionLlegadaVehiculoLavado } from "../utils/utils_llegada_vehiculo_lavado.js";

export default function llegadaVehiculoLavado(vectorActual, vectorAnterior, reloj, mediaLlegadaLavado, mediaFinLavado ,lavado1, lavado2) {
  
  //Generar nueva llegada
  const rndLlegada = Math.random();
  const llegadaLavado = -mediaLlegadaLavado * Math.log(1 - rndLlegada);
  const proximaLlegada = llegadaLavado + reloj;

  //Genera un numero aleatorio para tipo
  const rndTipo = Math.random();
  let tipoVehiculo;
  if (rndTipo < 0.2){
    tipoVehiculo = "pequeño";
  } else if (rndTipo < 0.5){
    tipoVehiculo = "mediano";
  } else {
    tipoVehiculo = "pick-up";
  }

  let vehiculo;
  if (lavado1.estado === "libre" && lavado2.estado === "libre"){
    const rndDestino = Math.random();
    if (rndDestino < 0.5){
      vectorActual = asignacionLlegadaVehiculoLavado(vectorActual, reloj ,mediaFinLavado, "1", lavado1)
      vehiculo = new Vehiculo(tipoVehiculo, "siendo lavado 1", "lavado", reloj, null, reloj);
    } else{
      vectorActual = asignacionLlegadaVehiculoLavado(vectorActual, reloj ,mediaFinLavado, "2", lavado2)
      vehiculo = new Vehiculo(tipoVehiculo, "siendo lavado 2", "lavado", reloj, null, reloj);
    }
  } else if (lavado1.estado === "libre"){
      vectorActual = asignacionLlegadaVehiculoLavado(vectorActual, reloj ,mediaFinLavado, "1", lavado1)
      vehiculo = new Vehiculo(tipoVehiculo, "siendo lavado 1", "lavado", reloj, null, reloj);
  } else if (lavado2.estado === "libre"){
      vectorActual = asignacionLlegadaVehiculoLavado(vectorActual, reloj, mediaFinLavado, "2", lavado2)
      vehiculo = new Vehiculo(tipoVehiculo, "siendo lavado 2", "lavado", reloj, null, reloj);
    //crear tiempo fin lavado
  } else {
    //Aumenta la cola
    vehiculo = new Vehiculo(tipoVehiculo, "esperando lavado", "lavado", reloj);
    vectorActual[23] += 1; //Aumenta la cola
  }

  

  vectorActual[0] = vectorAnterior[0] + 1; //Aumenta el N
  vectorActual[1] = "Llegada_lavado" //Nombre del evento
  vectorActual[2] = reloj;  //Reloj
  vectorActual[3] = rndLlegada; //Rnd Llegada
  vectorActual[4] = llegadaLavado; //Tiempo de llegada
  vectorActual[5] = proximaLlegada; //Proxima llegada
  vectorActual[9] = rndTipo; //Rnd para el tipo de vehiculo
  vectorActual[10] = tipoVehiculo; //Tipo de vehiculo
  vectorActual[21] = lavado1.estado; //Estado de lavado 1
  vectorActual[22] = lavado2.estado; //Estado de lavado 2
  vectorActual.push(vehiculo);
  
  return vectorActual;
}