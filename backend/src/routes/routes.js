import { Router } from "express";
import simulacion from "../simulation/simulation.js";
import { secadoMaquinaRk4EndPoint, secadoSoloRk4EndPoint } from "../rk4/rk4.js";

const router = Router();
let h;

router.post("/simular", async (req, res) => {
  try {
    const {
      cantidadAGenerar,
      primeroAMostrar,
      cantidadAMostrar,
      paso,
      mediaLlegadaLavado,
      mediaLlegadaLimpieza,
      mediaFinLavado,
      mediaFinLimpieza,
    } = req.body;
    
    h = paso

    const result = simulacion(
      Number(cantidadAGenerar),
      Number(primeroAMostrar),
      Number(cantidadAMostrar),
      Number(paso),
      Number(mediaLlegadaLavado),
      Number(mediaLlegadaLimpieza),
      Number(mediaFinLavado),
      Number(mediaFinLimpieza)
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
});

router.post("/rk4", async (req, res) => {
  try {
    const { humedad, tipo, reloj, tiempoSecado } = req.body;
    

    let tiempoSecadoSolo = 0;
    let secadoMaquinaRk4;
    let secadoSoloRk4;
    if (tiempoSecado != undefined || tiempoSecado != null) {
      tiempoSecadoSolo = reloj - tiempoSecado;
    }
    let k;


    switch (tipo) {
      case "pequeño":
        k = 0.75
        break;
      case "mediano":
        k = 0.50
        break;
      case "pick-up":
        k = 0.25
        break;
    }

    let humedad1;

    if (humedad != 100) {
      secadoSoloRk4 = secadoSoloRk4EndPoint(100, h, k, tiempoSecadoSolo, 0);
      // sacar el valor de la ultima humedad del secado solo
      humedad1 = secadoSoloRk4[secadoSoloRk4.length - 1].H;
      secadoMaquinaRk4 = secadoMaquinaRk4EndPoint(humedad1, h);
    } else {
      secadoMaquinaRk4 = secadoMaquinaRk4EndPoint(humedad, h);
      secadoSoloRk4 = null;
    }

    res.json({
      secadoMaquinaRk4,
      secadoSoloRk4,
    });

  } catch (error) {
    res.status(500).json({ error: "error" });
  }
});

export default router;
