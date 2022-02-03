import mongoose from "mongoose"

const { Schema } = mongoose

export class UserTokenModel extends Schema {

    constructor()
    {
        super()
        const tokenSchema = {
            userID: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            expiryDt: {
                type: Date,
            }
        }

        this.add(tokenSchema)

    }
}