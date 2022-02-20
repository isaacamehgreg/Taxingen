
import express from 'express';
import { validateWebinarFields } from '../../middleware/authValidation';
import { WebinarAttendees, WebinarRegiteration, WebinarRemove } from '../controller';
const router = express.Router();


router.post('/webinar_registeration', validateWebinarFields, WebinarRegiteration);

router.get('/webinar_attendees', WebinarAttendees)

router.get('/remove/:id', WebinarRemove)




export default router;