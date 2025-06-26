export default class Vehiculo {
  static ultimoId = 0;

  constructor(
    tipo,
    estado,
    destino,
    relojActual,
    tiempoComienzoLimpieza,
    tiempoComienzoLavado
  ) {
    this.id = ++Vehiculo.ultimoId;
    this.tipo = tipo;
    this.destino = destino;
    this.estado = estado || null;
    this.humedad = 100;
    this.tiempoLlegada = relojActual;
    this.tiempoComienzoLimpieza = tiempoComienzoLimpieza || null;
    this.tiempoComienzoLavado = tiempoComienzoLavado || null;
    this.tiempoComienzoSecadoSolo = null;
    this.tiempoComienzoSecadoMaquina = null;

  }

  toString() {
    return `Vehiculo {
      id: ${this.id},
      tipo: ${this.tipo},
      destino: ${this.destino},
      estado: ${this.estado},
      humedad: ${this.humedad},
      tiempoLlegada: ${this.tiempoLlegada},
      tiempoComienzoLimpieza: ${this.tiempoComienzoLimpieza},
      tiempoComienzoLavado: ${this.tiempoComienzoLavado},
      tiempoComienzoSecadoSolo: ${this.tiempoComienzoSecadoSolo},
      tiempoComienzoSecadoMaquina: ${this.tiempoComienzoSecadoMaquina}
    }`;
  }
}
