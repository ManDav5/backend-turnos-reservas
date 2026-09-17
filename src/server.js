import app from './app.js';
import {config} from './config/env.config.js';

const PORT = config.port || 8080;

app.listen (PORT, () => {
    console.log (`Servidor corriendo en http://localhost:${PORT}`);
});