import express from 'express';
import {
	validateLoginFields,
	validateRegistrationFields,

} from '../../middleware/authValidation';
import controller from '../controllers';
const router = express.Router();

/**Register Route */
router.post('/register', validateRegistrationFields, controller.Register);

/**Login Route */
router.post('/login', validateLoginFields, controller.Login);



router.get('/verify_email', controller.verifyEmail);

export default router;



