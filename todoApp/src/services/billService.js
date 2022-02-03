import { BillModel } from "../models/billModel"
import mongoose from "mongoose"
import "dotenv/config"

const billModel = mongoose.model('Bill', new BillModel);

export class BillService {
    constructor(){
    }
    index = async (req, res) => {
        try {
            return new Promise((resolve, reject) => {
                resolve('Bill service')
            })
        } catch (error) {
            throw error;
        }
    }
    
}