import { Response } from "../utils/response"

export class ServiceController 
{
    constructor(){
        
    }
    
    index = async (req, res) => {
        try {
            res.json(new Response("Service index", data));
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}