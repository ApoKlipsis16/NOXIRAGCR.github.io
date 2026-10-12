// 1. SELECCIONAR LOS ELEMENTOS
const referencia = document.querySelector(".request-id strong");
const acciones = document.querySelector(".success-actions");
const descripcion = document.querySelector(".success-lead");


// 2. INDICAR QUE ES UNA DEMOSTRACIÓN
if (descripcion) {
  const aviso = document.createElement("p");

  aviso.className = "support-text";
  aviso.textContent =
    "Demostración académica: no se ha enviado ninguna consulta. " +
    "La referencia mostrada es de ejemplo.";

  descripcion.after(aviso);
}


// 3. CREAR EL BOTÓN PARA COPIAR LA REFERENCIA
if (referencia && acciones) {
  const botonCopiar = document.createElement("button");

  botonCopiar.type = "button";
  botonCopiar.className = "btn btn-ghost";
  botonCopiar.textContent = "Copiar referencia";

  acciones.appendChild(botonCopiar);

  // Crear un espacio para comunicar el resultado.
  const estado = document.createElement("p");

  estado.className = "support-text";
  estado.setAttribute("role", "status");
  estado.setAttribute("aria-live", "polite");

  acciones.after(estado);

  // 4. COPIAR AL HACER CLIC
  botonCopiar.addEventListener("click", async function () {
    const codigo = referencia.textContent.trim();

    try {
      await navigator.clipboard.writeText(codigo);

      estado.textContent = "Referencia copiada: " + codigo;
    } catch (error) {
      // Si el navegador bloquea la copia automática,
      // seleccionar el texto para copiarlo manualmente.
      const seleccion = window.getSelection();
      const rango = document.createRange();

      rango.selectNodeContents(referencia);

      if (seleccion) {
        seleccion.removeAllRanges();
        seleccion.addRange(rango);
      }

      estado.textContent =
        "No se pudo copiar automáticamente. " +
        "Selecciona la referencia y cópiala con Ctrl + C " +
        "o con la opción Copiar de tu dispositivo.";
    }
  });
}