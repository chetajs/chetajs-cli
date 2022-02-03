import mongoose from "mongoose"

const { Schema } = mongoose

export class BillModel extends Schema {

    constructor()
    {
        super()
        const billSchema = {
            title: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            }
        }

        this.add(billSchema)

    }
}