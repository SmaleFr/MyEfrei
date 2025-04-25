// routes/users.js
import { Router } from 'express';
import authenticateJwt from '../middlewares/authenticateJwt.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = Router();

router.use(authenticateJwt);

router.get('/', authorizeRoles('admin'), getAllUsers);
router.get('/:id', authorizeRoles('admin'), getUserById);
router.post('/', authorizeRoles('admin'), createUser);
router.put('/:id', authorizeRoles('admin'), updateUser);
router.delete('/:id', authorizeRoles('admin'), deleteUser);

export default router;