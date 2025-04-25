// routes/planning.js
import { Router } from 'express';
import authenticateJwt from '../middlewares/authenticateJwt.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import {
  getAllSlots,
  getSlotById,
  getSlotsByUser,
  createSlot,
  updateSlot,
  deleteSlot
} from '../controllers/planningController.js';

const router = Router();
router.use(authenticateJwt);

router.get('/', authorizeRoles('admin'), getAllSlots);
router.get('/user/:userId', authorizeRoles('admin', 'prof'), getSlotsByUser);
router.get('/mine', authorizeRoles('student', 'prof'), (req, res) => getSlotsByUser(req.user.id, res));
router.get('/:id', authorizeRoles('admin'), getSlotById);
router.post('/', authorizeRoles('admin'), createSlot);
router.put('/:id', authorizeRoles('admin'), updateSlot);
router.delete('/:id', authorizeRoles('admin'), deleteSlot);

export default router;