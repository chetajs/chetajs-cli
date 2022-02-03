import { Response } from "../utils/response"

export class InvoiceController 
{
    constructor(){
        
    }
    
    index = async (req, res) => {
        try {
            res.json(new Response("Invoice index", data));
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}