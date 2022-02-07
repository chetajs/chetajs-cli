import User from "../models/userModel"
import bcrypt from "bcrypt"
import "dotenv/config"

const {BCRYPT_SALT} = process.env

export class UserService {
    constructor(){
    }

    createUser = async (data) => {
        try {
            if(await this.getUserByEmail(data.email)) throw "This email already exists"
            data.hashPassword = bcrypt.hashSync(data.password, parseInt(BCRYPT_SALT));
            let user = await User.create(data)
            return user;
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (data) => {
        try {
            await User.update(data, {
                where: {
                    id: data.id
                }
            })
            let user = await this.getUser(data.id)
            return user;
        } catch (error) {
            throw error;
        }
    }

    getAllUsers = async () => {
        try {
            return await User.findAll({attributes: {exclude: ['hashPassword']}})
        } catch (error) {
            throw error;
        }
    }

    getUser = async (userId) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId
                },
                attributes: {
                    exclude: ['hashPassword']
                }
            })
            if(user) {
                return user
            }
            throw "User not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteUser = async (userId) => {
        try {
            return await User.destroy({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    getUserById = async (id) => {
        try {
            return await User.findOne({
                attributes: {
                    exclude: ['hashPassword']
                },
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw error;
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await User.findOne({
                where: {
                    email: email
                }
            })
        } catch (error) {
            throw error;
        }
    }

}