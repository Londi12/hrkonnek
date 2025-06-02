import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidatesApi } from '../../utils/api';
import type { Candidate } from '../../types';

export const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Candidate['status'] | 'all'>('all');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await candidatesApi.getCandidates();
        setCandidates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = selectedStatus === 'all'
    ? candidates
    : candidates.filter(c => c.status === selectedStatus);

  const handleStatusChange = async (candidateId: string, newStatus: Candidate['status']) => {
    try {
      const updatedCandidate = await candidatesApi.updateCandidateStatus(candidateId, newStatus);
      setCandidates(candidates.map(c => 
        c._id === candidateId ? updatedCandidate : c
      ));
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

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Candidates</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as Candidate['status'] | 'all')}
          className="rounded-md border-gray-300 shadow-sm px-4 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/admin/candidates/${candidate._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {candidate.firstName} {candidate.lastName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate._id, e.target.value as Candidate['status'])}
                    className={`rounded-full px-3 py-1 text-sm font-semibold
                      ${candidate.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                      ${candidate.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                      ${candidate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.documents.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/candidates/${candidate._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
