// ✅ Funciones de validación
function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement, mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if (!correoRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Producto sugerido exitosamente!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "rgba(0, 128, 0, 0.8)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px"
        },
        stopOnFocus: true,
    }).showToast();
}

// ✅ Validación principal
function validarFormulario(event) {
    event.preventDefault();

    const inputNombre = document.getElementById('nombre-juego');
    const inputPlataforma = document.getElementById('plataforma');
    const inputGenero = document.getElementsByName('genero');
    const inputCorreo = document.getElementById('correo');

    const labelErrorNombre = document.getElementById('errorNombreJuego');
    const labelErrorPlataforma = document.getElementById('errorPlataforma');
    const labelErrorGenero = document.getElementById('errorGenero');
    const labelErrorCorreo = document.getElementById('errorCorreo');

    const nombreValido = validarLongitud(inputNombre, labelErrorNombre, 2, 50, 'El nombre debe tener entre 2 y 50 caracteres');
    const plataformaValida = validarCampoObligatorio(inputPlataforma, labelErrorPlataforma, 'Debe seleccionar una plataforma');
    const generoValido = validarGenero(inputGenero, labelErrorGenero, 'Debe seleccionar un género');
    const correoValido = validarCorreo(inputCorreo, labelErrorCorreo, 'Debe ingresar un correo válido');

    if (nombreValido && plataformaValida && generoValido && correoValido) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formularioVideojuego');
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });  
        formulario.classList.add("was-validated");      
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        formulario.reset();
        return false; // Evita el envío del formulario
    }

    alert("⚠️ Por favor complete correctamente el formulario.");
    return false;
}

// ✅ Validación al perder el foco
function validarCamposAlCambiarFoco() {
    const inputNombre = document.getElementById('nombre-juego');
    const inputPlataforma = document.getElementById('plataforma');
    const inputGenero = document.getElementsByName('genero');
    const inputCorreo = document.getElementById('correo');

    const labelErrorNombre = document.getElementById('errorNombreJuego');
    const labelErrorPlataforma = document.getElementById('errorPlataforma');
    const labelErrorGenero = document.getElementById('errorGenero');
    const labelErrorCorreo = document.getElementById('errorCorreo');

    inputNombre.addEventListener('blur', () => validarLongitud(inputNombre, labelErrorNombre, 2, 50, 'El nombre debe tener entre 2 y 50 caracteres'));
    inputPlataforma.addEventListener('blur', () => validarCampoObligatorio(inputPlataforma, labelErrorPlataforma, 'Debe seleccionar una plataforma'));
    inputCorreo.addEventListener('blur', () => validarCorreo(inputCorreo, labelErrorGenero, 'Debe ingresar un correo válido'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorCorreo, 'Debe seleccionar un género')));
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formularioVideojuego').addEventListener('submit', validarFormulario);
    validarCamposAlCambiarFoco();
});
