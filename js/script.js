let operacion = ""; //Creamos una variable operacion que la utilizaremos a lo largo del codigo en diferentes métodos

const calcularMultiplicacion = (operacion) =>{ //Metodo para calcular la multiplicacion. Este método irá antes de sumar o restar debido a la prioridad de operacion
    const filtrarMultiplicacion = /(-?\d+(\.\d+)?)\s*\*\s*(-?\d+(\.\d+)?)/; //Creamos una expresion regular que filtre la multiplicacion y la resuelva antes que las sumas y restas

    while(filtrarMultiplicacion.test(operacion)){ //Buscamos todas las multiplicaciones de la operacion hasta que no hayan mas, momento donde la expresion regular dará false
            operacion = operacion.replace(filtrarMultiplicacion, (match, a, b, c) => {
            let resultado = parseFloat(a) * parseFloat(c);
            return resultado; 
        });
    }
    return operacion; //Devolvemos la operación con las multiplicaciones despejadas
}

const calcularResto = (operacion) => { //Metodo para calcular las sumas y restas de la operación. Este método irá depués del método superior para multiplicar

    const filtrarResto = /(-?\d+(\.\d+)?)\s*([+\-])\s*(-?\d+(\.\d+)?)/; //Expresion regular que busca las sumas y restas de la operación

    while(filtrarResto.test(operacion)){ //Buscamos todas las sumas y restas de la operacion hasta que no hayan mas, momento donde la expresion regular dará false
        operacion = operacion.replace(filtrarResto, (match, a, b, operador, c) => {
            let resultado = 0;
            let numerador = parseFloat(a);
            let denominador = parseFloat(c);

            if(operador === "+"){ //Comprobamos si la operación encontrada es una suma o una resta
                resultado = numerador + denominador;
            } else if(operador === "-"){
                resultado = numerador - denominador;
            }

            return resultado.toString();
        });
    }

    return operacion; //Devolvemos la operación resuelta

}

document.addEventListener('click', ({ target }) => { //Este método escuchará todos los eventos de click en un boton junto con su valor
    if (target.matches('button')) { //Comprobamos si el boton que hemos pulsado es un número o punto decimal, el igual o el de borrar
        if(target.textContent == "C"){ //Si el botoón pulsado es C reiniciamos la operacion a 0 y la pantalla vacía
            document.getElementById("pantalla").innerHTML = 0;
            operacion = "";
        } else if(target.textContent == "="){ //Si pulsamos el boton de igual llamamos a las funciones de multiplicar y sumar y restar, pasando por parámetro la operación introducida
            let resultado = calcularMultiplicacion(operacion); //Despejamos las multiplicaciones
            resultado = calcularResto(resultado); //Resolvemos las sumas y las restas
            operacion = resultado; //Asignamos el resultado a la operación por si queremos seguir trabajando en la misma
            document.getElementById("pantalla").innerHTML = resultado; //Mostramos el resultado por pantalla
        } else{ //Cualquier otro botón supondrá un número o el punto decimal
            if(document.getElementById("pantalla").textContent == 0 && target.textContent != "." && document.getElementById("pantalla").textContent != "0." || document.getElementById("pantalla").textContent == "undefined"){
                document.getElementById("pantalla").textContent = ""; //Esta condicion comprueba si hemos introducido una entrada válida
            }
            document.getElementById("pantalla").innerHTML += target.textContent; //Añadimos el número tanto a la operación como a la información en pantalla
            operacion += target.textContent;
        }
    }
});