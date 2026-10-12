// 1. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA
const anio = document.getElementById("year");

if (anio) {
  anio.textContent = new Date().getFullYear();
}


// 2. SELECCIONAR LOS SERVICIOS
const servicios = document.querySelectorAll(".service");

servicios.forEach(function (servicio) {
  const principal = servicio.querySelector(".service-main");
  const detalles = servicio.querySelector(".service-detail");
  const titulo = servicio.querySelector("h2");

  if (!principal || !detalles || !titulo) {
    return;
  }

  // Identificar los detalles de cada servicio.
  detalles.id = "detalle-" + servicio.id;

  // 3. CREAR UN BOTÓN PARA CADA SERVICIO
  const boton = document.createElement("button");

  boton.type = "button";
  boton.className = "btn btn-ghost";
  boton.textContent = "Ver qué incluye";

  boton.setAttribute("aria-controls", detalles.id);
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute(
    "aria-label",
    "Ver qué incluye: " + titulo.textContent.trim()
  );

  // Colocar el botón debajo de la descripción.
  principal.appendChild(boton);

  // Guardar el estilo original antes de ocultar.
  const displayOriginal = detalles.style.display;

  detalles.hidden = true;
  detalles.style.display = "none";

  // 4. MOSTRAR U OCULTAR LOS DETALLES
  boton.addEventListener("click", function () {
    const abrir = detalles.hidden;

    detalles.hidden = !abrir;
    detalles.style.display = abrir ? displayOriginal : "none";

    boton.textContent = abrir
      ? "Ocultar detalles"
      : "Ver qué incluye";

    boton.setAttribute("aria-expanded", String(abrir));

    boton.setAttribute(
      "aria-label",
      (abrir ? "Ocultar detalles: " : "Ver qué incluye: ") +
        titulo.textContent.trim()
    );
  });
});