
import express from 'express';
import { validateWebinarFields } from '../../middleware/authValidation';
import { WebinarAttendees, WebinarRegiteration } from '../controller';
const router = express.Router();


router.post('/webinar_registeration', validateWebinarFields, WebinarRegiteration);

router.get('/webinar_attendees', WebinarAttendees)




export default router;