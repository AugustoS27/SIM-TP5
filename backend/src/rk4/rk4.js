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

  return H;
}

function secadoMaquinaRk4EndPoint(H0, h, t0 = 0) {
  // Definimos la función f(t, H) = dH/dt
  const f = (t, H) => -5 * t * t + 2 * H - 200;

  let ti = t0;
  let hi = H0;
  let t = t0;
  let H = H0;

  let k1 = 0;
  let k2 = 0;
  let k3 = 0;
  let k4 = 0;

  // Guardamos la primera línea con el valor inicial
  const trayecto = [{ ti, hi, k1, k2, k3, k4, t, H }];

  while (H >= 0) {
    // Coeficientes de Runge-Kutta
    k1 = f(t, H);
    k2 = f(t + h / 2, H + (k1 * h) / 2);
    k3 = f(t + h / 2, H + (k2 * h) / 2);
    k4 = f(t + h, H + k3 * h);

    // Incremento para H
    const deltaH = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    // Avanzamos un paso
    ti = t
    hi = H
    t += h;
    H += deltaH;

    // Almacenamos la nueva línea de aproximación
    trayecto.push({ ti, hi, k1, k2, k3, k4, t, H });
  }


  return trayecto;
}

function secadoSoloRk4EndPoint(H0, h, k, tf, t0 = 0) {
  let ti = t0;
  let hi = H0;
  let t = t0;
  let H = H0;

  let k1 = 0
  let k2 = 0
  let k3 = 0
  let k4 = 0

  const deltaH = 0

  const trayecto = [{ ti, hi, k1, k2, k3, k4, t, H }];

  // f(t, H) = dH/dt = -k * H
  const f = (t, H) => -k * H;

  while (t < tf) {
    k1 = f(t, H);
    k2 = f(t + h / 2, H + (k1 * h) / 2);
    k3 = f(t + h / 2, H + (k2 * h) / 2);
    k4 = f(t + h, H + k3 * h);

    const deltaH = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    ti = t
    hi = H
    t += h;
    H += deltaH;

    trayecto.push({ ti, hi, k1, k2, k3, k4, t, H });
  }

  return trayecto;
}

export {
  secadoMaquinaRk4,
  secadoSoloRk4,
  secadoMaquinaRk4EndPoint,
  secadoSoloRk4EndPoint,
};

