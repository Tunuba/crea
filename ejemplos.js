// Paginas listas, funcionan al instante aunque la IA este ocupada.
// Cada una es un archivo HTML completo, corto, para que se pueda leer y cambiar.

const EJEMPLOS = [
{
  nombre: 'Pelota que rebota',
  pedido: 'Una pelota de colores que rebota por toda la pantalla y cambia de color cada vez que choca con un borde',
  html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pelota que rebota</title>
<style>
  /* CSS, como se ve */
  body { margin: 0; height: 100vh; overflow: hidden; background: #10131f; font-family: Arial, sans-serif; }
  #pelota { position: absolute; width: 80px; height: 80px; border-radius: 50%; background: #ff3d7f;
            box-shadow: 0 0 30px #ff3d7f; }
  h1 { color: white; text-align: center; margin-top: 20px; font-size: 22px; }
</style>
</head>
<body>
  <!-- HTML, lo que hay en la pagina -->
  <h1>Toque la pantalla para hacerla saltar</h1>
  <div id="pelota"></div>
<script>
  // JavaScript, lo que hace
  const pelota = document.getElementById('pelota');
  const colores = ['#ff3d7f', '#ffd23d', '#3dffb0', '#3db4ff', '#b03dff'];
  let x = 50, y = 80, vx = 4, vy = 3, n = 0;
  function mover() {
    x += vx; y += vy;
    if (x < 0 || x > innerWidth - 80) { vx = -vx; cambiar(); }
    if (y < 0 || y > innerHeight - 80) { vy = -vy; cambiar(); }
    pelota.style.left = x + 'px';
    pelota.style.top = y + 'px';
    requestAnimationFrame(mover);
  }
  function cambiar() {
    n = (n + 1) % colores.length;
    pelota.style.background = colores[n];
    pelota.style.boxShadow = '0 0 30px ' + colores[n];
  }
  document.body.addEventListener('click', () => { vx *= 1.3; vy *= 1.3; cambiar(); });
  mover();
</script>
</body>
</html>`
},
{
  nombre: 'Ruleta de alumnos',
  pedido: 'Una ruleta para escoger un alumno al azar, con los nombres que escriba el maestro',
  html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ruleta de alumnos</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
         gap: 16px; background: linear-gradient(135deg, #ff9a3d, #ff3d7f); font-family: Arial, sans-serif; color: white; }
  textarea { width: min(90vw, 420px); height: 90px; border-radius: 12px; border: none; padding: 10px; font-size: 16px; }
  #nombre { font-size: 48px; font-weight: bold; min-height: 60px; text-shadow: 0 4px 12px rgba(0,0,0,.3); }
  button { font-size: 22px; padding: 14px 36px; border: none; border-radius: 40px; background: white; color: #ff3d7f;
           font-weight: bold; cursor: pointer; }
</style>
</head>
<body>
  <h2>Ruleta de alumnos</h2>
  <textarea id="lista">Ana, Luis, María, José, Sofía, Carlos, Lucía</textarea>
  <div id="nombre">?</div>
  <button id="girar">Girar</button>
<script>
  const boton = document.getElementById('girar');
  const salida = document.getElementById('nombre');
  boton.onclick = () => {
    const nombres = document.getElementById('lista').value.split(',').map(n => n.trim()).filter(n => n);
    let vueltas = 0;
    const giro = setInterval(() => {
      salida.textContent = nombres[Math.floor(Math.random() * nombres.length)];
      vueltas++;
      if (vueltas > 25) clearInterval(giro);
    }, 80);
  };
</script>
</body>
</html>`
},
{
  nombre: 'Reloj de la clase',
  pedido: 'Un temporizador grande para la clase, con botones de 1, 5 y 10 minutos, que se ponga rojo al terminar',
  html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reloj de la clase</title>
<style>
  body { margin: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
         background: #0f3d3e; color: white; font-family: Arial, sans-serif; transition: background .5s; }
  #tiempo { font-size: min(30vw, 200px); font-weight: bold; font-variant-numeric: tabular-nums; }
  button { font-size: 20px; margin: 6px; padding: 12px 22px; border: none; border-radius: 12px; background: #3dffb0; cursor: pointer; }
  .fin { background: #c0392b !important; }
</style>
</head>
<body>
  <div id="tiempo">05:00</div>
  <div>
    <button onclick="empezar(1)">1 min</button>
    <button onclick="empezar(5)">5 min</button>
    <button onclick="empezar(10)">10 min</button>
  </div>
<script>
  let quedan = 300, reloj = null;
  const pantalla = document.getElementById('tiempo');
  function mostrar() {
    const m = String(Math.floor(quedan / 60)).padStart(2, '0');
    const s = String(quedan % 60).padStart(2, '0');
    pantalla.textContent = m + ':' + s;
  }
  function empezar(minutos) {
    clearInterval(reloj);
    document.body.classList.remove('fin');
    quedan = minutos * 60;
    mostrar();
    reloj = setInterval(() => {
      quedan--;
      mostrar();
      if (quedan <= 0) { clearInterval(reloj); document.body.classList.add('fin'); pantalla.textContent = 'Tiempo'; }
    }, 1000);
  }
</script>
</body>
</html>`
},
{
  nombre: 'Fuegos artificiales',
  pedido: 'Fuegos artificiales de colores que explotan donde uno toca la pantalla',
  html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fuegos artificiales</title>
<style>
  body { margin: 0; overflow: hidden; background: black; }
  canvas { display: block; }
  p { position: absolute; width: 100%; text-align: center; color: white; font: 20px Arial, sans-serif; top: 10px; }
</style>
</head>
<body>
  <p>Toque la pantalla</p>
  <canvas id="cielo"></canvas>
<script>
  const c = document.getElementById('cielo'), g = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  let chispas = [];
  function explotar(x, y) {
    const color = 'hsl(' + Math.random() * 360 + ', 100%, 60%)';
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * Math.PI * 2, v = Math.random() * 6 + 1;
      chispas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 60, color });
    }
  }
  function dibujar() {
    g.fillStyle = 'rgba(0, 0, 0, 0.2)';
    g.fillRect(0, 0, c.width, c.height);
    for (const p of chispas) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.vida--;
      g.fillStyle = p.color;
      g.fillRect(p.x, p.y, 3, 3);
    }
    chispas = chispas.filter(p => p.vida > 0);
    requestAnimationFrame(dibujar);
  }
  c.addEventListener('pointerdown', e => explotar(e.clientX, e.clientY));
  setInterval(() => explotar(Math.random() * c.width, Math.random() * c.height / 2), 1500);
  dibujar();
</script>
</body>
</html>`
},
{
  nombre: 'Juego de sumas',
  pedido: 'Un juego de sumas para niños de primaria con 4 opciones, puntos y un mensaje de felicitación',
  html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Juego de sumas</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
         background: #3d5afe; color: white; font-family: Arial, sans-serif; text-align: center; }
  #pregunta { font-size: 64px; font-weight: bold; margin: 10px; }
  #opciones { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  button { font-size: 36px; width: 130px; height: 90px; border: none; border-radius: 18px; background: #ffd23d; cursor: pointer; }
  #mensaje { font-size: 26px; min-height: 40px; margin-top: 14px; }
</style>
</head>
<body>
  <div>Puntos <b id="puntos">0</b></div>
  <div id="pregunta"></div>
  <div id="opciones"></div>
  <div id="mensaje"></div>
<script>
  let puntos = 0, correcta = 0;
  function nueva() {
    const a = Math.floor(Math.random() * 10) + 1, b = Math.floor(Math.random() * 10) + 1;
    correcta = a + b;
    document.getElementById('pregunta').textContent = a + ' + ' + b;
    const opciones = new Set([correcta]);
    while (opciones.size < 4) opciones.add(correcta + Math.floor(Math.random() * 7) - 3);
    const caja = document.getElementById('opciones');
    caja.innerHTML = '';
    [...opciones].sort(() => Math.random() - 0.5).forEach(n => {
      const b = document.createElement('button');
      b.textContent = n;
      b.onclick = () => responder(n);
      caja.appendChild(b);
    });
  }
  function responder(n) {
    const m = document.getElementById('mensaje');
    if (n === correcta) { puntos++; m.textContent = 'Muy bien'; }
    else m.textContent = 'Era ' + correcta + ', intente otra';
    document.getElementById('puntos').textContent = puntos;
    setTimeout(() => { m.textContent = ''; nueva(); }, 900);
  }
  nueva();
</script>
</body>
</html>`
},
];
