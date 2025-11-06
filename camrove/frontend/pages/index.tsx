import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CameraIcon, 
  VideoIcon, 
  EditIcon, 
  AudioIcon, 
  UserIcon, 
  StarIcon, 
  SearchIcon, 
  MenuIcon,
  SunIcon,
  MoonIcon,
  MusicIcon,
  DJIcon,
  FilmIcon,
  DesignIcon,
  EquipmentIcon
} from '../components/ui/Icons';

// Define the Category interface
interface Category {
  id: string;
  name: string;
  subcategories: string[];
  type: 'photography' | 'videography' | 'editing' | 'audio' | 'dj' | 'production' | 'creative' | 'equipment';
}

// Complete categories data - ALL CATEGORIES WITH SUBCATEGORIES
const allCategories: Category[] = [
  // PHOTOGRAPHY
  {
    id: 'wedding-photography',
    name: 'WEDDING PHOTOGRAPHY',
    subcategories: [
      'Pre-Wedding Shoot',
      'Engagement Ceremony',
      'Wedding Day Coverage',
      'Reception Coverage',
      'Candid Wedding Photography',
      'Traditional Wedding Photography',
      'Drone Wedding Photography'
    ],
    type: 'photography'
  },
  {
    id: 'portrait-photography',
    name: 'PORTRAIT PHOTOGRAPHY',
    subcategories: [
      'Family Portraits',
      'Couple Portraits',
      'Maternity Shoot',
      'Newborn Baby Photos',
      'Professional Headshots',
      'Fashion Portraits',
      'Creative Portraits'
    ],
    type: 'photography'
  },
  {
    id: 'event-photography',
    name: 'EVENT PHOTOGRAPHY',
    subcategories: [
      'Birthday Parties',
      'Anniversary Events',
      'Corporate Events',
      'Product Launches',
      'Cultural Festivals',
      'Religious Ceremonies',
      'Private Parties'
    ],
    type: 'photography'
  },
  {
    id: 'commercial-photography',
    name: 'COMMERCIAL PHOTOGRAPHY',
    subcategories: [
      'Product Photography',
      'Food Photography',
      'Real Estate Photography',
      'Fashion Photography',
      'Jewelry Photography',
      'Architecture Photography',
      'Automotive Photography'
    ],
    type: 'photography'
  },
  {
    id: 'specialized-photography',
    name: 'SPECIALIZED PHOTOGRAPHY',
    subcategories: [
      'Drone/Aerial Photography',
      '360° Virtual Tours',
      'Street Photography',
      'Travel Photography',
      'Pet Photography',
      'Night Photography'
    ],
    type: 'photography'
  },

  // VIDEOGRAPHY
  {
    id: 'wedding-videography',
    name: 'WEDDING VIDEOGRAPHY',
    subcategories: [
      'Wedding Highlights Film',
      'Full Ceremony Coverage',
      'Pre-Wedding Videos',
      'Cinematic Wedding Films',
      'Same-Day Edit Videos',
      'Drone Wedding Videos'
    ],
    type: 'videography'
  },
  {
    id: 'event-videography',
    name: 'EVENT VIDEOGRAPHY',
    subcategories: [
      'Birthday Event Videos',
      'Corporate Event Coverage',
      'Conference Recording',
      'Festival Documentation',
      'Party Coverage',
      'Ceremony Videos'
    ],
    type: 'videography'
  },
  {
    id: 'commercial-videography',
    name: 'COMMERCIAL VIDEOGRAPHY',
    subcategories: [
      'Product Demo Videos',
      'Brand Commercials',
      'Restaurant Promo Videos',
      'Real Estate Videos',
      'Fashion Films',
      'Explainer Videos'
    ],
    type: 'videography'
  },
  {
    id: 'content-creation',
    name: 'CONTENT CREATION',
    subcategories: [
      'YouTube Videos',
      'Social Media Content',
      'Vlogs & Documentaries',
      'Interview Videos',
      'Educational Content',
      'Behind-the-Scenes'
    ],
    type: 'videography'
  },

  // VIDEO EDITING
  {
    id: 'basic-video-editing',
    name: 'BASIC VIDEO EDITING',
    subcategories: [
      'Wedding Video Editing',
      'Event Video Editing',
      'Vlog Editing',
      'Interview Editing',
      'YouTube Video Editing',
      'Social Media Clips'
    ],
    type: 'editing'
  },
  {
    id: 'advanced-video-editing',
    name: 'ADVANCED VIDEO EDITING',
    subcategories: [
      'Color Grading & Correction',
      'Motion Graphics',
      'Visual Effects (VFX)',
      'Green Screen Editing',
      '3D Animation',
      'Kinetic Typography'
    ],
    type: 'editing'
  },
  {
    id: 'short-form-content-editing',
    name: 'SHORT FORM CONTENT EDITING',
    subcategories: [
      'Instagram Reels Editing',
      'YouTube Shorts Editing',
      'TikTok Video Editing',
      'Facebook Video Ads',
      'Story Content Creation',
      'Viral Video Editing'
    ],
    type: 'editing'
  },
  {
    id: 'specialized-video-editing',
    name: 'SPECIALIZED VIDEO EDITING',
    subcategories: [
      'Music Video Editing',
      'Documentary Editing',
      'Corporate Video Editing',
      'Wedding Film Editing',
      'Trailer Editing',
      'Multi-Camera Editing'
    ],
    type: 'editing'
  },

  // PHOTO EDITING
  {
    id: 'basic-photo-editing',
    name: 'BASIC PHOTO EDITING',
    subcategories: [
      'Color Correction',
      'Exposure Fixing',
      'Background Removal',
      'Basic Retouching',
      'Crop & Resize',
      'Red-Eye Removal'
    ],
    type: 'editing'
  },
  {
    id: 'advanced-photo-editing',
    name: 'ADVANCED PHOTO EDITING',
    subcategories: [
      'Professional Retouching',
      'Skin Smoothing',
      'Body Shape Editing',
      'Beauty Editing',
      'Creative Compositing',
      'Photo Manipulation'
    ],
    type: 'editing'
  },
  {
    id: 'specialized-photo-editing',
    name: 'SPECIALIZED PHOTO EDITING',
    subcategories: [
      'Wedding Photo Editing',
      'Product Photo Editing',
      'Real Estate Photo Editing',
      'Fashion Photo Editing',
      'Food Photo Enhancement',
      'Old Photo Restoration'
    ],
    type: 'editing'
  },
  {
    id: 'creative-photo-editing',
    name: 'CREATIVE PHOTO EDITING',
    subcategories: [
      'Digital Art Creation',
      'Photo to Art Conversion',
      'Double Exposure',
      'Creative Filters',
      'Album Design',
      'Collage Creation'
    ],
    type: 'editing'
  },

  // AUDIO & MUSIC
  {
    id: 'music-production',
    name: 'MUSIC PRODUCTION',
    subcategories: [
      'Music Composition',
      'Song Production',
      'Background Scores',
      'Jingle Creation',
      'Sound Design',
      'Audio Mixing & Mastering'
    ],
    type: 'audio'
  },
  {
    id: 'vocal-services',
    name: 'VOCAL SERVICES',
    subcategories: [
      'Playback Singing',
      'Background Vocals',
      'Voice Training',
      'Song Recording',
      'Vocal Tuning',
      'Chorus Creation'
    ],
    type: 'audio'
  },
  {
    id: 'live-performance',
    name: 'LIVE PERFORMANCE',
    subcategories: [
      'Wedding Singer',
      'Party Singer',
      'Background Music',
      'Live Band Performance',
      'Instrumentalist',
      'DJ + Singer Combo'
    ],
    type: 'audio'
  },
  {
    id: 'audio-services',
    name: 'AUDIO SERVICES',
    subcategories: [
      'Voice Over Recording',
      'Audio Editing',
      'Podcast Production',
      'Sound Effects',
      'Audio Restoration',
      'ADR Services'
    ],
    type: 'audio'
  },

  // DJ SERVICES
  {
    id: 'dj-services',
    name: 'DJ SERVICES',
    subcategories: [
      'Wedding DJ',
      'Club DJ',
      'Private Party DJ',
      'Corporate Event DJ',
      'Radio DJ',
      'Mobile DJ'
    ],
    type: 'dj'
  },
  {
    id: 'music-genres',
    name: 'MUSIC GENRES',
    subcategories: [
      'Bollywood DJ',
      'English Pop DJ',
      'EDM/Electronic DJ',
      'Retro DJ',
      'Bengali Music DJ',
      'Mixed Genre DJ'
    ],
    type: 'dj'
  },
  {
    id: 'equipment-services-dj',
    name: 'DJ EQUIPMENT SERVICES',
    subcategories: [
      'DJ with Full Setup',
      'Sound System Rental',
      'Lighting Setup',
      'DJ + Dance Floor',
      'Karaoke Setup'
    ],
    type: 'dj'
  },
  {
    id: 'entertainment-packages',
    name: 'ENTERTAINMENT PACKAGES',
    subcategories: [
      'DJ + Singer Combo',
      'DJ + Dancer Combo',
      'Complete Wedding Entertainment',
      'Corporate Event Package',
      'Birthday Party Package'
    ],
    type: 'dj'
  },

  // PRODUCTION SERVICES
  {
    id: 'music-video-production',
    name: 'MUSIC VIDEO PRODUCTION',
    subcategories: [
      'Concept Development',
      'Full Music Video Production',
      'Lyrics Video Creation',
      'Music Video Editing',
      'Choreography Videos',
      'Band Performance Videos'
    ],
    type: 'production'
  },
  {
    id: 'short-film-production',
    name: 'SHORT FILM PRODUCTION',
    subcategories: [
      'Short Film Direction',
      'Script Writing',
      'Cinematography',
      'Short Film Editing',
      'Film Festival Submissions',
      'Documentary Filmmaking'
    ],
    type: 'production'
  },
  {
    id: 'film-crew-services',
    name: 'FILM CREW SERVICES',
    subcategories: [
      'Camera Operators',
      'Lighting Technicians',
      'Sound Recordists',
      'Production Assistants',
      'Makeup Artists',
      'Costume Designers'
    ],
    type: 'production'
  },

  // CONTENT CREATION & SOCIAL MEDIA
  {
    id: 'social-media-content',
    name: 'SOCIAL MEDIA CONTENT',
    subcategories: [
      'Instagram Content Creation',
      'YouTube Channel Management',
      'TikTok Content Strategy',
      'Facebook Content',
      'Social Media Management',
      'Content Calendar Planning'
    ],
    type: 'creative'
  },
  {
    id: 'short-form-content-creation',
    name: 'SHORT FORM CONTENT CREATION',
    subcategories: [
      'Instagram Reels Creation',
      'YouTube Shorts Production',
      'TikTok Viral Videos',
      'Story Content Creation',
      'Quick Video Ads',
      'Meme Content Creation'
    ],
    type: 'creative'
  },
  {
    id: 'content-strategy',
    name: 'CONTENT STRATEGY',
    subcategories: [
      'Social Media Strategy',
      'Content Planning',
      'Audience Growth',
      'Analytics & Reporting',
      'Brand Content Development',
      'Influencer Collaboration'
    ],
    type: 'creative'
  },

  // CREATIVE SERVICES
  {
    id: 'graphic-design',
    name: 'GRAPHIC DESIGN',
    subcategories: [
      'Logo Design',
      'Banner Design',
      'Social Media Graphics',
      'Wedding Card Design',
      'Brochure Design',
      'Poster Design'
    ],
    type: 'creative'
  },
  {
    id: 'animation-motion',
    name: 'ANIMATION & MOTION',
    subcategories: [
      '2D Animation',
      '3D Animation',
      'Motion Graphics',
      'Animated Logos',
      'Character Animation',
      'Explainer Videos'
    ],
    type: 'creative'
  },
  {
    id: 'specialized-creative',
    name: 'SPECIALIZED CREATIVE',
    subcategories: [
      'Album Design',
      'Wedding Invitation Design',
      'Photo Book Creation',
      'Digital Art Commission',
      'Custom Illustrations',
      'Brand Identity Design'
    ],
    type: 'creative'
  },

  // EQUIPMENT & SERVICES
  {
    id: 'production-equipment',
    name: 'PRODUCTION EQUIPMENT',
    subcategories: [
      'Camera Rental',
      'Lighting Equipment Rental',
      'Sound Equipment Rental',
      'Drone Rental',
      'Studio Space Rental',
      'Complete Production Kit'
    ],
    type: 'equipment'
  },
  {
    id: 'equipment-rental',
    name: 'EQUIPMENT RENTAL',
    subcategories: [
      'Camera & Lens Rental',
      'Lighting Equipment',
      'Audio Equipment',
      'Drone Rental',
      'Studio Space Rental',
      'Complete Kit Rental'
    ],
    type: 'equipment'
  },
  {
    id: 'consultation-services',
    name: 'CONSULTATION SERVICES',
    subcategories: [
      'Photography Consultation',
      'Videography Planning',
      'Content Strategy Session',
      'Equipment Purchase Guidance',
      'Creative Direction'
    ],
    type: 'equipment'
  },
  {
    id: 'training-workshops',
    name: 'TRAINING & WORKSHOPS',
    subcategories: [
      'Photography Classes',
      'Video Editing Tutorials',
      'DJ Training',
      'Singing Lessons',
      'Content Creation Workshops',
      'Professional Training'
    ],
    type: 'equipment'
  }
];

