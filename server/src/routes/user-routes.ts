import express from 'express'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'
import { getCurrentUser } from '../controllers/user/get-current-user'

const router = express.Router()

router.get('/', currentUser, requireAuth, getCurrentUser)

export default router
