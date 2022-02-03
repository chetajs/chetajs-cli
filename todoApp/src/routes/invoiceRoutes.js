import { InvoiceController } from "../../controllers/invoiceController";
import { Router } from "express";
import { InvoiceService } from "../../services/invoiceService";


const router = Router();

const invoiceCtrl = new InvoiceController(InvoiceService);


router.route('/')
        .get(invoiceCtrl.getAllInvoices)
        .post(invoiceCtrl.createInvoice)
        .put(invoiceCtrl.updateInvoice)

router.route('/:invoiceid')
        .get(invoiceCtrl.getInvoice)
        .delete(invoiceCtrl.deleteInvoice)


export default router;
