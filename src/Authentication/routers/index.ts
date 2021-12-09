import express from 'express';
import {
	validateLoginFields,
	validateRegistrationFields,
	validateSocialFields
} from '../../middleware/authValidation';
import controller from '../controllers';
const router = express.Router();

/**Register Route */
router.post('/register', validateRegistrationFields, controller.Register);

/**Login Route */
router.post('/login', validateLoginFields, controller.Login);

router.post('/google', validateSocialFields, controller.Google);

router.post('/facebook', validateSocialFields, controller.Facebook);

router.post('/facebook', validateSocialFields, controller.Twitter);

router.get('/verify_email', controller.verifyEmail);

export default router;



