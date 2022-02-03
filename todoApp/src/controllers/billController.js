import { Response } from "../utils/response"

export class BillController 
{
    constructor(billService)
    {
        this.billService = new billService
    }

    createBill = async (req, res) => {
        try {
            await this.billService.createBill(req.body).then(data => {
                res.json(new Response("Bill created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateBill = async (req, res) => {
        try {
            await this.billService.updateBill(req.body).then(data => {
                res.json(new Response("Bill updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllBills = async (req, res) => {
        try {
            await this.billService.getAllBills().then(data => {
                res.json(new Response("All bills", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getBill = async (req, res) => {
        try {
            await this.billService.getBill(req.params.billid).then(data => {
                res.json(new Response("Bill found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteBill = async (req, res) => {
        try {
            await this.billService.deleteBill(req.params.billid).then(data => {
                res.json(new Response("Bill deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}