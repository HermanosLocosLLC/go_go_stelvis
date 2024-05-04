import express from 'express'
import { login, logout, signup } from '../controllers/auth/vanilla-auth'
import { googleLogin } from '../controllers/auth/google-auth'

const router = express.Router()

// VANILLA AUTH
router.post('/gogo/login', login)
router.post('/gogo/signup', signup)

// GOOGLE OAUTH2
router.get('/google/login', googleLogin)

router.post('/logout', logout)

export default router
