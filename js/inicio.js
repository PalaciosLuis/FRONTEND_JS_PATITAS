window.addEventListener('load', function () {

    // referenciar elementos de la pagina
    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const password = this.document.getElementById('password');
    const btnIngresar = this.document.getElementById('btnIngresar');
    const msgError = this.document.getElementById('msgError');

    // implementar listener
    btnIngresar.addEventListener('click', function () {

        // validar campos de entrada
        if (tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
            numeroDocumento.value === null || numeroDocumento.value.trim() === '' ||
            password.value === null || password.value.trim() === '') {
            mostrarAlerta("Error: Debe completar completamente sus credenciales");
            return;
        }
        ocultarAlerta();

        autenticar();

    });

});

function mostrarAlerta(mensaje) {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta() {
    msgError.innerHTML = '';
    msgError.style.display = 'none';
}

async function autenticar() {

    const url = 'http://localhost:8083/login/autenticar-async';
    const data = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    };

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema en la autenticación');
            throw new Error(`Error: ${response.statusText}`);
        }

        // validar respuesta
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if (result.codigo === '00') {
            localStorage.setItem('result', JSON.stringify(result));
            window.location.replace('principal.html');
        } else {
            mostrarAlerta(result.mensaje);
        }

    } catch (error) {

        console.error('Error: Ocurrió un problema no identificado', error);
        mostrarAlerta('Error: Ocurrió un problema no identificado');

    }

}