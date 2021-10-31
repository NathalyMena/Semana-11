const nombreUsuario = document.getElementById('nombreUsuario'); //input
const postUsuario = document.getElementById('postUsuario'); //input
const publicarBoton = document.getElementById('publicarBoton'); //boton
const respuestasContainer = document.getElementById('respuestasContainer'); //parte donde aparecen las respuestas

const database = firebase.database();

//funciones

publicar = () => {

    if(nombreUsuario.value === ''|| postUsuario ===''){ //hace que no permita seguir sino se llenan los espacios
        alert('Campo Vacio');
        return;
    }

    let referencia = database.ref('usuarios/blog').push();
    let publicacionUsuario = {
        id: referencia.key, //extraer referencia que nos da el push
        usuario: nombreUsuario.value,
        post: postUsuario.value,
    };

    referencia.set(publicacionUsuario);

    nombreUsuario.value='';
    postUsuario.value='';
}

publicarBoton.addEventListener('click', publicar);

//lectura
database.ref('usuarios/blog').on('value', function(data) {
    data.forEach(
        publicacionUsuario => {
            let valor = publicacionUsuario.val();
            console.log(valor.post)

            let fila = new FilaPost(valor);
            respuestasContainer.appendChild(fila.render());
        }
    )

});