class FilaPost {

    constructor(publicacionUsuario){
        this.publicacionUsuario = publicacionUsuario;
    }

    render = () => {
        let component = document.createElement('div');
        component.className = 'filaFeed';

        let postFeed = document.createElement('div'); //publicacion
        postFeed.innerHTML = this.publicacionUsuario.post;
        

        let nombreFeed = document.createElement('div'); //nombre
        nombreFeed.className = "nombreFeed";
        nombreFeed.innerHTML = this.publicacionUsuario.usuario;

        let divComentario = document.createElement('div'); //comentarios
        divComentario.className = "comentarios";
        
        let inputResponder = document.createElement('input'); //input responder
        inputResponder.className = "inputResponderPost";
        inputResponder.innerHTML = '';
        
        let botonResponder = document.createElement('button'); //boton responder
        botonResponder.className = "botonResponderPost";
        botonResponder.innerHTML = 'Responder';

        let divMensaje = document.createElement('div');

        let database = firebase.database();
        botonResponder.addEventListener('click', ()=>{
            
            let Comentario = {
                comentario: inputResponder.value
            }
            
            database.ref('usuarios/blog/'+this.publicacionUsuario.id+'/comentarios').push().set(Comentario);
            
            divMensaje.className = "mensajesRespuetas";
            divMensaje.innerHTML = Comentario.comentario;
            divComentario.appendChild(divMensaje);
        });         
        
               
        component.appendChild(postFeed);
        component.appendChild(nombreFeed);
        component.appendChild(divComentario);
        component.appendChild(inputResponder);
        component.appendChild(botonResponder);
        

        return component;
    }

}