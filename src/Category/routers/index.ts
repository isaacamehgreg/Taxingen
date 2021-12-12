

import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.post('/add',controller.addCategory);

router.post('/edit', controller.editCategory);

router.get('/delete', controller.deleteCategory);



export default router;

