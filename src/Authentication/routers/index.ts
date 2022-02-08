import express from 'express';
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

//link from mail
router.get('/verify_code/:user_id', controller.verifyCode);

/**company */
router.post('/company_info/:user_id', validateCompanyFields,  controller.companyInfo);

router.get('/company_info/:user_id', controller.getCompanyInfo);


export default router;



