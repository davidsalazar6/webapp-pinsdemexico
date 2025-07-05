import express from 'express';
import Order from '../models/Order.js';
import Status from '../models/Status.js';

const router = express.Router();

// GET: api/orders/SelectOrders
router.get('/SelectOrders', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Status,
          as: 'status'
        }
      ],
      order: [['createdDateTime', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// GET: api/orders/SelectOrder/:id
router.get('/SelectOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Status,
          as: 'status'
        }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

// POST: api/orders/CreateOrder
router.post('/CreateOrder', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Remove status object if included (we only need statusKey)
    delete orderData.status;
    
    const order = await Order.create(orderData);
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Status,
          as: 'status'
        }
      ]
    });
    
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order', details: error.message });
  }
});

// PUT: api/orders/UpdateOrder/:id
router.put('/UpdateOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    
    // Check if order exists
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Remove status object if included (we only need statusKey)
    delete orderData.status;
    
    // Update the order
    await order.update(orderData);
    
    // Return the updated order with status
    const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: Status,
          as: 'status'
        }
      ]
    });
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order', details: error.message });
  }
});

// DELETE: api/orders/DeleteOrder/:id
router.delete('/DeleteOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

export default router;