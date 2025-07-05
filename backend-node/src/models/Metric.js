import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Metric = sequelize.define('Metric', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subTitle: {
    type: DataTypes.STRING,
    field: 'sub_title'
  },
  svg: {
    type: DataTypes.TEXT
  },
  value: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'metrics',
  timestamps: false
});

export default Metric;