

const URL = 'https://fakestoreapi.com/products'
const contenedor = document.getElementById('products');
let products = [];

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})

//Consulta a la API y si está ok, guarda los datos en Array products
//Se llama a la función que muestra el listado HTML showProducts
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        products = data;
        showProducts();
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}


//Recorre el array y muestra los datos 
function showProducts() {
    let html = '';
    for(i=0; i<products.length; i++){
        html = `
        <ul class="list-group">
            <li class="list-group-item">${cutString(products[i].title)}<br>
            ${stars(products[i].rating.rate)}
            ${dateTime()}</li>
        </ul>`;
        contenedor.innerHTML += html;
    } 
}

//Prepara el html de las estrellas
function stars(cantidad) {
    debugger;
    cantidad = Math.round(cantidad);
    let star = '';
    for(e=1; e<=cantidad; e++){
       star += `<span class="fa fa-star checked"></span>`;
    }
    for(let a = cantidad; a < 5; a++){
        star += `<span class="fa fa-star"></span>`;
    }
    
    return star;
}

//Corta el titulo si correspone con un maximo de 20 caracteres
function cutString(title) {
    const maxLength = 20;
    if (title.length <= maxLength){

        return title;
        
    } else return title.slice(0, maxLength) + '...';
}

//Toma la fecha de hoy
function dateTime(){
    // Obtén la fecha y hora actual
    const fechaHoraActual = new Date();

    // Extrae el año, mes, día, hora y minuto
    const año = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const hora = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minuto = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundo = String(fechaHoraActual.getSeconds()).padStart(2, '0');


    // Formatea la fecha y hora
    const fechaHoraFormateada = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

    return fechaHoraFormateada; 
}


