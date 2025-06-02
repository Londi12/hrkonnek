import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

// Layout Components
import Header from './components/layout/Header'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// Candidate Components
import CandidateProfile from './components/candidate/Profile'
import CVUpload from './components/candidate/CVUpload'
import DocumentUpload from './components/candidate/DocumentUpload'

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard'

const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState<{ role: string } | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header user={user} setUser={setUser} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              
              {/* Candidate Routes */}
              <Route 
                path="/profile" 
                element={user ? <CandidateProfile user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/upload-cv" 
                element={user ? <CVUpload user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/upload-documents" 
                element={user ? <DocumentUpload user={user} /> : <Navigate to="/login" />}
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  user?.role === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to={user ? '/profile' : '/login'} />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
