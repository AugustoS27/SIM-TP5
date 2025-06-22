import { Router } from "express";

const router = Router();

router.get("/simular", (req, res) => {
  res.json({
    message: "Simulacion realizada con éxito",
  });
});

export default router;
