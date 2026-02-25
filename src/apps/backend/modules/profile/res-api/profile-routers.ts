import express from 'express';
import { UserProfileController } from './profile-controllers';
import { authMiddleware } from '../../../middlewares/auth-middleware';

const router = express.Router();

router.post('/', authMiddleware, UserProfileController.createUserProfile);
router.get('/:userId', authMiddleware, UserProfileController.getUserProfileByUserId);

export default router;
