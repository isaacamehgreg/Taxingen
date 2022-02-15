

import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getFilename);

router.post('/',controller.addFilename);

router.post('/twelvemonth',controller.add12MonthFilename);

router.patch('/:filenameId', controller.editFilename);

router.delete('/:filenameId', controller.deleteFilename);



export default router;
