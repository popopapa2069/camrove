export interface Category {
  id: string;
  name: string;
  subcategories: string[];
  type: 'photography' | 'videography' | 'editing' | 'audio' | 'dj' | 'production' | 'creative' | 'equipment';
}

export const allCategories: Category[] = [
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
    id: 'short-form-content',
    name: 'SHORT FORM CONTENT',
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
    name: 'SPECIALIZED EDITING',
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
    name: 'CREATIVE EDITING',
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
    id: 'equipment-services',
    name: 'EQUIPMENT SERVICES',
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

  // EQUIPMENT & TRAINING
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
export const groupedCategories = {
  photography: allCategories.filter(cat => cat.type === 'photography'),
  videography: allCategories.filter(cat => cat.type === 'videography'),
  editing: allCategories.filter(cat => cat.type === 'editing'),
  audio: allCategories.filter(cat => cat.type === 'audio'),
  dj: allCategories.filter(cat => cat.type === 'dj'),
  production: allCategories.filter(cat => cat.type === 'production'),
  creative: allCategories.filter(cat => cat.type === 'creative'),
  equipment: allCategories.filter(cat => cat.type === 'equipment')
};