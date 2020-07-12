
var borrar = document.getElementById("botonBorrar");
var cuadrito = document.getElementById("area_de_dibujo");
var radiosB = document.getElementsByName("radios");
var papel = cuadrito.getContext("2d");
var x = 150;
var y = 150;
//devuelve el tamaño de un elemento y su posición con respecto a la ventana grafica en este caso el canvas
var limitesPapel = cuadrito.getBoundingClientRect(); 
var empezarAdibujar = false;

var ultimas2teclas = {};

var teclas = {
    UP: 38,
    DOWM: 40,       //Vector donde guardo variables
    LEFT: 37,
    RIGH: 39
};
  

for(var i = radiosB.length; i--;)
{
    radiosB[i].onclick = ("handler",queHacer);
    
}


function queHacer()
{   //Si el RadioBoton está en dibujar con las flechas, hago esto
    if(radiosB[0].checked == true)
    {   
        cuadrito.removeEventListener("mousedown", queHacer, true);
        document.addEventListener("keydown", dibujarTeclado, true);
        document.addEventListener("keyup", limpiartecla =>{
            delete ultimas2teclas[limpiartecla.keyCode]; //borra del registro la ultima tecla precionada
            console.log(ultimas2teclas);
        });
    }
    //si el radioBoton esta seleccionado para dibujar con el mouse, hago esto.
    else if(radiosB[1].checked == true)
    {   
        document.removeEventListener("keydown", dibujarTeclado, true); //apago el evento key
        cuadrito.addEventListener("mousedown", posicionMouse =>{
            x = posicionMouse.clientX - limitesPapel.left;
            y = posicionMouse.clientY - limitesPapel.top;
            empezarAdibujar = true;
        }
        );

        cuadrito.addEventListener("mousemove", posicionMouse =>{
            if(empezarAdibujar == true)
            {
                DibujarLinea("violet", x, y, (posicionMouse.clientX - limitesPapel.left), (posicionMouse.clientY - limitesPapel.top), papel);
                x = posicionMouse.clientX - limitesPapel.left;
                y = posicionMouse.clientY - limitesPapel.top;
            }
        }
        );

        window.addEventListener("mouseup", posicionMouse =>{
            if(empezarAdibujar == true)
            {
                x = posicionMouse.clientX - limitesPapel.left;
                y = posicionMouse.clientY - limitesPapel.top;
                empezarAdibujar = false;
            }
        });
        
    }
}


//dibuja en el canvas con las flechas las flechas
function dibujarTeclado(touch)
{   
    ultimas2teclas[touch.keyCode] = true; //bandera de que la tecla está presionada
    var colorcito = "blue";
    var movimiento = 5;

    //Aca no se que pasa que no me toca está diagonal, creo que logicamente está correcto
    if(ultimas2teclas[38] == true && ultimas2teclas[39] == true)
    {
        colorcito = "black";
        DibujarLinea(colorcito, x, y, (x + movimiento), (y - movimiento), papel);
        x = x + movimiento;
        y = y - movimiento;
        return
    }
    else if(ultimas2teclas[38] == true && ultimas2teclas[37] == true)
    {
        colorcito = "black";
        DibujarLinea(colorcito, x, y, (x - movimiento), (y - movimiento), papel);
        x = x - movimiento;
        y = y - movimiento;
        return
    }
    else if(ultimas2teclas[37] == true && ultimas2teclas[40] == true)
    {
        colorcito = "black";
        DibujarLinea(colorcito, x, y, (x - movimiento), (y + movimiento), papel);
        x = x - movimiento;
        y = y + movimiento;
        return
    }
    else if(ultimas2teclas[40] == true && ultimas2teclas[39] == true)
    {
        colorcito = "black";
        DibujarLinea(colorcito, x, y, (x + movimiento), (y + movimiento), papel);
        x = x + movimiento;
        y = y + movimiento;
        return
    }
    else if (touch.keyCode == teclas.UP)  
    {
        colorcito = "red";
        DibujarLinea(colorcito, x, y, x, y - movimiento, papel);
        y = y - movimiento;
    }
    else if (touch.keyCode == teclas.DOWM)  
    {
        colorcito = "blue";
        DibujarLinea(colorcito, x, y, x, y + movimiento, papel);
        y = y + movimiento;
    }
    else if (touch.keyCode == teclas.RIGH)  
    {
        colorcito = "green";
        DibujarLinea(colorcito, x, y, x + movimiento, y, papel);
        x = x + movimiento;
    }
    else if (touch.keyCode == teclas.LEFT)  
    {
        colorcito = "yellow";
        DibujarLinea(colorcito, x, y, x - movimiento, y, papel);
        x = x - movimiento;
    }         
}

//funcion para dibujar en el canvas
function DibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
    lienzo.beginPath();      //indica que inicie el dibujo   
    lienzo.strokeStyle = color; //atributo para darle el color a la linea
    lienzo.lineWidth = 3;       //le damos grosor a la linea de 2 pixeles
    lienzo.moveTo(xinicial,yinicial); //desde donde comienzo a trazar, parate en el punto x, y
    lienzo.lineTo(xfinal,yfinal); //hasta donde voy a trazar, hasta el punto x, y
    lienzo.stroke();        //.stroke funcion para trazar la linea
    lienzo.closePath();     //dejamos de trazar la linea
}

//boton borrar, borra todo lo que hay en el canvas
borrar.addEventListener("click", borrarPizarra);
function borrarPizarra()
{
    papel.clearRect(1, 1, cuadrito.width, cuadrito.height );
    x = 150;
    y = 150;

}