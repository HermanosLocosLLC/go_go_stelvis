import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { getCurrentUser } from '../controllers/user/get-current-user';
import { uploadPfp } from '../controllers/user/upload-pfp';

const router = express.Router();

// UNAUTHENTICATED ROUTES
router.use(currentUser);
router.get('/', getCurrentUser);

// AUTHENTICATED ROUTES
router.use(requireAuth);
router.post('/upload-pfp', uploadPfp);

export default router;
