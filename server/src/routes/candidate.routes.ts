import express from 'express';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  registerCandidate,
  loginCandidate,
  updateProfile,
  uploadCV,
  uploadDocument,
  getProfile,
} from '../controllers/candidate.controller';

const router = express.Router();

// Auth routes
router.post('/register', registerCandidate);
router.post('/login', loginCandidate);

// Protected routes
router.get('/profile', auth, getProfile);
router.patch('/profile', auth, updateProfile);
router.post('/cv', auth, upload.single('cv'), uploadCV);
router.post('/documents', auth, upload.single('document'), uploadDocument);

export const candidateRoutes = router;
