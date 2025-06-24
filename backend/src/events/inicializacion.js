export default function inicializacion(vectorActual, mediaLlegadaLavado, mediaLlegadaLimpieza, lavado1, lavado2, limpieza, secadora) {
    let reloj = 0;
    let nombreEvento = "inicializacion"
    let rndLlegadaLavado = Math.random()
    let llegadaLavado = -mediaLlegadaLavado * Math.log(1-rndLlegadaLavado);
    let rndLlegadaLimpieza = Math.random()
    let llegadalimpieza = -mediaLlegadaLimpieza * Math.log(1-rndLlegadaLimpieza)
    let colaLavado = 0;
    let colaLimpieza = 0;

    lavado1.estado = "libre";
    lavado2.estado = "libre";
    limpieza.estado = "libre";
    secadora.estado = "libre";
    
    vectorActual[0] = 0;
    vectorActual[1] = nombreEvento;
    vectorActual[2] = reloj;
    vectorActual[3] = rndLlegadaLavado;
    vectorActual[4] = llegadaLavado;
    vectorActual[5] = llegadaLavado + reloj;
    vectorActual[6] = rndLlegadaLimpieza;
    vectorActual[7] = llegadalimpieza;
    vectorActual[8] = llegadalimpieza + reloj;
    vectorActual[21] = lavado1.estado;
    vectorActual[22] = lavado2.estado;
    vectorActual[23] = colaLavado;
    vectorActual[24] = limpieza.estado;
    vectorActual[25] = colaLimpieza;
    vectorActual[26] = secadora.estado;
    for (let i = 27; i <= 34; i++) {
        vectorActual[i] = 0;
    }
    return vectorActual
}
