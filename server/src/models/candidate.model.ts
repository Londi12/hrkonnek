import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ICandidate extends Document {
  email: string;
  password: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    from: Date;
    to: Date;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    from: Date;
    to: Date;
    description: string;
  }>;
  skills: string[];
  documents: Array<{
    type: string;
    path: string;
    uploadedAt: Date;
    status: 'pending' | 'approved' | 'rejected';
  }>;
  status: 'incomplete' | 'pending_review' | 'complete';
  cvPath: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const CandidateSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
  },
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
  }],
  workExperience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    description: { type: String },
  }],
  skills: [{ type: String }],
  documents: [{
    type: { type: String, required: true },
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  }],
  status: {
    type: String,
    enum: ['incomplete', 'pending_review', 'complete'],
    default: 'incomplete',
  },
  cvPath: { type: String },
}, {
  timestamps: true,
});

// Hash password before saving
CandidateSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
CandidateSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Candidate = mongoose.model<ICandidate>('Candidate', CandidateSchema);
