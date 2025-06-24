import { secadoMaquinaRk4 } from "../rk4/rk4.js";

export default function finLavado(vectorActual, vectorAnterior, reloj, lavado, mediaFinLavado, secadora, h) {
  const cola = vectorAnterior[23];

  const estado = lavado.id === 1 ? "siendo lavado 1" : "siendo lavado 2";

  if(cola === 0){
    for (let i = 35; i < vectorAnterior.length; i++) {
      if (vectorAnterior[i].estado === estado){
        if (secadora.estado === "libre"){
          vectorActual[i].estado = "siendo secado con secadora";
          const tiempoSecado = secadoMaquinaRk4(vectorAnterior[i].humedad, h)
          vectorActual[18] = vectorAnterior[i].humedad
          vectorActual[19] = tiempoSecado; // Tiempo de secado
          vectorActual[20] = reloj + tiempoSecado; // Fin secado
          secadora.estado = "ocupado";
          vectorActual[26] = secadora.estado; // Actualiza el estado de la sec
        } else{
          vectorActual[i].estado = "siendo secado solo";
          vectorActual[i].tiempoComienzoSecadoSolo = reloj;
        }
        vectorActual[27] += reloj - vectorActual[i].tiempoComienzoLavado; // Acumula el tiempo de lavado
        vectorActual[32] += 1; // Aumenta el contador de lavados
      }
    }
    lavado.estado = "libre";
    if(lavado.id === 1){
      vectorActual[13] = null; // Fin Lavado 1
    } else if(lavado.id === 2){
      vectorActual[14] = null; // Fin Lavado 2
    }

  } else {
    vectorActual[23] = cola - 1; // Disminuye la cola de lavado
    lavado.estado = "ocupado";

    let minIndex = -1;
    for (let i = 35; i < vectorAnterior.length; i++) {
      if (vectorAnterior[i].estado === estado){
        if (secadora.estado === "libre"){
          vectorActual[i].estado = "siendo secado con secadora";
          const tiempoSecado = secadoMaquinaRk4(vectorActual[i].humedad, h)
          vectorActual[18] = vectorActual[i].humedad
          vectorActual[19] = tiempoSecado; // Tiempo de secado
          vectorActual[20] = reloj + tiempoSecado; // Fin secado
          secadora.estado = "ocupado";
          vectorActual[26] = secadora.estado; // Actualiza el estado de la sec
        
        } else{
          vectorActual[i].estado = "siendo secado solo";
          vectorActual[i].tiempoComienzoSecadoSolo = reloj;
        }

        const tiempoLavado = reloj - vectorActual[i].tiempoComienzoLavado;
        vectorActual[27] += tiempoLavado; // Acumula el tiempo de lavado
        vectorActual[32] += 1; // Aumenta el contador de lavados
      }

      if (vectorAnterior[i].estado === "esperando lavado" ){
        if (minIndex === -1 || vectorAnterior[i].tiempoLlegada < vectorAnterior[minIndex].tiempoLlegada) {
          minIndex = i;
        }
      }
    }


    vectorActual[minIndex].estado = estado;
    vectorActual[minIndex].tiempoComienzoLavado = reloj;

    const rndFinLavado = Math.random();
    const tiempoLavado = -mediaFinLavado * Math.log(1 - rndFinLavado);
    const finLavado = tiempoLavado + reloj;

    vectorActual[11] = rndFinLavado; // Rnd Fin Lavado
    vectorActual[12] = tiempoLavado; // Tiempo de lavado
    if(lavado.id === 1){
      vectorActual[13] = finLavado; // Fin Lavado 1
    } else if(lavado.id === 2){
      vectorActual[14] = finLavado; // Fin Lavado 2
    }
  }

  return vectorActual
}


