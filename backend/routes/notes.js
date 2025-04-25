// routes/notes.js
import { Router } from 'express';
import authenticateJwt from '../middlewares/authenticateJwt.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import {
  getAllNotes,
  getNoteById,
  getNotesByStudent,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';

const router = Router();
router.use(authenticateJwt);

router.get('/', authorizeRoles('admin', 'prof'), getAllNotes);
router.get('/student/:studentId', authorizeRoles('admin', 'prof'), getNotesByStudent);
router.get('/mine', authorizeRoles('student'), (req, res) => getNotesByStudent(req.user.id, res));
router.get('/:id', authorizeRoles('admin', 'prof'), getNoteById);
router.post('/', authorizeRoles('admin', 'prof'), createNote);
router.put('/:id', authorizeRoles('admin', 'prof'), updateNote);
router.delete('/:id', authorizeRoles('admin', 'prof'), deleteNote);

export default router;