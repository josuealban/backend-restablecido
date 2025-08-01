// src/routes/esp32.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Define una interfaz para los datos de los sensores para mantener el tipado estricto
interface SensorData {
    temperatura: number;
    humedad: number;
    ultimaActualizacion: Date;
}

// Variable en memoria para almacenar los últimos datos
// En un proyecto real, aquí conectarías con tu base de datos
let datosSensores: SensorData = {
    temperatura: 0,
    humedad: 0,
    ultimaActualizacion: new Date()
};

// =========================================================================
// RUTA PARA EL ESP32
// Método: POST
// Endpoint: /api/datos
// Recibe un objeto JSON con los datos de temperatura y humedad del ESP32.
// =========================================================================
router.post('/datos', (req: Request, res: Response) => {
    // Se utiliza 'as any' para tratar el cuerpo de la petición como un objeto genérico
    // y evitar errores de tipado, ya que el compilador no conoce la estructura
    // de los datos que vienen del ESP32.
    const { temperatura, humedad } = req.body as any;
    
    if (temperatura !== undefined && humedad !== undefined) {
        datosSensores = {
            temperatura: parseFloat(temperatura),
            humedad: parseFloat(humedad),
            ultimaActualizacion: new Date()
        };
        console.log('Datos recibidos del ESP32:', datosSensores);
        res.status(200).json({ mensaje: 'Datos recibidos correctamente.' });
    } else {
        res.status(400).json({ error: 'Faltan datos de temperatura o humedad.' });
    }
});

// =========================================================================
// RUTA PARA EL FRONTEND (Angular)
// Método: GET
// Endpoint: /api/datos
// Sirve los últimos datos de los sensores al frontend.
// =========================================================================
router.get('/datos', (req: Request, res: Response) => {
    res.status(200).json(datosSensores);
});

// Exporta el router para que pueda ser usado en index.ts
export { router as esp32Routes };
