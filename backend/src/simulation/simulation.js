/*
    Parametros que seran tomado desde el frontend
  - cantidad de eventos
  - primer evento a mostrar
  - cantidad de lineas luego del primer evento (HASTA QUE EVENTO SE MOSTRARA, OBLIGATORIAMENTE LA ULTIMA FILA)
  - Paso h0 (RK)
  - Media de Exponencial de llegada_lavado
  - Media de Exponencial de llegada_limpieza
  - Media de Exponencial fin_lavado
  - Media de Exponencial fin_limpieza
*/

import finLavado from "../events/fin_lavado.js";
import finLimpieza from "../events/fin_limpieza.js";
import finSecadoMaquina from "../events/fin_secado_maquina.js";
import inicializacion from "../events/inicializacion.js";
import llegadaVehiculoLavado from "../events/llegada_vehiculo_lavado.js";
import llegadaVehiculoLimpieza from "../events/llegada_vehiculo_limpieza.js";
import Lavado from "../models/lavado.model.js";
import Limpieza from "../models/limpieza.model.js";
import Secado from "../models/secado.model.js";
import { calcularSiguienteEvento } from "../utils/calcular_proximo_evento.js";

export default function simulacion(
  cantidadEventos,
  primerEvento,
  cantidadLineas,
  h,
  mediaLlegadaLavado,
  mediaLlegadaLimpieza,
  mediaFinLavado,
  mediaFinLimpieza
) {
  // hasta el 34 son datos 35 empiezan los autos [ob.veiculo 1,ob.veiculo 2,...,ob.veiculo n]
  let vectorAnterior = new Array(35);
  let vectorActual = new Array(35);
  let lavado1 = new Lavado(1);
  let lavado2 = new Lavado(2);
  let limpieza = new Limpieza(1);
  let secadora = new Secado(1);
  let cantLineas = cantidadLineas;

  let historial = [];
  vectorAnterior = inicializacion(
    vectorAnterior,
    mediaLlegadaLavado,
    mediaLlegadaLimpieza,
    lavado1,
    lavado2,
    limpieza,
    secadora
  );
  vectorActual = vectorAnterior;

  for (let i = 1; i <= cantidadEventos; i++) {
    let eventos = [5, 8, 13, 14, 17, 20];

    // if (vectorAnterior[i] >= primerEvento && cantLineas > 0) {
    //   historial.push(JSON.parse(JSON.stringify(vectorAnterior)));
    //   cantLineas -= 1;
    // }
    vectorAnterior = [...vectorActual];
    historial.push(JSON.parse(JSON.stringify(vectorAnterior)));

    let siguienteEvento = calcularSiguienteEvento(vectorAnterior, eventos);

    switch (siguienteEvento) {
      case 5: // llegada_lavado
        vectorActual = llegadaVehiculoLavado(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          mediaLlegadaLavado,
          mediaFinLavado,
          lavado1,
          lavado2
        );

        break;
      case 8: // llegada_limpieza
        vectorActual = llegadaVehiculoLimpieza(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          mediaLlegadaLimpieza,
          mediaFinLimpieza,
          limpieza
        );
        break;
      case 13: // fin_lavado1
        vectorActual = finLavado(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          lavado1,
          mediaFinLavado,
          secadora,
          h
        );
        vectorActual[0] = vectorAnterior[0] + 1;
        break;
      case 14: // fin_lavado2
        vectorActual = finLavado(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          lavado2,
          mediaFinLavado,
          secadora,
          h
        );
        vectorActual[0] = vectorAnterior[0] + 1;
        break;
      case 17: // fin_limpieza
        vectorActual = finLimpieza(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          limpieza,
          mediaFinLimpieza
        );
        break;
      case 20: // fin_secado
        vectorActual = finSecadoMaquina(
          vectorActual,
          vectorAnterior,
          vectorAnterior[siguienteEvento],
          secadora,
          h
        );
        break;
    }
  }

  return historial;
}
