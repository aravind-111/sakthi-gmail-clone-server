import express from 'express';
import { authenticateToken } from './../middleware/authToken.js';
import { registerValidations, loginValidations } from '../middleware/validations.js';
import { register, login, getUser, updateProfilePicture } from '../controllers/account.js'; // import request & response function


const router = express.Router();

router.post('/register',[...registerValidations], register);
router.post('/login',[...loginValidations], login);
router.get('/', authenticateToken, getUser);
router.put('/image', authenticateToken, updateProfilePicture);

export default router;
