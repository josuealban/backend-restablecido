// src/index.ts (Archivo Principal)
import express from 'express';
import cors from 'cors'; 
import { esp32Routes } from './routes/esp32.routes.ts/esp32.routes';

// Crea una instancia de la aplicación Express
const app = express();
const port = 3000;

// Configura los middlewares principales
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones en formato JSON

// Asigna las rutas definidas en 'esp32.routes.ts' al prefijo '/api'
app.use('/api', esp32Routes);

// Inicia el servidor para que escuche en el puerto y la dirección IP
app.listen(port, '0.0.0.0', () => { 
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
