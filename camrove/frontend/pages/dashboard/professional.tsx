import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ProfessionalDashboard() {
  const [profileCompletion, setProfileCompletion] = useState(25); // Example: 25% complete
  const [isVerified, setIsVerified] = useState(false);

  // Mock profile data
  const profileData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    accountType: 'FREELANCER',
    verificationStatus: 'pending'
  };

  const completionSteps = [
    { id: 1, name: 'Basic Info', completed: true },
    { id: 2, name: 'Services & Skills', completed: false },
    { id: 3, name: 'Portfolio', completed: false },
    { id: 4, name: 'Pricing', completed: false },
    { id: 5, name: 'Availability', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Dashboard - CamRove</title>
      </Head>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-32 relative">
                <img
                  src="/logo.png"
                  alt="CamRove"
                  className="h-10 w-32 object-contain"
                />
              </div>
            </Link>
            
            <div className="ml-auto flex items-center space-x-4">
              <Link 
                href="/profile/setup" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Complete Setup
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {profileData.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isVerified 
              ? 'Your account is verified and ready to go!' 
              : 'Complete your profile setup to start getting bookings.'
            }
          </p>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Profile Completion
            </h2>
            <span className="text-2xl font-bold text-blue-600">{profileCompletion}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>

          {/* Completion Steps */}
          <div className="space-y-3">
            {completionSteps.map((step) => (
              <div key={step.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {step.completed ? '✓' : step.id}
                  </div>
                  <span className={`font-medium ${
                    step.completed 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {step.completed ? (
                  <span className="text-green-600 text-sm">Completed</span>
                ) : (
                  <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          {profileCompletion < 100 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Complete your profile to start earning!
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    {100 - profileCompletion}% remaining. Clients are waiting for professionals like you.
                  </p>
                </div>
                <Link 
                  href="/profile/setup"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Complete Setup
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <span className="text-green-600 dark:text-green-400 text-2xl">💼</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <span className="text-purple-600 dark:text-purple-400 text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-600 text-2xl mr-3">🎯</span>
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Complete your profile setup
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Add your services, portfolio, and pricing to start appearing in search results
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-blue-600 text-2xl mr-3">📸</span>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Upload your portfolio
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Showcase your best work to attract more clients
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-600 text-2xl mr-3">🚀</span>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Set your availability
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Let clients know when you're available for bookings
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}