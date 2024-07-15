
// Cargar todo el JSON y lo ponemos en una variable
const lottery = require('./data/lottery.json');
const { format } = require('date-fns');
// Importar el paquete de terceros que acabamos de instalar. Fijaos que como se encuentra en la carpeta node_modules NO hace falta especificar ninguna ruta (al igual que pasa con los built-in modules)
const express = require('express');
const logger = require('morgan');

// Es generarme un objeto para gestionar el enrutamiento y otros aspectos de la aplicación
const app = express();

// Añadimos el middleware de morgan para loguear todas las peticiones que haga un cliente
app.use(logger('dev'));

// nos gustaría que también gestionaras los datos de tipo JSON (entre ellos los POST que nos lleguen)
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/api/check-date', (req, res) => {
    const date =req.query.date;
    const lotteri = lottery.find(fn =>  format(fn.draw_date, 'yyyy-MM-dd')== date);
    
   if (lotteri)
   {
  
    res.send({
        message : "Draw found",
        winningNumbers: lotteri.winning_numbers,
        supplementalnumbers: lotteri.supplemental_numbers,
        superball: lotteri.super_ball
    });
    
   }
   else
   {
    res.status(404).send({
        message: "Draw not found for the given date",
    });
   }
    // 1. Tenemos que informar al endpoint de tipo GET de una fecha en concreto. usaremos una query string para proveer de esta info
    // ¿Que aspecto va a tener una consulta para el 17 de mayo de 2024?
    // /api/check-date?date=2024-05-17

    // 2. Capturar/extraer el valor del parámetro 'date' 

    // 3. Buscar a ver si hay sorteo para la fecha 'date' en el lottery.json (cargar el JSON) require, readFileSync

    // 4. ¿Qué método de array vaís a usar para la busqueda? .find

    // 5. Suponemos de momento que siempre nos pasan una fecha que existe. 2020-09-25 . Tenemos que devolver un JSON con este formato

    /**
     * {
     *    "message" : "Draw found",
     *    "winningNumbers": "20 36 37 48 67 16 02"
     * }
     */
   

});


// Levantar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000.");
});