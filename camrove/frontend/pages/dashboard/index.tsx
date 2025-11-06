import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Mock user data - in real app, this would come from context/API
const mockUserData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  isVerified: false,
  joinedDate: '2024-01-15',
  preferences: {
    services: ['Wedding Photography', 'Pre-Wedding Shoot', 'DJ Services'],
    budget: 'premium',
    locationPreference: 'entire-kolkata',
    timeline: '1-month',
    referralSource: 'Friend or Family Referral'
  },
  recentSearches: [
    'wedding photographers in kolkata',
    'dj for wedding',
    'pre-wedding shoot locations'
  ],
  savedProfessionals: [
    { id: 1, name: 'Creative Studio', service: 'Wedding Photography', rating: 4.8 },
    { id: 2, name: 'DJ Rohit', service: 'Wedding DJ', rating: 4.9 }
  ]
};

export default function UserDashboard() {
  const [user, setUser] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone
  });

  const router = useRouter();

  const handleEditSave = () => {
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      phone: editForm.phone
    }));
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      name: user.name,
      phone: user.phone
    });
    setIsEditing(false);
  };

  const handleVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      setUser(prev => ({ ...prev, isVerified: true }));
    }, 1500);
  };

  const getBudgetLabel = (budget: string) => {
    const budgets: Record<string, string> = {
      'budget': 'Budget (Under ₹10,000)',
      'mid-range': 'Mid-Range (₹10,000 - ₹50,000)',
      'premium': 'Premium (₹50,000 - ₹1,00,000)',
      'luxury': 'Luxury (₹1,00,000+)',
      'custom': 'Custom Budget'
    };
    return budgets[budget] || budget;
  };

  const getTimelineLabel = (timeline: string) => {
    const timelines: Record<string, string> = {
      'immediately': 'Immediately (Within a week)',
      '2-weeks': 'Within 2 weeks',
      '1-month': 'Within a month',
      'exploring': 'Just exploring options'
    };
    return timelines[timeline] || timeline;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>My Profile - CamRove</title>
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
                href="/search" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              {/* User Profile Card */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
                
                {/* Verification Status */}
                <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.isVerified 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {user.isVerified ? '✓ Verified' : '⚠ Not Verified'}
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'preferences', label: 'My Preferences', icon: '⚡' },
                  { id: 'saved', label: 'Saved Professionals', icon: '❤️' },
                  { id: 'searches', label: 'Recent Searches', icon: '🔍' },
                  { id: 'bookings', label: 'My Bookings', icon: '📅' },
                  { id: 'settings', label: 'Account Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {user.name}! 👋
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Ready to find the perfect creative professional for your needs?
                      </p>
                    </div>
                    <Link 
                      href="/search"
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      Find Professionals
                    </Link>
                  </div>
                </div>

                {/* Verification Banner */}
                {!user.isVerified && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                          <span className="text-2xl">⚠</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                            Verify Your Account
                          </h3>
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                            Verify your account to book services and access all features
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleVerification}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                      >
                        Verify Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <span className="text-blue-600 dark:text-blue-400 text-2xl">🔍</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Searches</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.recentSearches.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                        <span className="text-green-600 dark:text-green-400 text-2xl">❤️</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Saved Professionals</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.savedProfessionals.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <span className="text-purple-600 dark:text-purple-400 text-2xl">📅</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Bookings</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                      href="/search"
                      className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-700 transition-colors text-center"
                    >
                      <span className="text-2xl mb-2 block">🔍</span>
                      <span className="font-medium text-gray-900 dark:text-white">Search Professionals</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Find the perfect match for your project</p>
                    </Link>

                    <button 
                      onClick={() => setActiveTab('preferences')}
                      className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-700 transition-colors text-center"
                    >
                      <span className="text-2xl mb-2 block">⚡</span>
                      <span className="font-medium text-gray-900 dark:text-white">Update Preferences</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refine your service preferences</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Preferences</h2>
                    <Link 
                      href="/search?edit-preferences=true"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Edit Preferences
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {/* Services */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Interested Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.services.map((service, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Budget Range</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {getBudgetLabel(user.preferences.budget)}
                      </p>
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Location Preference</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user.preferences.locationPreference === 'entire-kolkata' 
                          ? 'Entire Kolkata' 
                          : user.preferences.locationPreference === 'my-locality'
                          ? 'My Locality Only'
                          : 'Specific Areas'
                        }
                      </p>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {getTimelineLabel(user.preferences.timeline)}
                      </p>
                    </div>

                    {/* How you found us */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">How you found CamRove</h3>
                      <p className="text-gray-600 dark:text-gray-400">{user.preferences.referralSource}</p>
                    </div>
                  </div>
                </div>

                {/* Preference Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Getting the best matches
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Keep your preferences updated to get better recommendations and find professionals 
                    that match your specific needs and budget.
                  </p>
                </div>
              </div>
            )}

            {/* Saved Professionals Tab */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Saved Professionals</h2>
                  
                  {user.savedProfessionals.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="text-6xl mb-4 block">❤️</span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No saved professionals yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start exploring and save your favorite professionals to contact them later.
                      </p>
                      <Link 
                        href="/search"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Find Professionals
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user.savedProfessionals.map((professional) => (
                        <div key={professional.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{professional.name}</h3>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{professional.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{professional.service}</p>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                              Contact
                            </button>
                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              ❤️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Searches Tab */}
            {activeTab === 'searches' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Searches</h2>
                  
                  {user.recentSearches.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="text-6xl mb-4 block">🔍</span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No recent searches
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your recent searches will appear here.
                      </p>
                      <Link 
                        href="/search"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Searching
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {user.recentSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-300">{search}</span>
                          <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                            Search Again
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
                      
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={editForm.phone}
                              onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={handleEditSave}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Full Name</p>
                              <p className="text-gray-600 dark:text-gray-400">{user.name}</p>
                            </div>
                            <button 
                              onClick={() => setIsEditing(true)}
                              className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                              Edit
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Email Address</p>
                              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                            <span className="text-sm text-gray-500">Cannot change</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Phone Number</p>
                              <p className="text-gray-600 dark:text-gray-400">{user.phone}</p>
                            </div>
                            <button 
                              onClick={() => setIsEditing(true)}
                              className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Account Verification */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Verification</h3>
                      <div className={`p-4 rounded-lg ${
                        user.isVerified 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                          : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`text-2xl ${
                              user.isVerified ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {user.isVerified ? '✅' : '⚠️'}
                            </span>
                            <div>
                              <p className={`font-medium ${
                                user.isVerified 
                                  ? 'text-green-800 dark:text-green-200' 
                                  : 'text-yellow-800 dark:text-yellow-200'
                              }`}>
                                {user.isVerified ? 'Account Verified' : 'Account Not Verified'}
                              </p>
                              <p className={`text-sm ${
                                user.isVerified 
                                  ? 'text-green-700 dark:text-green-300' 
                                  : 'text-yellow-700 dark:text-yellow-300'
                              }`}>
                                {user.isVerified 
                                  ? 'Your account is fully verified and you can book services'
                                  : 'Verify your account to book services and access all features'
                                }
                              </p>
                            </div>
                          </div>
                          {!user.isVerified && (
                            <button
                              onClick={handleVerification}
                              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                              Verify Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div>
                      <h3 className="text-lg font-medium text-red-700 dark:text-red-400 mb-4">Danger Zone</h3>
                      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-red-800 dark:text-red-300">Delete Account</p>
                            <p className="text-red-700 dark:text-red-400 text-sm">
                              Permanently delete your account and all associated data
                            </p>
                          </div>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}