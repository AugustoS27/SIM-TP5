import { Router } from "express";
import simulacion from "../simulation/simulation.js";
import { secadoMaquinaRk4EndPoint, secadoSoloRk4EndPoint } from "../rk4/rk4.js";

const router = Router();

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

    const result = await simulacion(
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
    const { humedad, h, k, tiempoSecadoSolo } = req.body;

    let secadoMaquinaRk4;
    let secadoSoloRk4;

    if (humedad != 100) {
      secadoSoloRk4 = secadoSoloRk4EndPoint(humedad, h, k, tiempoSecadoSolo, 0);
      secadoMaquinaRk4 = secadoMaquinaRk4EndPoint(humedad, h);
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
