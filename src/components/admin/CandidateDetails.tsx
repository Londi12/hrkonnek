import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Candidate, Document } from '../../types';
import { candidatesApi } from '../../utils/api';rt React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Candidate, Document } from '../../types';
import { candidatesApi } from '../../utils/api';

export const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) return;
      
      try {
        const data = await candidatesApi.getCandidates();
        const foundCandidate = data.find(c => c._id === id);
        if (foundCandidate) {
          setCandidate(foundCandidate);
        } else {
          setError('Candidate not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidate details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleStatusChange = async (newStatus: Candidate['status']) => {
    if (!candidate) return;

    try {
      const updatedCandidate = await candidatesApi.updateCandidateStatus(candidate._id, newStatus);
      setCandidate(updatedCandidate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || 'Candidate not found'}
      </div>
    );
  }

  const getStatusBadgeColor = (status: Candidate['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {candidate.firstName} {candidate.lastName}
            </h2>
            <select
              value={candidate.status}
              onChange={(e) => handleStatusChange(e.target.value as Candidate['status'])}
              className={`rounded-full px-4 py-2 font-semibold ${getStatusBadgeColor(candidate.status)}`}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-800">Email: {candidate.email}</p>
                <p className="text-gray-800">Phone: {candidate.phone || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Application Details</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-800">Applied: {formatDate(candidate.createdAt)}</p>
                <p className="text-gray-800">Last Updated: {formatDate(candidate.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Documents</h3>
            <div className="grid grid-cols-1 gap-4">
              {candidate.documents.map((doc: Document) => (
                <div
                  key={doc._id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{doc.title}</h4>
                    <p className="text-sm text-gray-500">
                      Type: {doc.type} • Uploaded: {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
