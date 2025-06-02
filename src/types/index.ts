export interface Candidate {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  documents: Document[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  _id: string;
  title: string;
  type: 'cv' | 'certificate' | 'other';
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Admin {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'superadmin';
}

export interface AuthResponse {
  token: string;
  user: Candidate | Admin;
}
