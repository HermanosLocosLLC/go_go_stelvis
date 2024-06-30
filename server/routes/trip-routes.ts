import { Router } from 'express';
import { currentUser, requireAuth } from '../middlewares';
import { getTripById, getUserTrips } from '../controllers/trip';

const router = Router();

router.use(currentUser, requireAuth);
router.get('/:tripId', getTripById);
router.get('/', getUserTrips);

export default router;
