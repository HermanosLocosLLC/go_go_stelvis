import express from 'express';
import { currentUser, requireAuth } from '../middlewares';
import { uploadPfp, getCurrentUser } from '../controllers/user';

const router = express.Router();

// UNAUTHENTICATED ROUTES
router.use(currentUser);
router.get('/', getCurrentUser);

// AUTHENTICATED ROUTES
router.use(requireAuth);
router.post('/upload-pfp', uploadPfp);

export default router;
