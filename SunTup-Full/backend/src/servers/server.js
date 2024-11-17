const express = require('express');
const cors = require('cors');
const Database = require('../config/database');
const clickerRouter = require('../app/clicker/clickerRouter');
const refRouter = require('../app/referals/refRouter');
const taskRouter = require('../app/tasks/taskRouter');

class Server {
  constructor() {
    this.app = express();

    // Настройка разрешенных источников
    this.origins = ['http://localhost:3000', 'http://188.225.10.94', 'https://suntap.fun'];

    // Настройка CORS
    this.app.use(
      cors({
        origin: this.origins, // Разрешенные источники
        credentials: true, // Разрешение передачи cookies и авторизационных данных
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
        allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
      })
    );

    // Подключение middleware для обработки данных в формате JSON
    this.app.use(express.json());

    // Стандартный эндпоинт
    this.app.get('/', (req, res) => {
      res.json({ message: 'Descoin Server is running!' });
    });

    // Подключение роутеров
    this.app.use('/', clickerRouter);
    this.app.use('/', refRouter);
    this.app.use('/', taskRouter);
  }

  run() {
    this.server = this.app.listen(3001, '0.0.0.0', () => {
      console.log('Server is running on http://0.0.0.0:3001');
    });

    process.on('SIGINT', () => {
      console.log('Received SIGINT (Ctrl+C)');
      this.stop();
    });
  }

  stop() {
    Database.closeConnection();
    this.server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  }
}

module.exports = Server;
