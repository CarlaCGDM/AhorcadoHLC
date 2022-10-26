const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const regex = new RegExp("^[a-zA-Z]+$");
let vidas = 6;
let palabra="";
let adivinada="";

//Guardar la palabra del usuario

function guardarPalabra() {
    palabra = document.getElementById("input_palabra").value;
    //validar la palabra aqui
    if (regex.test(palabra) == true) {
        localStorage.setItem("palabra", palabra.toUpperCase());
        document.location.href = "juego.html";
    } else {
        document.getElementById("errores").innerHTML = "<p>Sólo se permiten letras en la palabra :(</p>";
    }
}

//Cargar la página

function onLoad() {
    //Palabra del usuario
    palabra = localStorage.getItem('palabra');
    adivinada = new Array(palabra.length).fill("_");
    document.getElementById("adivinada").innerHTML = adivinada.join(" ");
    //Letras
    generarBotonesLetras(letras);
}

//Generar un botón por letra

function generarBotonesLetras(letras) {
    for (let i = 0; i < letras.length; i++) {

        //Crear boton

        let letra = letras[i];
        const btn = document.createElement("button");
        btn.innerHTML = letra;
        btn.value = letra;
        btn.className = "boton_letra";
        btn.onclick = () => {

            //aqui falta la llamada a la funcion que comprueba si la letra está en la palabra
            document.getElementById("dibujo").src = "img/hangman" + vidas.toString() + ".png";
            btn.parentNode.removeChild(btn);
            iteracionBucleJuego(letra);
        }

        //Insertar boton
        document.getElementById("letras").appendChild(btn);
    }
}

//Bucle del juego

function iteracionBucleJuego(letra) {

        //Comprobar si la letra está en la palabra
        let acierto = false;
        for (let i=0;i<palabra.length;i++) {
            if (palabra[i] == letra) {
                adivinada[i] = letra;
                acierto = true;
            } 
        }
        if (acierto == false) {vidas--}
        document.getElementById("dibujo").src = "img/hangman" + vidas.toString() + ".png";
        document.getElementById("adivinada").innerHTML = adivinada.join(" ");

        //Comprobar si se ha ganado
        if (palabra  == adivinada.join("")) {
            document.getElementById("letras").innerHTML = "<p id='ganaste'>ganaste!</p>"
        }

        if (vidas == 0) {
            document.getElementById("letras").innerHTML = "<p id='perdiste'>perdiste!</p>"
        }
}


//window.localstorage