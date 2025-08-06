// Array para almacenar los nombres de los amigos
let amigos = [];

// Función que agrega los nombres de los amigos a una lista y los almacena en un array
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido");
        return;
    }

    // Agregar el nombre del array
    amigos.push(nombre);

    // Crear una li y suma el nombre a la lista de sorteados
    const lista = document.getElementById('listaAmigos');
    const li = document.createElement('li');
    li.textContent = nombre;
    lista.appendChild(li);

    // Limpiar el input
    input.value = "";
}

// Función para realizar el sorteo y muestra el resultado
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Agrega al menos dos amigos para hacer el sorteo");
        return;
    }

    // Crear una copia de la lista de amigos para no modificar el original
    const amigosCopia = [...amigos];

    // Array que guarda los resultados
    const resultados = {};

    // Sortear los amigos en pares, velidando que nadie se asigna a sí mismo
    while (amigosCopia.length > 0) {
        const indexSorteo = Math.floor(Math.random() * amigosCopia.length);
        const amigoSorteado = amigosCopia.splice(indexSorteo, 1)[0];

        let asignado;
        do {
            const indexAsignacion = Math.floor(Math.random() * amigos.length);
            asignado = amigos[indexAsignacion];
        } while (asignado === amigoSorteado || Object.values(resultados).includes(asignado));


        resultados[amigoSorteado] = asignado;
    }

    // Genera el mensaje con los resultados
    let mensaje = "🎁 Resultado del sorteo de Amigo Secreto:\n\n 🎁";
    for (const [sorteado, asignado] of Object.entries(resultados)) {
        mensaje += `${sorteado} debe regalar a ${asignado}\n`;
    }

    // Muestra los resultados en una ventana emergente
    alert(mensaje);

    // Deja los resultados en la pantalla
const resultadoUl = document.getElementById('resultado');
resultadoUl.innerHTML = "";
for (const [sorteado, asignado] of Object.entries(resultados)) {
    const li = document.createElement('li');
    li.textContent = `${sorteado} debe regalar a  ${asignado}`;
    resultadoUl.appendChild(li);
}

}
//funcion para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = []; // Limpia el array de amigos
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('nuevoSorteoBtn').style.display = "none";
}

// Agrega el event listener al botón después de definir las funciones
document.getElementById('nuevoSorteoBtn').addEventListener('click', reiniciarSorteo);
