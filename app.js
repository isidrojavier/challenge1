function encriptar(){
    //compruebo que el texto del textarea esté con los caracteres que se me piden
    //en caso contrario saco un mensaje con una ventana flotante
    if (document.getElementById("texto1").value != ""){
        //si el resultado de comprobar2 es falso, hay caracteres no permitidos
        if (comprobar2() == false){
            //Mandamos un aviso y corregimos
            abrirventana();
            document.getElementById("texto1").value = corregir();
        }
        //oculto la imagen y la información
        //podía haber hecho que fueran dentro del textarea, pero me apetecía probar cosas
        document.getElementById("muneco").style.display = "none";
        document.getElementById("info").style.display = "none";
        document.getElementById("texto3").style.display = "block";
        document.getElementById("btcopiar").style.display = "block";

        //llamo a la verdadera función de encriptado
        encriptado();
    }
}

function desencriptar(){
    //similar a la anterior, pero llamando a la función de desencriptación
    if (document.getElementById("texto1").value != ""){
        if (comprobar2() == false){
            abrirventana();
            document.getElementById("texto1").value = corregir();
        }
        
        document.getElementById("muneco").style.display = "none";
        document.getElementById("info").style.display = "none";
        document.getElementById("texto3").style.display = "block";
        document.getElementById("btcopiar").style.display = "block";
        desencriptado();
    }
}

function corregir(){
    textito = document.getElementById("texto1").value;

    console.log(textito);

    //convertimos todas las letras mayúsculas a minúsculas
    textito = textito.toLowerCase();
    
    //detectamos las tildes y símbolos como la ñ y los cambiamos a formato aceptado
    textito = textito.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    //eliminamos el resto de caracteres
    textito = textito.replace(/[^a-zA-Z0-9 ]/g, '')

    return textito;
}

function desencriptado(){
//Esta forma me gusta más, primero habría que buscar la coincidencia de la palabra
//Esto estaría más o menos resuelto y luego en un nuevo string ingresariamos todos
//los caracteres anteriores y seguiríamos adelante

    /*// esta es la cadena donde buscaremos
let cadena = document.getElementById("texto1").value;
// esta es la palabra a buscar
let termino = "ufat";
// para buscar la palabra hacemos
let posicion = cadena.indexOf(termino);
if (posicion !== -1)
    console.log("La palabra está en la posición " + posicion);
else
    console.log("No encontré lo que estás buscando");*/
//var cambio = ["ai","enter","imes","ober","ufat"];

// Este desencriptado funciona el 99% de las veces, siempre y cuando no coincidan la e,i,o,u en 
// el resultado de un cambio un conjunto de letras iguales a la palabra del siguiente a buscar 
    var textito = document.getElementById("texto1").value;
    nuevaFrase = textito.replaceAll("ai", 'a');
    nuevaFrase = nuevaFrase.replaceAll("enter",'e');
    nuevaFrase = nuevaFrase.replaceAll("imes", 'i');
    nuevaFrase = nuevaFrase.replaceAll("ober",'o');
    nuevaFrase = nuevaFrase.replaceAll("ufat", 'u');

    document.getElementById("texto2").value = nuevaFrase;
}

function copiar(id_elemento) {
    // Esta versión me funciona, pero la función execCommand no es recomendada ya que va a desaparecer
    // Hago una pequeña trampa, ya que primero le paso el valor al un input que lo podría quitar y luego elimino el imput
    /* Crea un campo de texto "oculto"
    var aux = document.createElement("input");
    // Asigna el contenido del elemento especificado al valor del campo
    console.log(document.getElementById(id_elemento).value);
    aux.setAttribute("value", document.getElementById(id_elemento).value);
    // Añade el campo a la página
    document.body.appendChild(aux);
    // Selecciona el contenido del campo
    aux.select();
    // Copia el texto seleccionado
    // ojo con este método, indica la documentación que está deprecated
    // document.execCommand("copy");
    // Elimina el campo de la página
    document.body.removeChild(aux);
    */
    //-----------------------------------------------------------------------------------------
    /* recogemos el valor del textarea con value, lo suelo ver con innerHTML, pero me
    da error. Por las prisas, lo dejo así. Utilizo la API Clipboard para pasarle el valor
    
    La API Clipboard proporciona operaciones asincrónicas de lectura y escritura
    mediante las cuales puede copiar y pegar contenido hacia y desde el portapapeles.
    La API del Portapapeles está disponible dentro del objeto navigator.clipboard.*/
    navigator.clipboard.writeText (document.getElementById(id_elemento).value)
        .then(() => {console.log('Texto copiado')})
        .catch(err => {
        console.log('Ha habido algún error', err);
        });
  }

function comprobar2(){
    // lo que hago es en letras dejar todas las letras y luego ir comparándolas
    var letras="abcdefghijklmnñopqrstuvwxyz";
    var textito = document.getElementById("texto1").value;

    for(i=0; i<textito.length; i++){
        //comparo que el caracter del texto esté dentro del conjunto letras y 
        //como el espacio también está permitido, pregunto por él
        if ((letras.indexOf(textito.charAt(i),0)!=-1) || textito.charAt(i) == " ") {
            //la letra es minúscula o un espacio
           //return true;
        } 
        else {
            //existe un caracter que no está dentro de letras, por lo que la función
            //devuelve false
            return false;
        }
    }
    return true;
}

function encriptado(){
    //Esta función es fácil, vamos a ir letra a letra buscando coincidencias y lo
    //cambiamos por lo que se pide para el encriptamiento. Seguro que lo podría hacer
    //más rápido, pero he pensado que si utilizaba la forma de desencriptar, existirían
    //más posibilidades de que fallara el encriptador y no sería aceptable
    var textito = document.getElementById("texto1").value;
    var nuevotexto = new String;
    var posicioncambio = 1;
    var letracambio = "ai";

    for(i=0; i<textito.length; i++){
        switch (textito.charAt(i)) {
            case 'a':
             nuevotexto = nuevotexto + "ai";
            break;
            case 'e':
                nuevotexto = nuevotexto + "enter";
            break;
            case 'i':
                nuevotexto = nuevotexto + "imes";
            break;
            case 'o':
                nuevotexto = nuevotexto + "ober";
            break;
            case 'u':
                nuevotexto = nuevotexto + "ufat";
            break;
            default:
                nuevotexto = nuevotexto + textito.charAt(i);
        }
    }
    document.getElementById("texto2").value = nuevotexto;
}

function limpiar(){
    document.getElementById("texto1").value="";
    document.getElementById("texto2").value="";
    document.getElementById("texto3").style.display = "none";
    document.getElementById("btcopiar").style.display = "none";
    document.getElementById("muneco").style.display = "block";
    document.getElementById("info").style.display = "block";
}

function abrirventana(){
    // Obtenemos el id de la ventana modal
    var modal = document.getElementById("miModal");

    // Obtenemos el span del elemento que cierra la ventana modal
    var span = document.getElementsByClassName("cerrar")[0];

    modal.style.display = "block";

    // Cerramos la ventana modal cuando se hace click en la X
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cerramos la ventana modal cuando se hace click en cualquier sitio que no sea modal
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}