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

  return t;
}

function secadoSoloRk4(H0, h, k, tf, t0 = 0) {
  let t = t0;
  let H = H0;
  console.log(`H0: ${H0}, h: ${h}, k: ${k}, tf: ${tf}, t0: ${t0}`);

  const trayecto = [{ t, H }];

  // f(t, H) = dH/dt = -k * H
  const f = (t, H) => -k * H;

  while (t < tf) {
    const k1 = f(t, H);
    const k2 = f(t + h / 2, H + (k1 * h) / 2);
    const k3 = f(t + h / 2, H + (k2 * h) / 2);
    const k4 = f(t + h, H + k3 * h);

    const deltaH = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    H += deltaH;
    t += h;

    trayecto.push({ t, H });
  }
  console.log(`H: ${H}, t: ${t}`);
  return H;
}

const rk4solo = secadoSoloRk4(100, 0.1, 0.5, 10);

export { secadoMaquinaRk4, secadoSoloRk4 };
