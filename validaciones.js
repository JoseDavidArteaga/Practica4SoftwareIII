document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("productForm");
    const inputs = form.querySelectorAll("input, textarea");

    // Validación al perder foco (blur)
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            validarCampo(input);
        });
    });

    // Validación al enviar
    form.addEventListener("submit", (e) => {
        let valido = true;
        inputs.forEach(input => {
            if (!validarCampo(input)) {
                valido = false;
            }
        });

        if (!valido) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    function validarCampo(campo) {
        if (campo.checkValidity()) {
            campo.classList.remove("is-invalid");
            campo.classList.add("is-valid");
            return true;
        } else {
            campo.classList.remove("is-valid");
            campo.classList.add("is-invalid");
            return false;
        }
    }
});
