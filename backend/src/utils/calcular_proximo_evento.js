export function calcularSiguienteEvento(array, indices) {
  let indiceMinimo = -1;
  let valorMinimo = Infinity;

  for (let i = 0; i < indices.length; i++) {
    let idx = indices[i];

    // Verificar que el índice sea válido dentro del array
    if (idx < 0 || idx >= array.length) {
      console.warn(`Índice fuera de rango: ${idx}`);
      continue;
    }

    let valor = array[idx];


    // Validar que el valor sea un número finito
    if (typeof valor === 'number' && isFinite(valor)) {
      if (valor < valorMinimo) {
        valorMinimo = valor;
        indiceMinimo = idx;
      }
    }
  }

  return indiceMinimo; // -1 si no se encontró valor válido
}

