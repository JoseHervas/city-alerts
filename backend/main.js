const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainController = require('./controllers/users.controller');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth.controller');
const alertsController = require('./controllers/alerts.controller');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());

server.post('/user', mainController.insertUser);

server.get('/user/:_id', authController.validateToken, mainController.getUserById);

server.get('/users', authController.validateToken , mainController.getAllUsers);

server.put('/user', authController.validateToken, mainController.updateUser);

server.delete('/user/:_id', authController.validateToken, mainController.deleteUser);

server.post("/login", authController.login);

server.post("/alert", authController.validateToken, alertsController.insertAlert);

server.get("/alerts", authController.validateToken, alertsController.getAllAlerts)

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})