import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Status = sequelize.define('Status', {
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'status',
  timestamps: false
});

export default Status;