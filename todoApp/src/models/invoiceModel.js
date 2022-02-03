import mongoose from "mongoose"

const { Schema } = mongoose

export class InvoiceModel extends Schema {

    constructor()
    {
        super()
        const invoiceSchema = {
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

        this.add(invoiceSchema)

    }
}