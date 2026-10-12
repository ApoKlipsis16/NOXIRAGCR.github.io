// 1. SELECCIONAR LAS ETAPAS DE LA METODOLOGÍA
const etapas = document.querySelectorAll(".step");

etapas.forEach(function (etapa, indice) {
  const contenido = etapa.querySelector(".step-content");
  const detalles = etapa.querySelector(".step-detail");
  const titulo = etapa.querySelector("h2");

  if (!contenido || !detalles || !titulo) {
    return;
  }

  // 2. IDENTIFICAR LAS ACTIVIDADES DE CADA ETAPA
  detalles.id = "actividades-etapa-" + (indice + 1);

  // 3. CREAR EL BOTÓN
  const boton = document.createElement("button");

  boton.type = "button";
  boton.className = "btn btn-ghost";
  boton.textContent = "Ver actividades";

  boton.setAttribute("aria-controls", detalles.id);
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute(
    "aria-label",
    "Ver actividades: " + titulo.textContent.trim()
  );

  // Colocarlo debajo de la descripción.
  contenido.appendChild(boton);

  // 4. OCULTAR INICIALMENTE LAS ACTIVIDADES
  const displayOriginal = detalles.style.display;

  detalles.hidden = true;
  detalles.style.display = "none";

  // 5. MOSTRAR U OCULTAR AL HACER CLIC
  boton.addEventListener("click", function () {
    const abrir = detalles.hidden;

    detalles.hidden = !abrir;
    detalles.style.display = abrir ? displayOriginal : "none";

    boton.textContent = abrir
      ? "Ocultar actividades"
      : "Ver actividades";

    boton.setAttribute("aria-expanded", String(abrir));

    boton.setAttribute(
      "aria-label",
      (abrir ? "Ocultar actividades: " : "Ver actividades: ") +
        titulo.textContent.trim()
    );
  });
});