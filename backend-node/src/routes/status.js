import express from 'express';
import Status from '../models/Status.js';

const router = express.Router();

// GET: api/status
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.findAll({
      order: [['name', 'ASC']]
    });
    
    if (!statuses || statuses.length === 0) {
      return res.status(404).json({ error: 'No statuses found' });
    }
    
    res.json(statuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ error: 'Error fetching statuses' });
  }
});

// GET: api/status/:key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const status = await Status.findByPk(key);
    
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    
    res.json(status);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Error fetching status' });
  }
});

// POST: api/status (create new status)
router.post('/', async (req, res) => {
  try {
    const statusData = req.body;
    const status = await Status.create(statusData);
    res.status(201).json(status);
  } catch (error) {
    console.error('Error creating status:', error);
    res.status(500).json({ error: 'Error creating status', details: error.message });
  }
});

// PUT: api/status/:key (update status)
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const statusData = req.body;
    
    const status = await Status.findByPk(key);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    
    await status.update(statusData);
    res.json(status);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Error updating status', details: error.message });
  }
});

// DELETE: api/status/:key (delete status)
router.delete('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const status = await Status.findByPk(key);
    
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    
    await status.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting status:', error);
    res.status(500).json({ error: 'Error deleting status' });
  }
});

export default router;