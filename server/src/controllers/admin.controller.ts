import { Request, Response } from 'express';
import { Admin } from '../models/admin.model';
import { Candidate } from '../models/candidate.model';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';

// Admin login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ admin, token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

// Get all candidates
export const getAllCandidates = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search } = req.query;
    let query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { 'personalInfo.firstName': { $regex: search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching candidates', error });
  }
};

// Update candidate status
export const updateCandidateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { candidateId } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.status = status;
    await candidate.save();

    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error updating candidate status', error });
  }
};

// Update document status
export const updateDocumentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { candidateId, documentId } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const document = candidate.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.status = status;
    await candidate.save();

    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error updating document status', error });
  }
};

// Add note to candidate
export const addCandidateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { candidateId } = req.params;
    const { note } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $push: { notes: { content: note, addedBy: req.user.id } } },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error adding note', error });
  }
};

// Send bulk notifications
export const sendBulkNotifications = async (req: Request, res: Response) => {
  try {
    const { candidateIds, message, type } = req.body;

    // Here you would integrate with your email/SMS service
    // For example: SendGrid, Twilio, etc.

    res.json({ message: 'Notifications sent successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error sending notifications', error });
  }
};
