import express from 'express';
import { registrarDatoSensor, obtenerUltimosDatos } from '../controllers/esp32Controller.js';
// Opcional: Podrías querer proteger estas rutas en el futuro
// import checkAuth from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Ruta para que el ESP32 envíe datos. Es una petición POST.
router.post('/registrar-dato', registrarDatoSensor);

// Ruta para que el frontend pueda ver los datos registrados por los sensores
router.get('/ultimos-datos', obtenerUltimosDatos);


export default router;