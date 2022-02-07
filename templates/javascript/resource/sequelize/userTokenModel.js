import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

const User = sequelize.define('UserToken', {
    userID: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expiryDt: {
        type: DataTypes.DATE,
    }
})

export default User