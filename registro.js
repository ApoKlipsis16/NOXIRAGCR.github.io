// 1. SELECCIONAR LOS ELEMENTOS
const formulario = document.getElementById("registro-form");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const contrasena = document.getElementById("password");
const repeticion = document.getElementById("password2");
const terminos = document.getElementById("terminos");
const botonMostrar = document.getElementById("toggle-pass");
const mensaje = document.getElementById("form-status");

const barras = document.querySelectorAll("#strength i");
const nivelTexto = document.getElementById("strength-label");

const campos = [nombre, correo, contrasena, repeticion, terminos];

// Conectar los campos con sus mensajes de error.
campos.forEach(function (campo) {
  const descripcion = campo.getAttribute("aria-describedby") || "";

  campo.setAttribute(
    "aria-describedby",
    (descripcion + " " + campo.id + "-error").trim()
  );
});


// 2. MOSTRAR U OCULTAR AMBAS CONTRASEÑAS
botonMostrar.addEventListener("click", function () {
  const mostrar = contrasena.type === "password";

  contrasena.type = mostrar ? "text" : "password";
  repeticion.type = mostrar ? "text" : "password";

  botonMostrar.textContent = mostrar ? "Ocultar" : "Mostrar";
  botonMostrar.setAttribute("aria-pressed", String(mostrar));
  botonMostrar.setAttribute(
    "aria-label",
    mostrar ? "Ocultar contraseñas" : "Mostrar contraseñas"
  );
});


// 3. MOSTRAR UN INDICADOR ORIENTATIVO DE CONTRASEÑA
function actualizarIndicador() {
  const clave = contrasena.value;
  let nivel = 0;

  // Comprobar el mínimo solicitado: 8 caracteres, letras y números.
  const cumpleMinimo =
    clave.length >= 8 &&
    /\p{L}/u.test(clave) &&
    /[0-9]/.test(clave);

  if (clave.length > 0) nivel = 1;
  if (cumpleMinimo) nivel = 2;
  if (cumpleMinimo && clave.length >= 12) nivel = 3;
  if (cumpleMinimo && clave.length >= 16) nivel = 4;

  const colores = ["", "#f87171", "#fbbf24", "#60a5fa", "#4ade80"];
  const textos = [
    "",
    "Todavía no cumple los requisitos.",
    "Cumple el mínimo solicitado.",
    "Cumple los requisitos y tiene 12 caracteres o más.",
    "Cumple los requisitos y tiene 16 caracteres o más."
  ];

  barras.forEach(function (barra, indice) {
    barra.style.backgroundColor =
      indice < nivel ? colores[nivel] : "#374151";
  });

  nivelTexto.textContent = textos[nivel];
}

contrasena.addEventListener("input", actualizarIndicador);
actualizarIndicador();


// 4. MOSTRAR Y LIMPIAR ERRORES
function mostrarError(campo, texto) {
  document.getElementById(campo.id + "-error").textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo) {
  document.getElementById(campo.id + "-error").textContent = "";
  campo.setAttribute("aria-invalid", "false");
}

campos.forEach(function (campo) {
  const evento = campo.type === "checkbox" ? "change" : "input";

  campo.addEventListener(evento, function () {
    limpiarError(campo);
    mensaje.textContent = "";

    // Si cambia la contraseña, limpiar el aviso de coincidencia.
    if (campo === contrasena) {
      limpiarError(repeticion);
    }
  });
});


// 5. VALIDAR EL FORMULARIO
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  mensaje.textContent = "";
  campos.forEach(limpiarError);

  nombre.value = nombre.value.trim();
  correo.value = correo.value.trim();

  if (nombre.value === "") {
    mostrarError(nombre, "Escribe tu nombre completo.");
  }

  if (correo.value === "") {
    mostrarError(correo, "Escribe tu correo electrónico.");
  } else if (!correo.validity.valid) {
    mostrarError(correo, "Escribe un correo electrónico válido.");
  }

  if (contrasena.value.length < 8) {
    mostrarError(contrasena, "Usa al menos 8 caracteres.");
  } else if (
    !/\p{L}/u.test(contrasena.value) ||
    !/[0-9]/.test(contrasena.value)
  ) {
    mostrarError(contrasena, "Incluye letras y números.");
  }

  if (repeticion.value === "") {
    mostrarError(repeticion, "Repite tu contraseña.");
  } else if (repeticion.value !== contrasena.value) {
    mostrarError(repeticion, "Las contraseñas no coinciden.");
  }

  if (!terminos.checked) {
    mostrarError(terminos, "Debes aceptar los términos para continuar.");
  }

  const primerError = campos.find(function (campo) {
    return campo.getAttribute("aria-invalid") === "true";
  });

  if (primerError) {
    primerError.focus();
    return;
  }

  mensaje.textContent =
    "Los campos cumplen las validaciones. Esta es una demostración: " +
    "la cuenta todavía no se crea porque falta conectar el servidor.";
});