import { UserService } from "./userService"
import UserTokenModel from "../models/userTokenModel"
import { Utils } from "../utils/utils"
import { Mail } from "../utils/mail"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import moment from "moment"

const {JWT_SECRET, BCRYPT_SALT} = process.env

export class AuthService {
    constructor() {
        this.userService = new UserService()
    }

    login = async (data) => {
        try {
            let user = await this.userService.getUserByEmail(data.email);
            if (!user) {
                throw "Incorrect email/password"
            }
            if(!bcrypt.compareSync(data.password, user.hashPassword))
            {
                throw "Incorrect email/password"
            }
            let userTokenObj = {
                id: user.id,
                username: user.userName,
                email: user.email,
                roles: [],
                permissions: [],
                exp: Math.floor(Date.now() / 100) + (60 * 60)
            }
            const token = this.generateToken(userTokenObj)
            return token
        } catch (error) {
            throw error
        }
    }

    signup = async (data) => {
        try {
            if(await this.userService.getUserByEmail(data.email)) throw "This email already exists"
            let user = await this.userService.createUser(data);
            if(user) {
                let userTokenObj = {
                    id: user.id,
                    username: user.userName,
                    email: user.email,
                    roles: ['SUPER_ADMIN'],
                    permissions: [],
                    exp: Math.floor(Date.now() / 100) + (60 * 60)
                }
                const token = this.generateToken(userTokenObj)
                return token
            }
        } catch (error) {
            throw error
        }
        
    }

    sendRecoveryToken = async (data) => {
        try {
            let user = await this.userService.getUserByEmail(data.email)
            if(user) {
                const util = new Utils
                const token = util.generateToken(6)

                let mailer = new Mail
                mailer.from = "recovery@domain.com"
                mailer.to = user.email
                mailer.subject = "Password recovery token"
                mailer.body = `Dear ${user.userName}, <br> Kindly find below your password recovery token. <br> This token is valid for 5 minutes. <br> Token: <b>${token}</b>`
                
                const userToken = await UserTokenModel.findOne({
                    where: {
                        userID: user.id
                    }
                })
                
                const tokenExp = moment().add(5, 'minutes')
                if(userToken) {
                    userToken.token = token
                    userToken.expiryDt = tokenExp
                    userToken.createdAt = moment()
                    userToken.save()
                } else {
                    const newToken = {
                        userID: user.id,
                        token: token,
                        expiryDt: tokenExp
                    }
                    await UserTokenModel.create(newToken)
                }
                
                await mailer.sendMail().then(res => {
                    return res
                }).catch(err => {
                    console.log(err)
                    throw "Could not send email"
                })
            } else { 
                throw "Email does not exist"
            }
        } catch (error) {
            throw error
        }
    }

    changePassword = async (data) => {
        try { 
            let user = await this.userService.getUserByEmail(data.email)
            if(!user) throw "Email not found!"
            let token = await UserTokenModel.findOne({
                where: {
                    userID: user.id, 
                    token: data.token
                }
            })
            if(!token || moment(token.expiryDt).isBefore(moment())) throw "Token not found / expired"

            await UserTokenModel.destroy({
                where: {
                    id: token.id
                }
            })
            let passwordUpdateData = {
                id: user.id,
                hashPassword: bcrypt.hashSync(data.password, parseInt(BCRYPT_SALT))
            }
            return await this.userService.updateUser(passwordUpdateData)
        } catch (error) {
            throw error
        }
    }

    generateToken = (obj) => {
        try {
            let token = jwt.sign(obj, JWT_SECRET)
            return token
        } catch (error) {
            return null
        }
    }
 
}