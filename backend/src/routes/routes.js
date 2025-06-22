import { Router } from "express";

const router = Router();

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

router.get("/simular", (req, res) => {
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

  console.log(
    cantidadAGenerar,
    primeroAMostrar,
    cantidadAMostrar,
    paso,
    mediaLlegadaLavado,
    mediaLlegadaLimpieza,
    mediaFinLavado,
    mediaFinLimpieza
  );

  res.json({
    message: "Simulacion realizada con éxito",
  });
});

router.get("/mostrar", (req, res) => {
  res.json({
    message: "Runge Kutta",
  });
});

export default router;
