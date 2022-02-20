import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import { emailValidations } from '../middleware/validations.js';
import {
  getAllEmails,
  sendEmail,
  saveDraft,
  updateDraft,
  moveToTrash,
  removeFromTrash,
  toggleEmailProperty,
  deleteEmail,
} from '../controllers/email.js';


const router = express.Router();


router.get('/', authenticateToken, getAllEmails);
router.post('/send', authenticateToken,[...emailValidations], sendEmail);
router.post('/draft', authenticateToken, saveDraft);
router.put('/draft/:id', authenticateToken, updateDraft);
router.put('/:id/trash', authenticateToken, moveToTrash);
router.put('/:id/untrash', authenticateToken, removeFromTrash);
router.put('/:id/:toggle', authenticateToken, toggleEmailProperty);
router.delete('/:id', authenticateToken, deleteEmail);

export default router;
