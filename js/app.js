//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const cursos = document.querySelector('#lista-cursos');
let carritoDeCompra = [];

//Funciones
setEventListeners();
function setEventListeners(){
    cursos.addEventListener('click', agregarCursos);

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () =>{
        carritoDeCompra = JSON.parse(localStorage.getItem('carrito'))|| [];
        carritoHTML();
    })  

    vaciarCarritoBtn.addEventListener('click', () =>{
        carritoDeCompra = [];
        limpiarHTML();
    })
}
function agregarCursos(e){
    e.preventDefault();
    ;
    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        readCurseInfo(cursoSeleccionado);
    }
}
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoid = e.target.getAttribute('data-id');

        //Eliminar del arreglo carritoDeCompra por el data-id

        carritoDeCompra = carritoDeCompra.filter(curso => {
            if(curso.id === cursoid){
                if(curso.cantidad){
                    curso.cantidad--;
                    return curso;
                }else{
                    delete curso;
                }
            }else{
                return curso;
            }
        });

        //carritoDeCompra = carritoDeCompra.filter(curso => curso.id !== cursoid);

        carritoHTML(); // iterar para eliminar html

    }
}

function readCurseInfo(curso){
    const curseInfo = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad:1,
        id: curso.querySelector('a').getAttribute('data-id'),
    }
    
    //Revisar si un curso se repite en el carrito
    const existe = carritoDeCompra.some( curso => curso.id === curseInfo.id);
    if(existe){
        const cursos = carritoDeCompra.map(curso =>{
            if(curso.id === curseInfo.id){
                curso.cantidad++;
                return curso
            }else{
                return curso;
            }
        })
        carritoDeCompra = [...cursos];    
    }else{
        carritoDeCompra = [...carritoDeCompra,curseInfo];
    }

    carritoHTML();
}

function carritoHTML(){
    //Limpiar Carrito

    limpiarHTML();
    
    //Generar Html recorriendo en carrito
    carritoDeCompra.forEach( curso =>{
        const{imagen,titulo,precio,cantidad,id}= curso; //Destructuring para limpiar el codigo

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${id}> X</a>
        </td>`
        
     //Agregando HTML al tbody
   
    contenedorCarrito.appendChild(row);   
    });
    cartLocalStorage()
}

function cartLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carritoDeCompra));
}


//Elimina el html que se repite
function limpiarHTML(){
    //contenedorCarrito.innerHTML = ``; //Forma 1

    while(contenedorCarrito.firstChild){  //Forma 2
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}