

import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getCategory);

router.post('/',controller.addCategory);

router.patch('/:catId', controller.editCategory);

router.delete('/:catId', controller.deleteCategory);



export default router;
