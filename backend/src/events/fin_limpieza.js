export default function finLimpieza(vectorActual, vectorAnterior, reloj, limpieza, mediaFinLimpieza) {
  const cola = vectorAnterior[25];
  if(cola === 0) {
    for (let i = 35; i < vectorAnterior.length; i++) {
      if (vectorAnterior[i].estado === "siendo limpiado"){
        vectorActual[i].estado = "destruido";
        const tiempoDeLimpieza = reloj - vectorActual[i].tiempoComienzoLimpieza;
        vectorActual[28] += tiempoDeLimpieza; // Acumula el tiempo de limpieza
        vectorActual[33] += 1; // Aumenta el contador de limpiez
      
      }
    }
    limpieza.estado = "libre";
    vectorActual[17] = null;
    
  } else{
    vectorActual[25] = cola - 1; // Disminuye la cola de limpieza
    limpieza.estado = "ocupado";

    let minIndex = -1;
    for (let i = 35; i < vectorAnterior.length; i++) {
      if (vectorAnterior[i].estado === "siendo limpiado"){
        vectorActual[i].estado = "destruido";
        const tiempoDeLimpieza = reloj - vectorActual[i].tiempoComienzoLimpieza;
        vectorActual[28] += tiempoDeLimpieza; // Acumula el tiempo de limpieza
        vectorActual[33] += 1; // Aumenta el contador de limpiez
      }

      if (vectorAnterior[i].estado === "esperando limpieza" ){
        if (minIndex === -1 || vectorAnterior[i].tiempoLlegada < vectorAnterior[minIndex].tiempoLlegada) {
          minIndex = i;
        }
      }
    }

    vectorActual[minIndex].estado = "siendo limpiado"
    vectorActual[minIndex].tiempoComienzoLimpieza = reloj;
    vectorActual[31] += reloj - vectorActual[minIndex].tiempoLlegada; // Acumula el tiempo de espera en limpieza

    const rndFinLimpieza = Math.random();
    const tiempoLimpieza = -mediaFinLimpieza * Math.log(1 - rndFinLimpieza);
    const finLimpieza = tiempoLimpieza + reloj;

    vectorActual[15] = rndFinLimpieza; // Rnd Fin Limpieza
    vectorActual[16] = tiempoLimpieza; // Tiempo de limpieza
    vectorActual[17] = finLimpieza; // Fin Limpieza

  }

  vectorActual[0] = vectorAnterior[0] + 1; // Aumenta el N
  vectorActual[1] = "Fin_limpieza"; // Nombre del evento
  vectorActual[2] = reloj; // Reloj
  vectorActual[24] = limpieza.estado; // Estado de limpieza

  return vectorActual;
}


