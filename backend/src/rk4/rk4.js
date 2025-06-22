function secadoMaquinaRk4(H0, h, t0 = 0) {
  // Definimos la función f(t, H) = dH/dt
  const f = (t, H) => -5 * t * t + 2 * H - 200;

  let t = t0;
  let H = H0;

  // Guardamos la primera línea con el valor inicial
  const trayecto = [{ t, H }];

  while (H >= 0) {
    // Coeficientes de Runge-Kutta
    const k1 = f(t, H);
    const k2 = f(t + h / 2, H + (k1 * h) / 2);
    const k3 = f(t + h / 2, H + (k2 * h) / 2);
    const k4 = f(t + h, H + k3 * h);

    // Incremento para H
    const deltaH = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    // Avanzamos un paso
    H += deltaH;
    t += h;

    // Almacenamos la nueva línea de aproximación
    trayecto.push({ t, H });
  }

  return trayecto;
}

function secadoSoloRk4(H0, h, k, tf, t0 = 0) {
  // Definimos la función f(t, H) = dH/dt = -k * H
  const f = (t, H) => k * H;

  let t = t0;
  let H = H0;

  // Guardamos la primera línea con el valor inicial
  const trayecto = [{ t, H }];

  while (t < tf) {
    // Coeficientes de Runge-Kutta
    const k1 = f(t, H);
    const k2 = f(t + h / 2, H + (k1 * h) / 2);
    const k3 = f(t + h / 2, H + (k2 * h) / 2);
    const k4 = f(t + h, H + k3 * h);

    // Incremento para H
    const deltaH = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    // Avanzamos un paso
    H += deltaH;
    t += h;

    // Almacenamos la nueva línea de aproximación
    trayecto.push({ t, H });
  }

  return trayecto;
}

module.exports = {
  secadoMaquinaRk4,
  secadoSoloRk4,
};
