export function asignacionLlegadaVehiculoLavado(vectorActual, reloj ,mediaFinLavado, numeroLavadora, lavado){
    const rndFinLavado = Math.random();
    const tiempoLavado = -mediaFinLavado * Math.log(1 - rndFinLavado);
    const finLavado = tiempoLavado + reloj;
    vectorActual[11] = rndFinLavado
    vectorActual[12] = tiempoLavado;
    if (numeroLavadora === "1") {
        vectorActual[13] = finLavado;
    } else {
        vectorActual[14] = finLavado;
    }
    lavado.estado = "ocupado";
    
    return vectorActual;
}
