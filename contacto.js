// 1. SELECCIONAR LOS ELEMENTOS
const formulario = document.getElementById("contacto-form");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const telefono = document.getElementById("telefono");
const interes = document.getElementById("interes");
const consulta = document.getElementById("mensaje");
const privacidad = document.getElementById("privacidad");
const contador = document.getElementById("mensaje-count");
const estado = document.getElementById("form-status");

const campos = [
  nombre, correo, telefono, interes, consulta, privacidad
];

// Usar nuestros mensajes de validación.
formulario.noValidate = true;

// Conectar cada campo con su mensaje de error.
campos.forEach(function (campo) {
  const descripcion = campo.getAttribute("aria-describedby") || "";

  campo.setAttribute(
    "aria-describedby",
    (descripcion + " " + campo.id + "-error").trim()
  );
});


// 2. CONTAR LOS CARACTERES DEL MENSAJE
function actualizarContador() {
  contador.textContent =
    consulta.value.length + " de " + consulta.maxLength + " caracteres";
}

consulta.addEventListener("input", actualizarContador);
actualizarContador();


// 3. MOSTRAR Y LIMPIAR ERRORES
function mostrarError(campo, texto) {
  document.getElementById(campo.id + "-error").textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo) {
  document.getElementById(campo.id + "-error").textContent = "";
  campo.setAttribute("aria-invalid", "false");
}

// Quitar el aviso cuando el usuario corrige un campo.
campos.forEach(function (campo) {
  const evento =
    campo.type === "checkbox" || campo.tagName === "SELECT"
      ? "change"
      : "input";

  campo.addEventListener(evento, function () {
    limpiarError(campo);
    estado.textContent = "";
  });
});


// 4. VALIDAR LA CONSULTA
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  estado.textContent = "";
  campos.forEach(limpiarError);

  nombre.value = nombre.value.trim();
  correo.value = correo.value.trim();
  telefono.value = telefono.value.trim();

  // Nombre obligatorio.
  if (nombre.value === "") {
    mostrarError(nombre, "Escribe tu nombre completo.");
  }

  // Correo obligatorio y con formato válido.
  if (correo.value === "") {
    mostrarError(correo, "Escribe tu correo electrónico.");
  } else if (!correo.validity.valid) {
    mostrarError(correo, "Escribe un correo electrónico válido.");
  }

  // Teléfono opcional: revisar solo si fue completado.
  // Se admiten espacios, paréntesis, guiones y un + inicial.
  if (telefono.value !== "") {
    const formatoPermitido = /^\+?[0-9\s()-]+$/;
    const digitos = telefono.value.replace(/\D/g, "");

    if (
      !formatoPermitido.test(telefono.value) ||
      digitos.length < 7 ||
      digitos.length > 15
    ) {
      mostrarError(
        telefono,
        "Escribe entre 7 y 15 dígitos; puedes incluir el código de país."
      );
    }
  }

  // Servicio de interés obligatorio.
  if (interes.value === "") {
    mostrarError(interes, "Selecciona el servicio que te interesa.");
  }

  // Evitar mensajes vacíos o compuestos solo por espacios.
  if (consulta.value.trim() === "") {
    mostrarError(consulta, "Escribe tu consulta.");
  } else if (consulta.value.length > consulta.maxLength) {
    mostrarError(consulta, "El mensaje no puede superar los 1000 caracteres.");
  }

  // Consentimiento obligatorio.
  if (!privacidad.checked) {
    mostrarError(
      privacidad,
      "Debes aceptar el uso de tus datos para continuar."
    );
  }

  // Llevar el cursor al primer campo incorrecto.
  const primerError = campos.find(function (campo) {
    return campo.getAttribute("aria-invalid") === "true";
  });

  if (primerError) {
    estado.textContent = "Revisa los campos indicados.";
    primerError.focus();
    return;
  }

  // 5. ABRIR LA PÁGINA DE CONFIRMACIÓN COMO DEMOSTRACIÓN
  // No se envían ni se guardan los datos del formulario.
  window.location.assign("solicitud-enviada.html");
});