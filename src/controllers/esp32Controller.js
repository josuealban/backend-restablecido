import SensorData from '../models/SensorData.js';

const registrarDatoSensor = async (req, res) => {
    // El ESP32 enviará los datos en el cuerpo (body) de la petición POST
    console.log('Datos recibidos desde el ESP32:', req.body);

    const { tipoSensor, valor, unidad, dispositivoId } = req.body;

    // Validación básica
    if (!tipoSensor || !valor) {
        return res.status(400).json({ msg: 'Los campos tipoSensor y valor son obligatorios' });
    }

    try {
        const nuevoDato = new SensorData(req.body);
        await nuevoDato.save();
        res.status(201).json({ msg: 'Dato recibido y guardado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor al guardar el dato' });
    }
};

const obtenerUltimosDatos = async (req, res) => {
    try {
        // Obtenemos los últimos 10 registros, por ejemplo
        const datos = await SensorData.find().sort({ createdAt: -1 }).limit(10);
        res.json(datos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener los datos' });
    }
}


export {
    registrarDatoSensor,
    obtenerUltimosDatos
};