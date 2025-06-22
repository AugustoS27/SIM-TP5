class Vehiculo {
  constructor(id, tipo, destino, relojActual) {
    this.id = id;
    this.tipo = tipo;
    this.destino = destino;
    this.estado = null;
    this.humedad = 100;
    this.tiempoLlegada = relojActual;
    this.tiempoComienzoSecado = null;
  }
}

module.exports = Vehiculo;
