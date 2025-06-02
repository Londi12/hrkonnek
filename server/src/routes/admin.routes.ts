import express from 'express';
import { adminAuth } from '../middleware/auth';
import {
  loginAdmin,
  getAllCandidates,
  updateCandidateStatus,
  updateDocumentStatus,
  addCandidateNote,
  sendBulkNotifications,
} from '../controllers/admin.controller';

const router = express.Router();

// Auth routes
router.post('/login', loginAdmin);

// Protected admin routes
router.get('/candidates', adminAuth, getAllCandidates);
router.patch('/candidates/:candidateId/status', adminAuth, updateCandidateStatus);
router.patch('/candidates/:candidateId/documents/:documentId', adminAuth, updateDocumentStatus);
router.post('/candidates/:candidateId/notes', adminAuth, addCandidateNote);
router.post('/notifications/bulk', adminAuth, sendBulkNotifications);

export const adminRoutes = router;
