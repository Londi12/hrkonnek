import { Request, Response } from 'express';
import { Candidate } from '../models/candidate.model';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';

// Register new candidate
export const registerCandidate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingCandidate = await Candidate.findOne({ email });

    if (existingCandidate) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const candidate = new Candidate(req.body);
    await candidate.save();

    const token = jwt.sign(
      { id: candidate._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({ candidate, token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering candidate', error });
  }
};

// Login candidate
export const loginCandidate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await candidate.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: candidate._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ candidate, token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

// Update candidate profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updates = Object.keys(req.body);
    const candidate = await Candidate.findById(req.user.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    updates.forEach(update => {
      if (update in candidate) {
        (candidate as any)[update] = req.body[update];
      }
    });

    await candidate.save();
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error });
  }
};

// Upload CV
export const uploadCV = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const candidate = await Candidate.findById(req.user.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.cvPath = req.file.path;
    await candidate.save();

    res.json({ message: 'CV uploaded successfully', cvPath: candidate.cvPath });
  } catch (error) {
    res.status(400).json({ message: 'Error uploading CV', error });
  }
};

// Upload supporting documents
export const uploadDocument = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { type } = req.body;
    const candidate = await Candidate.findById(req.user.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    candidate.documents.push({
      type,
      path: req.file.path,
      uploadedAt: new Date(),
      status: 'pending'
    });

    await candidate.save();
    res.json({ message: 'Document uploaded successfully', document: candidate.documents[candidate.documents.length - 1] });
  } catch (error) {
    res.status(400).json({ message: 'Error uploading document', error });
  }
};

// Get candidate profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.user.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching profile', error });
  }
};
