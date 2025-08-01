// ... otros imports
import pacienteRoutes from './routes/pacienteRoutes.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import esp32Routes from './routes/esp32Routes.js'; // <-- IMPORTAR

// ... configuración de la app (app = express(), etc.)
app.use(express.json());
// ... conexión a la BD

// ... Rutas existentes
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/esp32', esp32Routes); // <-- USAR LA NUEVA RUTA

// ... resto del archivo