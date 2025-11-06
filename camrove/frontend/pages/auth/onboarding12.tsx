import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Types
type AccountType = 'FREELANCER' | 'STUDIO' | 'AGENCY' | null;
type ExperienceLevel = 'STUDENT_FRESHER' | 'EMERGING_TALENT' | 'EXPERIENCED' | 'SEASONED_EXPERT' | 'INDUSTRY_VETERAN' | null;
type TeamSize = 'SOLO' | 'SMALL_TEAM' | 'MEDIUM_TEAM' | 'LARGE_TEAM' | null;
type PricingTier = 'BUDGET' | 'MID_RANGE' | 'PREMIUM' | 'LUXURY' | 'CUSTOM' | null;

interface OnboardingData {
  // Step 1
  accountType: AccountType;
  
  // Step 2A (Freelancer)
  experienceLevel: ExperienceLevel;
  yearsOfExperience: number;
  
  // Step 2B (Studio/Agency)
  teamSize: TeamSize;
  
  // Step 3
  primaryServices: string[];
  
  // Step 4
  equipment: string[];
  
  // Step 5
  localities: string[];
  baseLocality: string;
  
  // Step 6
  travelRadius: string;
  pricingTier: PricingTier;
  
  // Step 7
  availability: string[];
  
  // Step 8
  portfolio: {
    images: File[];
    showreelUrl: string;
    instagramUrl: string;
    websiteUrl: string;
  };
  
  // Step 9
  hasPhysicalSpace: boolean;
  studioAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  
  // Step 10
  mainProfession: string;
  
  // Profession-specific questions
  professionDetails: any;
}

const kolkataLocalities = [
  'Entire Kolkata',
  'Central Kolkata',
  'Bowbazar', 'Dalhousie', 'Esplanade', 'Lalbazar', 'Park Street', 'Chowringhee', 'BBD Bagh',
  'North Kolkata',
  'Bagbazar', 'Baranagar', 'Belgharia', 'Cossipore', 'Dum Dum', 'Shyambazar', 'Shobhabazar',
  'Maniktala', 'Ultadanga', 'Kankurgachi', 'Narkeldanga', 'Paikpara', 'Birati', 'Nona Chandanpukur',
  'South Kolkata',
  'Alipore', 'Anandapur', 'Ballygunge', 'Bansdroni', 'Barisha', 'Behala', 'Chetla', 'Dhakuria',
  'Garia', 'Gariahat', 'Garfa', 'Golf Green', 'Jadavpur', 'Jodhpur Park', 'Kalighat', 'Kasba',
  'Lake Gardens', 'Mukundapur', 'New Alipore', 'New Garia', 'Naktala', 'Rashbehari', 'Santoshpur',
  'Sarsuna', 'Southern Avenue', 'Tollygunge', 'Tardah',
  'East Kolkata',
  'Beliaghata', 'EM Bypass', 'Picnic Garden', 'Tangra', 'Topsia', 'Salt Lake (Bidhannagar)',
  'Rajarhat', 'New Town', 'Tiljala',
  'West Kolkata',
  'Bhowanipore', 'Howrah', 'Bally', 'Batanagar', 'Garden Reach', 'Ghusuri', 'Rishra', 'Serampore',
  'Uttarpara', 'Panihati'
];

const primaryServicesOptions = [
  {
    category: 'PHOTOGRAPHY SERVICES',
    services: [
      'Wedding Photography', 'Portrait Photography', 'Event Photography', 'Product Photography',
      'Fashion Photography', 'Real Estate Photography', 'Food Photography'
    ]
  },
  {
    category: 'VIDEOGRAPHY SERVICES',
    services: [
      'Wedding Videography', 'Corporate Videos', 'Event Coverage', 'Documentary Films',
      'Music Videos', 'Commercial Ads', 'Social Media Content'
    ]
  },
  {
    category: 'ADDITIONAL SERVICES',
    services: [
      'Photo Editing', 'Video Editing', 'Color Grading', 'Drone Photography/Videography',
      'Album Design', 'Photo Restoration'
    ]
  }
];

const equipmentOptions = [
  {
    category: 'CAMERAS',
    items: ['DSLR', 'Mirrorless', 'Cinema Camera', 'Action Cam', 'Smartphone Pro']
  },
  {
    category: 'SPECIAL EQUIPMENT',
    items: ['Drone', 'Gimbal/Stabilizer', 'Lighting Equipment', 'Professional Audio Gear', 'Green Screen', 'Full Studio Setup']
  },
  {
    category: 'SOFTWARE',
    items: ['Adobe Creative Suite', 'Final Cut Pro', 'DaVinci Resolve', 'Other Editing Software', 'Custom/Proprietary Tools']
  }
];

