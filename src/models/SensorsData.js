import mongoose from 'mongoose';

const sensorDataSchema = mongoose.Schema({
    // A qué paciente o cita podríamos asociar esta lectura. Es opcional.
    // paciente: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Paciente'
    // },
    tipoSensor: {
        type: String,
        required: true,
        trim: true,
        enum: ['temperatura', 'humedad', 'movimiento'] // Podemos limitar los tipos de sensores
    },
    valor: {
        type: String, // Usamos String para que sea flexible, pero podría ser Number
        required: true,
        trim: true,
    },
    unidad: {
        type: String,
        trim: true, // ej. "°C", "%", "detectado"
    },
    dispositivoId: {
        type: String, // Para saber qué ESP32 envió el dato
        trim: true
    }
}, {
    timestamps: true // Para saber cuándo se recibió el dato
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);
export default SensorData;