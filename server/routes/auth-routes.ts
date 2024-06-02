import express from 'express';
import { login, signup } from '../controllers/auth/vanilla-auth';
import logout from '../controllers/auth/logout';
import { googleLogin } from '../controllers/auth/google-auth';

const router = express.Router();

// VANILLA AUTH
router.post('/gogo/login', login);
router.post('/gogo/signup', signup);

// GOOGLE OAUTH2
router.get('/google/login', googleLogin);

// FACEBOOK OAUTH2
// router.get('/facebook/login', facebookLogin)

// APPLE OAUTH2
// router.get('/apple/login', appleLogin)

// DISCORD OAUTH2
// router.get('/apple/login', appleLogin)

router.post('/logout', logout);

export default router;
