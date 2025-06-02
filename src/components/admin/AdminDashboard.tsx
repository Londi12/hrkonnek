import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CandidateList } from './CandidateList';
import { CandidateDetails } from './CandidateDetails';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route index element={<CandidateList />} />
        <Route path="candidates/:id" element={<CandidateDetails />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};
