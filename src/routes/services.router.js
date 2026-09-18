import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager('./src/data/services.json');

router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;
        let services = await serviceManager.getServices();

        if (category) {
            services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }

        if (available !== undefined) {
            const isAvailable = available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        res.status(200).json({ status: 'success', data: services });
    }

    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await serviceManager.getServiceById(sid);

    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, duration, price, category, available } = req.body;

    if (!name || !description || duration === undefined || price === undefined || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos obligatorios para crear el servicio'
      });
    }

    const parsedDuration = Number(duration);
    const parsedPrice = Number(price);
    
    if (Number.isNaN(parsedDuration) || parsedDuration <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'duration debe ser un número válido mayor a 0'
      });
    }

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'price debe ser un número válido mayor a 0'
      });
    }

    const parsedAvailable = available !== undefined 
      ? (available === true || available === 'true') 
      : true;  

    const newService = await serviceManager.addService({
      name: name.trim(),
      description: description.trim(),
      duration: parsedDuration,
      price: parsedPrice,
      category: category.trim(),
      available: parsedAvailable
    });

    res.status(201).json({ status: 'success', data: newService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const updatedData = req.body;

    delete updatedData.id;

    const updatedService = await serviceManager.updateService(sid, updatedData);

    if (!updatedService) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para actualizar' });
    }

    res.status(200).json({ status: 'success', data: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await serviceManager.deleteService(sid);
        if (!deletedService) {
            return res.status(404).json({ status: 'error', message: 'Servicio no encontrado para eliminar' });
        }
        res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente', data: deletedService });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;