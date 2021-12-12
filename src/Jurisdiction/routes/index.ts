

import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getJurisdiction);

router.post('/',controller.addJurisdiction);

router.patch('/:jurisId', controller.editJurisdiction);

router.delete('/:jurisId', controller.deleteJurisdiction);



export default router;
