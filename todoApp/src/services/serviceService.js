import { ServiceModel } from "../models/serviceModel"
import mongoose from "mongoose"
import "dotenv/config"

const serviceModel = mongoose.model('Service', new ServiceModel);

export class ServiceService {
    constructor(){
    }
    
}