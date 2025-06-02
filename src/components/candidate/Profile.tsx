import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ProfileProps {
  user: any;
}

export default function Profile({ user }: ProfileProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
    education: [],
    workExperience: [],
    skills: [],
    documents: [],
    status: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/candidates/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfile(response.data);
    } catch (error: any) {
      toast.error('Failed to fetch profile');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        'http://localhost:5000/api/candidates/profile',
        {
          personalInfo: profile.personalInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setProfile(response.data);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application status.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleUpdateProfile}>
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      className="input"
                      value={profile.personalInfo.firstName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, firstName: e.target.value },
                        })
                      }
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      className="input"
                      value={profile.personalInfo.lastName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, lastName: e.target.value },
                        })
                      }
                      placeholder="Last name"
                    />
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input
                    type="tel"
                    className="input"
                    value={profile.personalInfo.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, phone: e.target.value },
                      })
                    }
                    placeholder="Phone number"
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <textarea
                    rows={3}
                    className="input"
                    value={profile.personalInfo.address}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, address: e.target.value },
                      })
                    }
                    placeholder="Address"
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Application status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      profile.status === 'complete'
                        ? 'bg-green-100 text-green-800'
                        : profile.status === 'pending_review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {profile.status || 'incomplete'}
                  </span>
                </dd>
              </div>
            </dl>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
