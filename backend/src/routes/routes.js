import { Router } from "express";
import simulacion from "../simulation/simulation.js"

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

router.get("/mostrar", (req, res) => {
  res.json({
    message: "Runge Kutta",
  });
});

export default router;
