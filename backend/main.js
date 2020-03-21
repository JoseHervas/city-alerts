const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());

server.get('/', (req, res) => {
    res.send("Hola mundo!")
})

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})