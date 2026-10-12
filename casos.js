// 1. SELECCIONAR LAS TARJETAS DE LOS CASOS
const tarjetas = document.querySelectorAll(".case-card");

tarjetas.forEach(function (tarjeta, indice) {
  const detalles = tarjeta.querySelector(".case-info");
  const titulo = tarjeta.querySelector("h2");

  if (!detalles || !titulo) {
    return;
  }

  // 2. IDENTIFICAR LOS DETALLES DE CADA PROYECTO
  detalles.id = "detalles-caso-" + (indice + 1);

  // 3. CREAR EL BOTÓN
  const boton = document.createElement("button");

  boton.type = "button";
  boton.className = "btn btn-ghost";
  boton.textContent = "Ver detalles";

  boton.setAttribute("aria-controls", detalles.id);
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute(
    "aria-label",
    "Ver detalles: " + titulo.textContent.trim()
  );

  // Colocar el botón antes de los detalles.
  detalles.before(boton);

  // Guardar el estilo original para restaurarlo al abrir.
  const displayOriginal = detalles.style.display;

  // 4. OCULTAR LOS DETALLES AL INICIAR
  detalles.hidden = true;
  detalles.style.display = "none";

  // 5. ABRIR O CERRAR AL HACER CLIC
  boton.addEventListener("click", function () {
    const abrir = detalles.hidden;

    detalles.hidden = !abrir;
    detalles.style.display = abrir ? displayOriginal : "none";

    boton.textContent = abrir ? "Ocultar detalles" : "Ver detalles";
    boton.setAttribute("aria-expanded", String(abrir));

    boton.setAttribute(
      "aria-label",
      (abrir ? "Ocultar detalles: " : "Ver detalles: ") +
        titulo.textContent.trim()
    );
  });
});