// Group categories by type for sidebar
const groupedCategories = {
  photography: allCategories.filter(cat => cat.type === 'photography'),
  videography: allCategories.filter(cat => cat.type === 'videography'),
  editing: allCategories.filter(cat => cat.type === 'editing'),
  audio: allCategories.filter(cat => cat.type === 'audio'),
  dj: allCategories.filter(cat => cat.type === 'dj'),
  production: allCategories.filter(cat => cat.type === 'production'),
  creative: allCategories.filter(cat => cat.type === 'creative'),
  equipment: allCategories.filter(cat => cat.type === 'equipment')
};

export default function Home() {
  // State for main page
  const [mainSearchQuery, setMainSearchQuery] = useState('');
  const [isMainSearching, setIsMainSearching] = useState(false);
  
  // State for sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Popular searches for main page
  const popularSearches = [
    'wedding photography',
    'pre-wedding shoot', 
    'video editing',
    'portrait photography',
    'event coverage',
    'cinematic videos',
    'maternity shoot',
    'product photography',
    'dj services',
    'music production'
  ];

  // Get icon for category type
  const getIconForType = (type: string) => {
    switch (type) {
      case 'photography': return <CameraIcon />;
      case 'videography': return <VideoIcon />;
      case 'editing': return <EditIcon />;
      case 'audio': return <AudioIcon />;
      case 'dj': return <DJIcon />;
      case 'production': return <FilmIcon />;
      case 'creative': return <DesignIcon />;
      case 'equipment': return <EquipmentIcon />;
      default: return <StarIcon />;
    }
  };

  // Handle main search (for gigs, profiles, services)
  const handleMainSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainSearchQuery.trim()) return;
    
    setIsMainSearching(true);
    console.log('MAIN SEARCH - Gigs/Profiles:', mainSearchQuery);
    
    // Simulate API call for main search - this will be connected to actual search later
    setTimeout(() => {
      setIsMainSearching(false);
      // For now, just log the search - we'll implement actual search functionality later
      alert(`Search functionality for "${mainSearchQuery}" will be implemented soon!`);
    }, 1000);
  };

  // Handle sidebar search (filters categories only)
  const handleSidebarSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = sidebarSearchQuery.toLowerCase().trim();
    
    if (!query) {
      setFilteredCategories([]);
      return;
    }
    
    console.log('SIDEBAR SEARCH - Categories:', query);
    
    const filtered = allCategories.filter(category => 
      category.name.toLowerCase().includes(query) ||
      category.subcategories.some(sub => sub.toLowerCase().includes(query))
    );
    
    setFilteredCategories(filtered);
  };

  // Handle category selection from sidebar
  const handleCategorySelect = (categoryName: string, subcategory?: string) => {
    const searchText = subcategory ? `${categoryName} - ${subcategory}` : categoryName;
    setMainSearchQuery(searchText);
    setIsSidebarOpen(false);
    // Trigger search with the selected category
    setTimeout(() => {
      handleMainSearch({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };

  // Toggle group expansion
  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Reset sidebar when closed
  useEffect(() => {
    if (!isSidebarOpen) {
      setSidebarSearchQuery('');
      setFilteredCategories([]);
    }
  }, [isSidebarOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Head>
        <title>CamRove - Marketplace for Creative Freelancers</title>
        <meta name="description" content="Connect with top photographers, videographers, and creative professionals" />
        <link rel="icon" href="/logo-icon.png" />
      </Head>

                      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo - Directly on the left edge */}
            <Link href="/" className="flex items-center mr-8">
              <div className="h-14 w-44 relative">
                <img
                  src="/logo.png"
                  alt="CamRove"
                  className="h-14 w-44 object-contain"
                  onError={(e) => {
                    console.log('Logo failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </Link>

            {/* Right side elements pushed to far right */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Become a Rover Button - Desktop */}
              <Link 
                href="/auth/onboarding" 
                className="hidden md:flex items-center px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <UserIcon className="w-4 h-4 mr-2" />
                Become a Rover
              </Link>

              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>

              <button
                onClick={toggleSidebar}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar/Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
          
          {/* Sidebar Content */}
          <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Services & Categories</h2>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search Bar inside Sidebar */}
              <form onSubmit={handleSidebarSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={sidebarSearchQuery}
                  onChange={(e) => setSidebarSearchQuery(e.target.value)}
                  placeholder="Search all categories & services..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Auth Section in Sidebar */}
            <div className="p-4 border-b dark:border-gray-700">
              <div className="flex space-x-3">
                <Link 
                  href="/auth/login" 
                  className="flex-1 text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={toggleSidebar}
                >
                  Sign Up
                </Link>
              </div>
              
              {/* Become a Rover - Mobile */}
              <Link 
                href="/auth/onboarding" 
                className="mt-3 w-full flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                onClick={toggleSidebar}
              >
                <UserIcon className="w-4 h-4 mr-2" />
                Become a Rover
              </Link>
            </div>

            {/* Sidebar Content */}
            <div className="p-4">
              {filteredCategories.length > 0 ? (
                // Search Results View
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                    Search Results ({filteredCategories.length})
                  </h3>
                  <div className="space-y-3">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="p-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="text-gray-500 dark:text-gray-400">
                              {getIconForType(category.type)}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                          </div>
                          <div className="pl-9 space-y-1">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => handleCategorySelect(category.name, sub)}
                                className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer py-1 transition-colors"
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Category Groups View
                <div className="space-y-6">
                  {Object.entries(groupedCategories).map(([groupName, categories]) => (
                    <div key={groupName} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleGroup(groupName)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-500 dark:text-gray-400">
                            {getIconForType(groupName)}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white capitalize">
                              {groupName}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              ({categories.length} categories)
                            </span>
                          </div>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedGroups[groupName] ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedGroups[groupName] && (
                        <div className="border-t border-gray-200 dark:border-gray-700">
                          <div className="p-4 space-y-3">
                            {categories.map((category) => (
                              <div key={category.id} className="border border-gray-100 dark:border-gray-600 rounded-lg p-3">
                                <div className="font-medium text-gray-900 dark:text-white mb-2">
                                  {category.name}
                                </div>
                                <div className="space-y-1">
                                  {category.subcategories.map((sub) => (
                                    <button
                                      key={sub}
                                      onClick={() => handleCategorySelect(category.name, sub)}
                                      className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer py-1 pl-2 transition-colors"
                                    >
                                      {sub}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Connect with Top Creative Freelancers
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Your marketplace for photographers, videographers, and creative professionals
          </p>
          
          {/* Main Search */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleMainSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={mainSearchQuery}
                  onChange={(e) => setMainSearchQuery(e.target.value)}
                  placeholder="Search for gigs, profiles, services..."
                  className="w-full px-6 py-4 text-gray-900 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isMainSearching}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isMainSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {/* Popular Searches */}
          <div className="mt-8">
            <p className="text-sm opacity-80 mb-3">Popular Services: </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setMainSearchQuery(search)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition-all backdrop-blur-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Become a Rover CTA */}
          <div className="mt-12">
            <p className="text-lg mb-4 opacity-90">Are you a creative professional?</p>
            <Link 
              href="/auth/onboarding" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Become a Rover - Start Earning Today
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Categories Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse Professional Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Photography', icon: <CameraIcon />, count: `${groupedCategories.photography.length} categories`, type: 'photography' },
              { name: 'Videography', icon: <VideoIcon />, count: `${groupedCategories.videography.length} categories`, type: 'videography' },
              { name: 'Editing', icon: <EditIcon />, count: `${groupedCategories.editing.length} categories`, type: 'editing' },
              { name: 'Audio & Music', icon: <MusicIcon />, count: `${groupedCategories.audio.length + groupedCategories.dj.length} categories`, type: 'audio' },
              { name: 'Production', icon: <FilmIcon />, count: `${groupedCategories.production.length} categories`, type: 'production' },
              { name: 'Creative', icon: <DesignIcon />, count: `${groupedCategories.creative.length} categories`, type: 'creative' },
              { name: 'Equipment', icon: <EquipmentIcon />, count: `${groupedCategories.equipment.length} categories`, type: 'equipment' },
              { name: 'All Services', icon: <StarIcon />, count: `${allCategories.length} total categories`, type: 'all' }
            ].map((service) => (
              <button 
                key={service.name}
                onClick={() => {
                  toggleSidebar();
                  setTimeout(() => {
                    if (service.type !== 'all') {
                      setExpandedGroups(prev => ({ ...prev, [service.type]: true }));
                    }
                  }, 100);
                }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform text-blue-600 dark:text-blue-400">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{service.count}</p>
              </button>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How CamRove Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Browse & Discover</h3>
              <p className="text-gray-600 dark:text-gray-400">Explore {allCategories.length}+ service categories and find the perfect creative professional for your project</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Book & Connect</h3>
              <p className="text-gray-600 dark:text-gray-400">Secure your booking with our protected payment system and connect directly with professionals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Create & Celebrate</h3>
              <p className="text-gray-600 dark:text-gray-400">Receive amazing results and celebrate your successful collaboration with top talent</p>
            </div>
          </div>

          {/* Become a Rover Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Join Our Community?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join thousands of creative professionals who are already earning on CamRove. Set up your profile in minutes and start getting booked.
            </p>
            <Link 
              href="/auth/onboarding" 
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Start Your Journey as a Rover
            </Link>
          </div>
        </section>
      </main>

           {/* Footer */}
      <footer className="bg-gray-800 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center mb-6">
                <div className="h-12 w-40 relative">
                  <img
                    src="/logo.png"
                    alt="CamRove"
                    className="h-12 w-40 object-contain"
                  />
                </div>
              </Link>
              <p className="text-gray-400 text-lg leading-relaxed">
                Your trusted marketplace for creative freelancers and professionals. 
                Connect with the best photographers, videographers, and creative talent in Kolkata.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <button 
                    onClick={toggleSidebar} 
                    className="hover:text-white transition-colors text-lg font-medium"
                  >
                    All Categories
                  </button>
                </li>
                <li>
                  <Link href="/auth/onboarding" className="hover:text-white transition-colors text-lg font-medium">
                    Become a Rover
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Featured Professionals
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">For Professionals</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="/auth/onboarding" className="hover:text-white transition-colors text-lg font-medium">
                    Join as Rover
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Create Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Pricing & Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Resources & Guides
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-6 text-white">Support & Legal</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors text-lg font-medium">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white transition-colors text-lg font-medium">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-lg font-medium">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-lg mb-4 md:mb-0">
                <p>&copy; 2024 CamRove. All rights reserved.</p>
              </div>
              <div className="text-gray-400 text-lg">
                <p>{allCategories.length}+ service categories available across Kolkata</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}