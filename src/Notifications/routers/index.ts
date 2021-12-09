import express from "express";
import {createUserNotification, getUserNotification} from '../controllers';
import {checkIfAuth} from "../../middleware/checkUserAuth";
const router = express.Router();

/**
 * Get user notifications
 */
router.get('/', checkIfAuth, getUserNotification);

/**
 * Create Notification for User
 */
router.post('/create', checkIfAuth, createUserNotification)

export default router;
