import { InvoiceModel } from "../models/invoiceModel"
import mongoose from "mongoose"
import "dotenv/config"

const invoiceModel = mongoose.model('Invoice', new InvoiceModel);

export class InvoiceService {
    constructor(){
    }

    createInvoice = async (data) => {
        try {
            let invoice = invoiceModel(data);
            return invoice.save();
        } catch (error) {
            throw error;
        }
    }

    updateInvoice = async (data) => {
        try {
            let invoice = await this.invoice.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return invoice;
        } catch (error) {
            throw error;
        }
    }

    getAllInvoices = async () => {
        try {
            return await invoiceModel.find({});
        } catch (error) {
            throw error;
        }
    }

    getInvoice = async (invoiceId) => {
        try {
            let invoice = await invoiceModel.findById(invoiceId);
            if(invoice)
            {
                return invoice
            }
            throw "Invoice not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteInvoice = async (invoiceId) => {
        try {
            return await invoiceModel.findByIdAndDelete(invoiceId);
        } catch (error) {
            throw error;
        }
    }

}