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

function simulacion(
  cantidadEventos,
  primerEvento,
  cantidadLineas,
  h0,
  mediaLlegadaLavado,
  mediaLlegadaLimpieza,
  mediaFinLavado,
  mediaFinLimpieza
) {
  let vectorAnterior = [];
  let vectorActual = [];

  for (let i = 0; i < cantidadEventos; i++) {
    vectorAnterior = vectorActual;
  }
}
