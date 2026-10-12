// 1. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA
const anio = document.getElementById("year");

if (anio) {
  anio.textContent = new Date().getFullYear();
}


// 2. ANIMAR LOS NÚMEROS Y PORCENTAJES
const contadores = document.querySelectorAll("[data-count]");

contadores.forEach(function (contador) {
  const meta = Number(contador.dataset.count);
  const sufijo = contador.dataset.suffix || "";
  let numero = 0;

  contador.textContent = numero + sufijo;

  if (meta > 0) {
    const intervalo = setInterval(function () {
      numero++;
      contador.textContent = numero + sufijo;

      if (numero >= meta) {
        clearInterval(intervalo);
      }
    }, 25);
  }
});


// 3. LLENAR LAS BARRAS DEL PANEL
const barras = document.querySelectorAll("[data-fill]");

barras.forEach(function (barra) {
  barra.style.width = "0%";
  barra.style.transition = "width 1.5s ease";

  setTimeout(function () {
    barra.style.width = barra.dataset.fill + "%";
  }, 200);
});