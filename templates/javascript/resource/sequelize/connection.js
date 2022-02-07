import { Sequelize } from 'sequelize'
import 'dotenv/config'

const initSequelize = () => {
    try {
        return new Sequelize(process.env.DB_URI, {
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                // ssl: {
                //     rejectUnauthorized: true
                // }
            }
        })
    } catch (error) {
        console.log('Unable to connect to the database. Ensure you have the right connection string');
    }
}

export const sequelize = initSequelize()

sequelize.sync()