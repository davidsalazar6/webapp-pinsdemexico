import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Status from './Status.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'client_name'
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'product_name'
  },
  statusKey: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'status_key',
    references: {
      model: Status,
      key: 'key'
    }
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  payInAdvance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    field: 'pay_in_advance'
  },
  createdDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_date_time'
  },
  updatedDateTime: {
    type: DataTypes.DATE,
    field: 'updated_date_time'
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'created_by'
  },
  updatedBy: {
    type: DataTypes.STRING,
    field: 'updated_by'
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    field: 'invoice_number'
  },
  paymentDate: {
    type: DataTypes.DATE,
    field: 'payment_date'
  },
  trackingNumber: {
    type: DataTypes.STRING,
    field: 'tracking_number'
  }
}, {
  tableName: 'orders',
  timestamps: false,
  // Virtual fields (computed properties)
  hooks: {
    afterFind: (orders) => {
      if (Array.isArray(orders)) {
        orders.forEach(order => addComputedFields(order));
      } else if (orders) {
        addComputedFields(orders);
      }
    }
  }
});

// Add computed fields
function addComputedFields(order) {
  if (order.dataValues) {
    order.dataValues.total = parseFloat(order.quantity) * parseFloat(order.price);
    order.dataValues.subtotal = order.dataValues.total - parseFloat(order.payInAdvance);
  }
}

// Define associations
Order.belongsTo(Status, { foreignKey: 'statusKey', as: 'status' });
Status.hasMany(Order, { foreignKey: 'statusKey' });

export default Order;