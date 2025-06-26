import { secadoMaquinaRk4, secadoSoloRk4 } from "../rk4/rk4.js";

export default function finSecadoMaquina(
  vectorActual,
  vectorAnterior,
  reloj,
  secadora,
  h
) {
  let minIndex = -1;
  let tiempoSecadoMaquina = 0;
  for (let i = 35; i < vectorAnterior.length; i++) {
    if (vectorAnterior[i].estado === "siendo secado con secadora") {
      vectorAnterior[i].estado = "destruido"; // El vehículo se destruye al finalizar el secado
      vectorAnterior[i].tiempoComienzoSecadoSolo = null; // Resetea el tiempo de secado solo
      tiempoSecadoMaquina =
        reloj - vectorAnterior[i].tiempoComienzoSecadoMaquina; // Acumula el tiempo de secado
    }

    if (vectorAnterior[i].estado === "siendo secado solo") {
      if (
        minIndex === -1 ||
        vectorAnterior[i].tiempoComienzoSecadoSolo <
          vectorAnterior[minIndex].tiempoComienzoSecadoSolo
      ) {
        minIndex = i;
      }
    }
  }

  if (minIndex === -1) {
    secadora.estado = "libre";
    vectorActual[26] = secadora.estado; // Actualiza el estado de la secadora;
    vectorActual[18] = null;
    vectorActual[19] = null; // Tiempo de secado
    vectorActual[20] = null; // Fin secado
  } else {
    secadora.estado = "ocupado";
    vectorActual[minIndex].estado = "siendo secado con secadora";
    vectorActual[minIndex].tiempoComienzoSecadoMaquina = reloj; // Guarda el tiempo de comienzo del secado con secadora

    let k = 0;

    switch (vectorAnterior[minIndex].tipo) {
      case "pequeño":
        k = 0.75;
        break;
      case "mediano":
        k = 0.5;
        break;
      case "pick-up":
        k = 0.25;
        break;
    }

    const tiempoEnSecadoSolo =
      reloj - vectorAnterior[minIndex].tiempoComienzoSecadoSolo;
    const H = secadoSoloRk4(100, h, k, tiempoEnSecadoSolo, 0);
    vectorActual[18] = H;
    vectorAnterior[minIndex].humedad = H; // Actualiza la humedad del vehículo
    const tiempoSecado = secadoMaquinaRk4(H, h, 0);
    const finSecado = reloj + tiempoSecado;
    vectorActual[19] = tiempoSecado; // Tiempo de secado
    vectorActual[20] = finSecado; // Fin secado
  }
  vectorActual[0] = vectorAnterior[0] + 1; // Aumenta el N
  vectorActual[1] = "Fin_secado_maquina"; // Nombre del evento
  vectorActual[2] = reloj; // Reloj
  vectorActual[3] = null;
  vectorActual[4] = null;
  vectorActual[6] = null;
  vectorActual[7] = null;
  vectorActual[9] = null;
  vectorActual[10] = null;
  vectorActual[11] = null;
  vectorActual[12] = null;
  vectorActual[15] = null;
  vectorActual[16] = null;
  vectorActual[26] = secadora.estado; // Estado de la secadora
  vectorActual[29] += tiempoSecadoMaquina; // Acumula el tiempo de secado
  vectorActual[34] += 1; // Aumenta el contador de secados
  return vectorActual;
}