const professionOptions = [
  'Video Editor',
  'Photo Editor/Photoshop Expert',
  'Short Form Content Creator (Reels/TikTok/Shorts)',
  'Music Video Director/Producer',
  'Short Film Maker',
  'Film Set Professional',
  'DJ',
  'Singer/Vocalist',
  'Music Composer/Producer',
  'Graphic Designer',
  'Animator/Motion Graphics',
  'Voice Over Artist',
  'Other Creative Professional'
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    accountType: null,
    experienceLevel: null,
    yearsOfExperience: 0,
    teamSize: null,
    primaryServices: [],
    equipment: [],
    localities: [],
    baseLocality: '',
    travelRadius: '',
    pricingTier: null,
    availability: [],
    portfolio: {
      images: [],
      showreelUrl: '',
      instagramUrl: '',
      websiteUrl: ''
    },
    hasPhysicalSpace: false,
    studioAddress: {
      street: '',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: ''
    },
    mainProfession: '',
    professionDetails: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Progress calculation
  const totalSteps = 13;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log('Submitting onboarding data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/professional');
    }, 2000);
  };

  const updateFormData = (updates: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        if (formData.accountType === 'FREELANCER') {
          return <Step2A formData={formData} updateFormData={updateFormData} />;
        } else {
          return <Step2B formData={formData} updateFormData={updateFormData} />;
        }
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 5:
        return <Step5 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 6:
        return <Step6 formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <Step7 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 8:
        return <Step8 formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <Step9 formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <Step10 formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <Step11 formData={formData} updateFormData={updateFormData} />;
      case 12:
        return <Step12 formData={formData} updateFormData={updateFormData} />;
      case 13:
        return <Step13 formData={formData} updateFormData={updateFormData} />;
      default:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Become a Rover - CamRove</title>
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
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t dark:border-gray-700">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Setting Up...' : currentStep === totalSteps ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Step Components
const Step1 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to CamRove!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Let's set up your professional profile. This will help clients find and book your services.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What type of account are you creating?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'FREELANCER', label: 'Freelancer', description: 'Individual creative professional' },
              { value: 'STUDIO', label: 'Studio', description: 'Photography/videography studio' },
              { value: 'AGENCY', label: 'Agency', description: 'Creative agency with multiple services' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => updateFormData({ accountType: type.value as AccountType })}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  formData.accountType === type.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                  {type.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step2A = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  const experienceLevels = [
    { value: 'STUDENT_FRESHER', label: 'Student/Fresher', description: '0-1 year experience', hideYears: true },
    { value: 'EMERGING_TALENT', label: 'Emerging Talent', description: '1-3 years experience' },
    { value: 'EXPERIENCED', label: 'Experienced', description: '3-7 years experience' },
    { value: 'SEASONED_EXPERT', label: 'Seasoned Expert', description: '7+ years experience' },
    { value: 'INDUSTRY_VETERAN', label: 'Industry Veteran', description: '10+ years experience' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Professional Level</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Tell us about your experience level.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {experienceLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFormData({ 
                experienceLevel: level.value as ExperienceLevel,
                yearsOfExperience: level.hideYears ? 0 : formData.yearsOfExperience
              })}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                formData.experienceLevel === level.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                {level.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {level.description}
              </p>
            </button>
          ))}
        </div>

        {formData.experienceLevel && !experienceLevels.find(l => l.value === formData.experienceLevel)?.hideYears && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.yearsOfExperience}
              onChange={(e) => updateFormData({ yearsOfExperience: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter years of experience"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Step2B = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  const teamSizes = [
    { value: 'SOLO', label: 'Solo (1 person)', description: 'Individual professional' },
    { value: 'SMALL_TEAM', label: 'Small Team (2-3 people)', description: 'Small creative team' },
    { value: 'MEDIUM_TEAM', label: 'Medium Team (4-6 people)', description: 'Medium sized team' },
    { value: 'LARGE_TEAM', label: 'Large Team (7+ people)', description: 'Large team or agency' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Team Size</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        How many people are in your team?
      </p>

      <div className="grid grid-cols-1 gap-4">
        {teamSizes.map((size) => (
          <button
            key={size.value}
            onClick={() => updateFormData({ teamSize: size.value as TeamSize })}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              formData.teamSize === size.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
              {size.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {size.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

const Step3 = ({ formData, updateFormData, toggleArrayItem }: { 
  formData: OnboardingData, 
  updateFormData: (data: Partial<OnboardingData>) => void,
  toggleArrayItem: (array: string[], item: string) => string[]
}) => {
  const handleServiceToggle = (service: string) => {
    const updatedServices = toggleArrayItem(formData.primaryServices, service);
    updateFormData({ primaryServices: updatedServices });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Primary Services</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        What services do you offer? (Select all that apply)
      </p>

      <div className="space-y-8">
        {primaryServicesOptions.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.services.map((service) => (
                <label key={service} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.primaryServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{service}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 4: Equipment
const Step4 = ({ formData, updateFormData, toggleArrayItem }: { 
  formData: OnboardingData, 
  updateFormData: (data: Partial<OnboardingData>) => void,
  toggleArrayItem: (array: string[], item: string) => string[]
}) => {
  const handleEquipmentToggle = (item: string) => {
    const updatedEquipment = toggleArrayItem(formData.equipment, item);
    updateFormData({ equipment: updatedEquipment });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Equipment & Software</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        What equipment and software do you use? (Select all that apply)
      </p>

      <div className="space-y-8">
        {equipmentOptions.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item) => (
                <label key={item} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(item)}
                    onChange={() => handleEquipmentToggle(item)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 5: Localities
const Step5 = ({ formData, updateFormData, toggleArrayItem }: { 
  formData: OnboardingData, 
  updateFormData: (data: Partial<OnboardingData>) => void,
  toggleArrayItem: (array: string[], item: string) => string[]
}) => {
  const handleLocalityToggle = (locality: string) => {
    if (locality === 'Entire Kolkata') {
      updateFormData({ localities: ['Entire Kolkata'] });
    } else {
      const updatedLocalities = toggleArrayItem(
        formData.localities.filter(l => l !== 'Entire Kolkata'), 
        locality
      );
      updateFormData({ localities: updatedLocalities });
    }
  };

  const groupedLocalities = kolkataLocalities.reduce((acc, locality) => {
    if (locality.includes('Kolkata') && !locality.includes('Entire')) {
      const group = locality.split(' ')[0];
      if (!acc[group]) acc[group] = [];
      acc[group].push(locality);
    } else if (!locality.includes('Entire')) {
      if (!acc['Other']) acc['Other'] = [];
      acc['Other'].push(locality);
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Service Area</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Where do you operate and serve clients?
      </p>

      <div className="space-y-8">
        {/* Entire Kolkata Option */}
        <div className="p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.localities.includes('Entire Kolkata')}
              onChange={() => handleLocalityToggle('Entire Kolkata')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              I serve entire Kolkata
            </span>
          </label>
        </div>

        {/* Base Locality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Base Locality (Where you're primarily located)
          </label>
          <select
            value={formData.baseLocality}
            onChange={(e) => updateFormData({ baseLocality: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select your base locality</option>
            {kolkataLocalities.filter(l => l !== 'Entire Kolkata').map((locality) => (
              <option key={locality} value={locality}>{locality}</option>
            ))}
          </select>
        </div>

        {/* Localities Selection */}
        {!formData.localities.includes('Entire Kolkata') && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select specific localities you serve:
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {Object.entries(groupedLocalities).map(([group, localities]) => (
                <div key={group}>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{group}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {localities.map((locality) => (
                      <label key={locality} className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.localities.includes(locality)}
                          onChange={() => handleLocalityToggle(locality)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{locality}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 6: Travel Radius & Pricing
const Step6 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  const travelOptions = [
    { value: '5km', label: 'Within 5 km' },
    { value: '10km', label: 'Within 10 km' },
    { value: '25km', label: 'Within 25 km' },
    { value: 'entire_kolkata', label: 'Entire Kolkata' }
  ];

  const pricingOptions = [
    { value: 'BUDGET', label: 'BUDGET', range: '₹5,000 - ₹20,000' },
    { value: 'MID_RANGE', label: 'MID-RANGE', range: '₹20,000 - ₹50,000' },
    { value: 'PREMIUM', label: 'PREMIUM', range: '₹50,000 - ₹1,00,000' },
    { value: 'LUXURY', label: 'LUXURY', range: '₹1,00,000+' },
    { value: 'CUSTOM', label: 'CUSTOM QUOTES ONLY', range: 'Custom pricing' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Travel & Pricing</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Set your travel preferences and pricing range.
      </p>

      <div className="space-y-8">
        {/* Travel Radius */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            How far are you willing to travel for gigs?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFormData({ travelRadius: option.value })}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  formData.travelRadius === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Range */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What's your pricing range?
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {pricingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFormData({ pricingTier: option.value as PricingTier })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.pricingTier === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {option.range}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 7: Availability
const Step7 = ({ formData, updateFormData, toggleArrayItem }: { 
  formData: OnboardingData, 
  updateFormData: (data: Partial<OnboardingData>) => void,
  toggleArrayItem: (array: string[], item: string) => string[]
}) => {
  const availabilityOptions = [
    'AVAILABLE FULL-TIME',
    'AVAILABLE PART-TIME',
    'AVAILABLE ON WEEKENDS',
    'AVAILABLE FOR LAST-MINUTE BOOKINGS'
  ];

  const handleAvailabilityToggle = (availability: string) => {
    const updatedAvailability = toggleArrayItem(formData.availability, availability);
    updateFormData({ availability: updatedAvailability });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Availability</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        When are you available for work?
      </p>

      <div className="grid grid-cols-1 gap-4">
        {availabilityOptions.map((option) => (
          <label key={option} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.availability.includes(option)}
              onChange={() => handleAvailabilityToggle(option)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {option.replace('AVAILABLE ', '')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Step 8: Portfolio Showcase
const Step8 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these to a server
    updateFormData({
      portfolio: {
        ...formData.portfolio,
        images: [...formData.portfolio.images, ...files].slice(0, 10) // Limit to 10 images
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Showcase Your Work</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Add your portfolio to attract clients.
      </p>

      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Portfolio Images (Max 10)
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="portfolio-upload"
            />
            <label htmlFor="portfolio-upload" className="cursor-pointer">
              <div className="text-gray-600 dark:text-gray-400">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2">Click to upload images</p>
                <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
              </div>
            </label>
          </div>
          {formData.portfolio.images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {formData.portfolio.images.length} images selected
            </p>
          )}
        </div>

        {/* Showreel URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            YouTube/Vimeo Showreel Link
          </label>
          <input
            type="url"
            value={formData.portfolio.showreelUrl}
            onChange={(e) => updateFormData({ 
              portfolio: { ...formData.portfolio, showreelUrl: e.target.value }
            })}
            placeholder="https://youtube.com/your-showreel"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instagram Profile
          </label>
          <input
            type="url"
            value={formData.portfolio.instagramUrl}
            onChange={(e) => updateFormData({ 
              portfolio: { ...formData.portfolio, instagramUrl: e.target.value }
            })}
            placeholder="https://instagram.com/your-profile"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website URL
          </label>
          <input
            type="url"
            value={formData.portfolio.websiteUrl}
            onChange={(e) => updateFormData({ 
              portfolio: { ...formData.portfolio, websiteUrl: e.target.value }
            })}
            placeholder="https://your-portfolio.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

// Step 9: Physical Studio Space
const Step9 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  const studioOptions = [
    { value: true, label: 'YES, CLIENTS CAN VISIT', description: 'I have a physical studio space' },
    { value: false, label: 'NO, I WORK ON-LOCATION', description: 'I travel to client locations' },
    { value: false, label: 'SHARED STUDIO SPACE', description: 'I use shared or rented studio space' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Studio Space</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Do you have a physical studio space?
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {studioOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => updateFormData({ 
                hasPhysicalSpace: option.value,
                studioAddress: option.value ? formData.studioAddress : { street: '', city: 'Kolkata', state: 'West Bengal', pincode: '' }
              })}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                formData.hasPhysicalSpace === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                {option.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        {formData.hasPhysicalSpace && (
          <div className="mt-6 p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Studio Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.studioAddress.street}
                  onChange={(e) => updateFormData({
                    studioAddress: { ...formData.studioAddress, street: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your studio address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.studioAddress.city}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.studioAddress.pincode}
                  onChange={(e) => updateFormData({
                    studioAddress: { ...formData.studioAddress, pincode: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 10: Main Profession
const Step10 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Main Profession</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Choose your primary creative profession
      </p>

      <div className="grid grid-cols-1 gap-4">
        {professionOptions.map((profession) => (
          <button
            key={profession}
            onClick={() => updateFormData({ mainProfession: profession })}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              formData.mainProfession === profession
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {profession}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Steps 11-13 would continue with profession-specific questions, work preferences, etc.
// For brevity, I'll show the structure for the remaining steps:

const Step11 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Experience Level</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        How experienced are you in your profession?
      </p>
      {/* Add experience level options */}
    </div>
  );
};

const Step12 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Work Preferences</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        What type of work are you looking for?
      </p>
      {/* Add work preference options */}
    </div>
  );
};

const Step13 = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (data: Partial<OnboardingData>) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Final Details</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Almost done! Review your information.
      </p>
      {/* Add final review and submission */}
    </div>
  );
};