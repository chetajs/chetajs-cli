import { BillController } from "../../controllers/billController";
import { Router } from "express";
import { BillService } from "../../services/billService";
import { loginRequired } from "../../middlewares/authMiddleware" 

const router = Router();

const billCtrl = new BillController(BillService);


router.route('/')
        .get(loginRequired, billCtrl.getAllBills)
        .post(loginRequired, billCtrl.createBill)
        .put(loginRequired, billCtrl.updateBill)

router.route('/:billid')
        .get(loginRequired, billCtrl.getBill)
        .delete(loginRequired, billCtrl.deleteBill)


export default router;
