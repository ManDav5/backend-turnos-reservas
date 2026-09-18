import { Router } from 'express';
import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();

const bookingManager = new BookingManager('./src/data/bookings.json');
const serviceManager = new ServiceManager('./src/data/services.json');

router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body;

    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos obligatorios (clientName, clientEmail, date, time)'
      });
    }
    const newBooking = await bookingManager.createBooking({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      date,
      time,
      status: status ? status.trim() : 'pending'
    });
    res.status(201).json({ status: 'success', data: newBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:bid', async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingManager.getBookingById(bid);
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Reserva no encontrada'
      });
    }
    res.status(200).json({ status: 'success', data: booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/:bid/services/:sid', async (req, res) => {
  try {
    const { bid, sid } = req.params;
    
    const service = await serviceManager.getServiceById(sid);
    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'El servicio indicado no existe'
      });
    }

    const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);

    if (!updatedBooking) {
      return res.status(404).json({
        status: 'error',
        message: 'La reserva indicada no existe'
      });
    }
    res.status(200).json({ status: 'success', data: updatedBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
export default router;