import express from 'express';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';

const app = express();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Bienvenido a la API de Turnos y Reservas',
    endpoints: {
      services: '/api/services',
      bookings: '/api/bookings'
    }
  });
});

app.use(express.json ());
app.use(express.urlencoded({extended:true}));

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;