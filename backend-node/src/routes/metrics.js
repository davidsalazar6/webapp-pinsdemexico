import express from 'express';
import { Op } from 'sequelize';
import Metric from '../models/Metric.js';
import Order from '../models/Order.js';

const router = express.Router();

// GET: api/metrics
router.get('/', async (req, res) => {
  try {
    const metrics = await Metric.findAll();
    const orders = await Order.findAll();
    
    if (!metrics || metrics.length === 0) {
      return res.status(404).json({ error: 'No metrics found' });
    }
    
    // Calculate metrics based on orders
    const calculatedMetrics = calculateMetrics(metrics, orders);
    
    res.json(calculatedMetrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Error fetching metrics' });
  }
});

// Function to calculate metrics (equivalent to C# CalculateMetrics)
function calculateMetrics(metrics, orders) {
  // Count orders by status
  const counts = {
    'Completed': orders.filter(x => x.statusKey === 'Completed').length,
    'Pending': orders.filter(x => x.statusKey === 'Pending').length,
    'Canceled': orders.filter(x => x.statusKey === 'Canceled').length
  };
  
  // Calculate total for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const last30DaysOrders = orders.filter(x => 
    new Date(x.createdDateTime) >= thirtyDaysAgo
  );
  
  const totalLast30Days = last30DaysOrders.reduce((sum, order) => {
    const total = parseFloat(order.quantity) * parseFloat(order.price);
    return sum + total;
  }, 0);
  
  // Update metrics with calculated values
  return metrics.map(metric => {
    const updatedMetric = { ...metric.dataValues };
    
    switch (metric.title) {
      case 'Pedidos completados':
        updatedMetric.value = counts['Completed'].toString();
        break;
      case 'Pedidos pendientes':
        updatedMetric.value = counts['Pending'].toString();
        break;
      case 'Pedidos cancelados':
        updatedMetric.value = counts['Canceled'].toString();
        break;
      case 'Total Facturado':
        updatedMetric.value = totalLast30Days.toLocaleString('es-MX', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        break;
      case 'Total IVA':
        updatedMetric.value = 'Pendiente...';
        break;
      case 'Total por pagar':
        updatedMetric.value = 'Pendiente...';
        break;
      default:
        // Keep original value
        break;
    }
    
    return updatedMetric;
  });
}

// GET: api/metrics/dashboard (alternative endpoint with more detailed metrics)
router.get('/dashboard', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: ['status']
    });
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const last30DaysOrders = orders.filter(x => 
      new Date(x.createdDateTime) >= thirtyDaysAgo
    );
    
    const dashboardMetrics = {
      totalOrders: orders.length,
      completedOrders: orders.filter(x => x.statusKey === 'Completed').length,
      pendingOrders: orders.filter(x => x.statusKey === 'Pending').length,
      canceledOrders: orders.filter(x => x.statusKey === 'Canceled').length,
      last30DaysRevenue: last30DaysOrders.reduce((sum, order) => {
        const total = parseFloat(order.quantity) * parseFloat(order.price);
        return sum + total;
      }, 0),
      last30DaysOrderCount: last30DaysOrders.length
    };
    
    res.json(dashboardMetrics);
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    res.status(500).json({ error: 'Error fetching dashboard metrics' });
  }
});

export default router;