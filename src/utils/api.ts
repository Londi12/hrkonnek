import axios from 'axios';
import { Candidate, Document, AuthResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (userData: Partial<Candidate>): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
};

export const documentsApi = {
  uploadDocument: async (file: File, type: Document['type']): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const { data } = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  
  getDocuments: async (): Promise<Document[]> => {
    const { data } = await api.get('/documents');
    return data;
  },
};

export const candidatesApi = {
  getCandidates: async (): Promise<Candidate[]> => {
    const { data } = await api.get('/admin/candidates');
    return data;
  },
  
  updateCandidateStatus: async (candidateId: string, status: Candidate['status']): Promise<Candidate> => {
    const { data } = await api.patch(`/admin/candidates/${candidateId}/status`, { status });
    return data;
  },
};

export const profileApi = {
  updateProfile: async (userData: Partial<Candidate>): Promise<Candidate> => {
    const { data } = await api.patch('/candidates/profile', userData);
    return data;
  },
  
  getProfile: async (): Promise<Candidate> => {
    const { data } = await api.get('/candidates/profile');
    return data;
  },
};
