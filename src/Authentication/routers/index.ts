import express from 'express';
import { checkIfAuth } from '../../middleware/checkUserAuth';
import {
	validateCompanyFields,
	validateLoginFields,
	validateRegistrationFields,

} from '../../middleware/authValidation';
import controller from '../controllers';
const router = express.Router();

/**Register Route */
router.post('/register', validateRegistrationFields, controller.Register);

/**Login Route */
router.post('/login', validateLoginFields, controller.Login);


router.post('/admin_login', validateLoginFields, controller.AdminLogin);


router.post('/reset_password', validateLoginFields, controller.ForgetPassword);

//link from mail
router.get('/verify_code/:user_id', controller.verifyCode);

/**company */
router.post('/company_info', checkIfAuth, validateCompanyFields,  controller.companyInfo);

router.get('/company_info',  checkIfAuth, controller.getCompanyInfo);

router.get('/resend/:user_id',  controller.resendEmail);

router.get('/check_taxreport/:user_id',  controller.checkTaxReport);


export default router; 



