import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  UserIcon, 
  CameraIcon, 
  BuildingIcon, 
  MapPinIcon,
  BriefcaseIcon,
  CogIcon,
  CheckCircleIcon
} from '../components/ui/Icons';

// Types
type AccountType = 'FREELANCER' | 'STUDIO' | 'AGENCY' | null;
type ExperienceLevel = 'FRESHER' | 'ONE_TO_THREE' | 'THREE_TO_SEVEN' | 'SEVEN_PLUS' | null;
type TeamSize = 'SOLO' | 'SMALL_TEAM' | 'MEDIUM_TEAM' | 'LARGE_TEAM' | null;

interface OnboardingData {
  // Step 1: Account Type
  accountType: AccountType;
  
  // Step 2: Basic Information (Common for all)
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      locality: string;
    };
  };
  
  // Step 3: Type-Specific Information
  typeSpecific: {
    // For Freelancers
    experienceLevel: ExperienceLevel;
    yearsOfExperience: number;
    mainProfession: string;
    
    // For Studios/Agencies
    businessName: string;
    teamSize: TeamSize;
    studioAddress: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
    hasPhysicalSpace: boolean;
  };
  
  // Step 4: Services & Skills
  services: string[];
  equipment: string[];
  specialties: string[];
  
  // Step 5: Business Details
  serviceAreas: string[];
  baseLocality: string;
  travelRadius: string;
  pricingTier: string;
  availability: string[];
  
  // Step 6: Portfolio & Verification
  portfolio: {
    images: File[];
    showreelUrl: string;
    instagramUrl: string;
    websiteUrl: string;
  };
  acceptTerms: boolean;
}

// Service categories (simplified)
const serviceCategories = [
  'Wedding Photography', 'Portrait Photography', 'Event Photography', 'Product Photography',
  'Wedding Videography', 'Corporate Videos', 'Event Coverage', 'Documentary Films',
  'Photo Editing', 'Video Editing', 'Color Grading', 'Drone Photography',
  'DJ Services', 'Music Production', 'Voice Over', 'Graphic Design'
];

const equipmentOptions = [
  'DSLR Camera', 'Mirrorless Camera', 'Cinema Camera', 'Drone', 'Gimbal/Stabilizer',
  'Lighting Equipment', 'Professional Audio Gear', 'Green Screen', 'Full Studio Setup',
  'Adobe Creative Suite', 'Final Cut Pro', 'DaVinci Resolve'
];

const kolkataLocalities = [
  'Central Kolkata', 'North Kolkata', 'South Kolkata', 'East Kolkata', 'West Kolkata',
  'Salt Lake', 'New Town', 'Howrah', 'Park Street', 'Gariahat', 'Dum Dum', 'Behala'
];

const professionOptions = [
  'Photographer', 'Videographer', 'Photo Editor', 'Video Editor', 'Drone Operator',
  'DJ', 'Music Producer', 'Graphic Designer', 'Animator', 'Voice Over Artist'
];

export default function BecomeRover() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    accountType: null,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: {
        street: '',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '',
        locality: ''
      }
    },
    typeSpecific: {
      experienceLevel: null,
      yearsOfExperience: 0,
      mainProfession: '',
      businessName: '',
      teamSize: null,
      studioAddress: {
        street: '',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: ''
      },
      hasPhysicalSpace: false
    },
    services: [],
    equipment: [],
    specialties: [],
    serviceAreas: [],
    baseLocality: '',
    travelRadius: '',
    pricingTier: '',
    availability: [],
    portfolio: {
      images: [],
      showreelUrl: '',
      instagramUrl: '',
      websiteUrl: ''
    },
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [stepCompleted, setStepCompleted] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  // Check if current step is completed
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.accountType !== null;
      case 2:
        return !!(formData.personalInfo.fullName.trim() && 
                 formData.personalInfo.email.trim() && 
                 formData.personalInfo.phone.trim() && 
                 formData.personalInfo.password &&
                 formData.personalInfo.password === formData.personalInfo.confirmPassword &&
                 formData.personalInfo.address.street.trim() &&
                 formData.personalInfo.address.pincode.trim());
      case 3:
        if (formData.accountType === 'FREELANCER') {
          return !!(formData.typeSpecific.experienceLevel && 
                   formData.typeSpecific.mainProfession.trim());
        } else {
          return !!(formData.typeSpecific.businessName.trim() && 
                   formData.typeSpecific.teamSize &&
                   (!formData.typeSpecific.hasPhysicalSpace || formData.typeSpecific.studioAddress.street.trim()));
        }
      case 4:
        return formData.services.length > 0 && formData.equipment.length > 0;
      case 5:
        return !!(formData.baseLocality && 
                 formData.travelRadius && 
                 formData.pricingTier && 
                 formData.availability.length > 0);
      case 6:
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  // Update step completion status when form data changes
  useEffect(() => {
    setStepCompleted(prev => ({
      ...prev,
      [currentStep]: isStepCompleted(currentStep)
    }));
  }, [formData, currentStep]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.accountType) {
        newErrors.accountType = 'Please select account type';
      }
    }

    if (step === 2) {
      if (!formData.personalInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.personalInfo.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) newErrors.email = 'Email is invalid';
      if (!formData.personalInfo.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.personalInfo.phone)) newErrors.phone = 'Phone number must be 10 digits';
      if (!formData.personalInfo.password) newErrors.password = 'Password is required';
      else if (formData.personalInfo.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.personalInfo.password !== formData.personalInfo.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.personalInfo.address.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.personalInfo.address.pincode.trim()) newErrors.pincode = 'Pincode is required';
    }

    if (step === 3) {
      if (formData.accountType === 'FREELANCER') {
        if (!formData.typeSpecific.experienceLevel) newErrors.experienceLevel = 'Please select experience level';
        if (!formData.typeSpecific.mainProfession.trim()) newErrors.mainProfession = 'Please select your main profession';
      } else {
        if (!formData.typeSpecific.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.typeSpecific.teamSize) newErrors.teamSize = 'Please select team size';
        if (formData.typeSpecific.hasPhysicalSpace && !formData.typeSpecific.studioAddress.street.trim()) {
          newErrors.studioAddress = 'Studio address is required';
        }
      }
    }

    if (step === 4) {
      if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
      if (formData.equipment.length === 0) newErrors.equipment = 'Please select your equipment';
    }

    if (step === 5) {
      if (!formData.baseLocality) newErrors.baseLocality = 'Please select your base locality';
      if (!formData.travelRadius) newErrors.travelRadius = 'Please select travel radius';
      if (!formData.pricingTier) newErrors.pricingTier = 'Please select pricing tier';
      if (formData.availability.length === 0) newErrors.availability = 'Please select availability';
    }

    if (step === 6) {
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
    if (!validateStep(6)) return;
    
    setIsLoading(true);
    console.log('Professional onboarding data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/professional');
    }, 2000);
  };

  const updateFormData = (updates: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors when user updates form
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const updatePersonalInfo = (updates: Partial<OnboardingData['personalInfo']>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  };

  const updateTypeSpecific = (updates: Partial<OnboardingData['typeSpecific']>) => {
    setFormData(prev => ({
      ...prev,
      typeSpecific: { ...prev.typeSpecific, ...updates }
    }));
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2 formData={formData} updatePersonalInfo={updatePersonalInfo} errors={errors} />;
      case 3:
        return <Step3 formData={formData} updateTypeSpecific={updateTypeSpecific} errors={errors} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} errors={errors} />;
      case 5:
        return <Step5 formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} errors={errors} />;
      case 6:
        return <Step6 formData={formData} updateFormData={updateFormData} errors={errors} />;
      default:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
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
              disabled={isLoading || !isStepCompleted(currentStep)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <CogIcon className="w-4 h-4 animate-spin" />
                  <span>Setting Up...</span>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Complete Setup</span>
                </>
              ) : (
                <span>Next</span>
              )}
            </button>
          </div>

          {/* Step Completion Hint */}
          {!isStepCompleted(currentStep) && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-300 text-center">
                Please complete all required fields in this step to continue
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Step 1: Account Type Selection
const Step1 = ({ formData, updateFormData, errors }: any) => {
  const accountTypes = [
    {
      value: 'FREELANCER',
      label: 'Freelancer',
      description: 'Individual creative professional working independently',
      icon: UserIcon
    },
    {
      value: 'STUDIO',
      label: 'Studio',
      description: 'Photography/videography studio with physical space',
      icon: CameraIcon
    },
    {
      value: 'AGENCY',
      label: 'Agency',
      description: 'Creative agency offering multiple services',
      icon: BuildingIcon
    }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <BriefcaseIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join as a Rover</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose your professional account type to get started
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.value}
              onClick={() => updateFormData({ accountType: type.value })}
              className={`p-6 border-2 rounded-lg text-center transition-all ${
                formData.accountType === type.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className="flex justify-center mb-4">
                <IconComponent className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                {type.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {type.description}
              </p>
            </button>
          );
        })}
      </div>

      {errors.accountType && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{errors.accountType}</p>
        </div>
      )}
    </div>
  );
};

// Step 2: Basic Personal Information (Common for all)
const Step2 = ({ formData, updatePersonalInfo, errors }: any) => {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <UserIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Information</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tell us about yourself
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password *
          </label>
          <input
            type="password"
            value={formData.personalInfo.password}
            onChange={(e) => updatePersonalInfo({ password: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Create a password"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            value={formData.personalInfo.confirmPassword}
            onChange={(e) => updatePersonalInfo({ confirmPassword: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.personalInfo.address.street}
            onChange={(e) => updatePersonalInfo({ 
              address: { ...formData.personalInfo.address, street: e.target.value }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your street address"
          />
          {errors.street && <p className="mt-2 text-sm text-red-600">{errors.street}</p>}
        </div>

        {/* Locality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Locality *
          </label>
          <select
            value={formData.personalInfo.address.locality}
            onChange={(e) => updatePersonalInfo({ 
              address: { ...formData.personalInfo.address, locality: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select your locality</option>
            {kolkataLocalities.map((locality) => (
              <option key={locality} value={locality}>{locality}</option>
            ))}
          </select>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            value={formData.personalInfo.address.pincode}
            onChange={(e) => updatePersonalInfo({ 
              address: { ...formData.personalInfo.address, pincode: e.target.value }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.pincode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter pincode"
          />
          {errors.pincode && <p className="mt-2 text-sm text-red-600">{errors.pincode}</p>}
        </div>
      </div>
    </div>
  );
};

// Step 3: Type-Specific Information
const Step3 = ({ formData, updateTypeSpecific, errors }: any) => {
  if (formData.accountType === 'FREELANCER') {
    return <FreelancerStep3 formData={formData} updateTypeSpecific={updateTypeSpecific} errors={errors} />;
  } else {
    return <StudioAgencyStep3 formData={formData} updateTypeSpecific={updateTypeSpecific} errors={errors} />;
  }
};

// Freelancer-specific step 3
const FreelancerStep3 = ({ formData, updateTypeSpecific, errors }: any) => {
  const experienceLevels = [
    { value: 'FRESHER', label: 'Fresher (0-1 year)', description: 'Just starting my career' },
    { value: 'ONE_TO_THREE', label: '1-3 years', description: 'Some professional experience' },
    { value: 'THREE_TO_SEVEN', label: '3-7 years', description: 'Experienced professional' },
    { value: 'SEVEN_PLUS', label: '7+ years', description: 'Seasoned expert' }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <UserIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Details</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tell us about your professional background
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Experience Level */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Experience Level *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experienceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateTypeSpecific({ experienceLevel: level.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.typeSpecific.experienceLevel === level.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{level.label}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{level.description}</p>
              </button>
            ))}
          </div>
          {errors.experienceLevel && (
            <p className="mt-2 text-sm text-red-600">{errors.experienceLevel}</p>
          )}
        </div>

        {/* Years of Experience (if not fresher) */}
        {formData.typeSpecific.experienceLevel && formData.typeSpecific.experienceLevel !== 'FRESHER' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.typeSpecific.yearsOfExperience}
              onChange={(e) => updateTypeSpecific({ yearsOfExperience: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter years of experience"
            />
          </div>
        )}

        {/* Main Profession */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Main Profession *
          </label>
          <select
            value={formData.typeSpecific.mainProfession}
            onChange={(e) => updateTypeSpecific({ mainProfession: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.mainProfession ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select your main profession</option>
            {professionOptions.map((profession) => (
              <option key={profession} value={profession}>{profession}</option>
            ))}
          </select>
          {errors.mainProfession && <p className="mt-2 text-sm text-red-600">{errors.mainProfession}</p>}
        </div>
      </div>
    </div>
  );
};

// Studio/Agency-specific step 3
const StudioAgencyStep3 = ({ formData, updateTypeSpecific, errors }: any) => {
  const teamSizes = [
    { value: 'SOLO', label: 'Solo (1 person)', description: 'Individual professional' },
    { value: 'SMALL_TEAM', label: 'Small Team (2-3 people)', description: 'Small creative team' },
    { value: 'MEDIUM_TEAM', label: 'Medium Team (4-6 people)', description: 'Medium sized team' },
    { value: 'LARGE_TEAM', label: 'Large Team (7+ people)', description: 'Large team or agency' }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <BuildingIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Details</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tell us about your {formData.accountType?.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {formData.accountType === 'STUDIO' ? 'Studio Name' : 'Agency Name'} *
          </label>
          <input
            type="text"
            value={formData.typeSpecific.businessName}
            onChange={(e) => updateTypeSpecific({ businessName: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.businessName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={`Enter your ${formData.accountType?.toLowerCase()} name`}
          />
          {errors.businessName && <p className="mt-2 text-sm text-red-600">{errors.businessName}</p>}
        </div>

        {/* Team Size */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Team Size *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => updateTypeSpecific({ teamSize: size.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.typeSpecific.teamSize === size.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{size.label}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{size.description}</p>
              </button>
            ))}
          </div>
          {errors.teamSize && <p className="mt-2 text-sm text-red-600">{errors.teamSize}</p>}
        </div>

        {/* Physical Space */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Do you have a physical {formData.accountType === 'STUDIO' ? 'studio' : 'office'} space?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => updateTypeSpecific({ hasPhysicalSpace: true })}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                formData.typeSpecific.hasPhysicalSpace
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-white">Yes</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Clients can visit</p>
            </button>
            <button
              onClick={() => updateTypeSpecific({ hasPhysicalSpace: false })}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                formData.typeSpecific.hasPhysicalSpace === false
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-white">No</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Work on location only</p>
            </button>
          </div>
        </div>

        {/* Studio/Office Address (if has physical space) */}
        {formData.typeSpecific.hasPhysicalSpace && (
          <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
              {formData.accountType === 'STUDIO' ? 'Studio' : 'Office'} Address
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.typeSpecific.studioAddress.street}
                  onChange={(e) => updateTypeSpecific({
                    studioAddress: { ...formData.typeSpecific.studioAddress, street: e.target.value }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    errors.studioAddress ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter studio/office address"
                />
                {errors.studioAddress && <p className="mt-2 text-sm text-red-600">{errors.studioAddress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.typeSpecific.studioAddress.pincode}
                  onChange={(e) => updateTypeSpecific({
                    studioAddress: { ...formData.typeSpecific.studioAddress, pincode: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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

// Step 4: Services & Equipment
const Step4 = ({ formData, updateFormData, toggleArrayItem, errors }: any) => {
  const handleServiceToggle = (service: string) => {
    const updatedServices = toggleArrayItem(formData.services, service);
    updateFormData({ services: updatedServices });
  };

  const handleEquipmentToggle = (equipment: string) => {
    const updatedEquipment = toggleArrayItem(formData.equipment, equipment);
    updateFormData({ equipment: updatedEquipment });
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <CogIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services & Equipment</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            What services do you offer and what equipment do you use?
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Services Offered *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceCategories.map((service) => (
              <label key={service} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{service}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{errors.services}</p>
            </div>
          )}
        </div>

        {/* Equipment */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Equipment & Software *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.map((equipment) => (
              <label key={equipment} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.equipment.includes(equipment)}
                  onChange={() => handleEquipmentToggle(equipment)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{equipment}</span>
              </label>
            ))}
          </div>
          {errors.equipment && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{errors.equipment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 5: Business Details
const Step5 = ({ formData, updateFormData, toggleArrayItem, errors }: any) => {
  const travelOptions = [
    { value: '5km', label: 'Within 5 km' },
    { value: '10km', label: 'Within 10 km' },
    { value: '25km', label: 'Within 25 km' },
    { value: 'entire_kolkata', label: 'Entire Kolkata' }
  ];

  const pricingTiers = [
    { value: 'budget', label: 'Budget', range: '₹5,000 - ₹20,000' },
    { value: 'mid-range', label: 'Mid-Range', range: '₹20,000 - ₹50,000' },
    { value: 'premium', label: 'Premium', range: '₹50,000 - ₹1,00,000' },
    { value: 'luxury', label: 'Luxury', range: '₹1,00,000+' },
    { value: 'custom', label: 'Custom Quotes', range: 'Based on project requirements' }
  ];

  const availabilityOptions = [
    'Full-Time', 'Part-Time', 'Weekends Only', 'Evenings Only', 'Last-Minute Bookings'
  ];

  const handleAvailabilityToggle = (availability: string) => {
    const updatedAvailability = toggleArrayItem(formData.availability, availability);
    updateFormData({ availability: updatedAvailability });
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <MapPinIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Preferences</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Set your service area, pricing, and availability
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Base Locality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Base Locality *
          </label>
          <select
            value={formData.baseLocality}
            onChange={(e) => updateFormData({ baseLocality: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.baseLocality ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select your base locality</option>
            {kolkataLocalities.map((locality) => (
              <option key={locality} value={locality}>{locality}</option>
            ))}
          </select>
          {errors.baseLocality && <p className="mt-2 text-sm text-red-600">{errors.baseLocality}</p>}
        </div>

        {/* Travel Radius */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Travel Radius *
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
                <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.travelRadius && <p className="mt-2 text-sm text-red-600">{errors.travelRadius}</p>}
        </div>

        {/* Pricing Tier */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pricing Tier *
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {pricingTiers.map((tier) => (
              <button
                key={tier.value}
                onClick={() => updateFormData({ pricingTier: tier.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.pricingTier === tier.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">{tier.label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tier.range}</span>
                </div>
              </button>
            ))}
          </div>
          {errors.pricingTier && <p className="mt-2 text-sm text-red-600">{errors.pricingTier}</p>}
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Availability *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availabilityOptions.map((availability) => (
              <label key={availability} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(availability)}
                  onChange={() => handleAvailabilityToggle(availability)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{availability}</span>
              </label>
            ))}
          </div>
          {errors.availability && <p className="mt-2 text-sm text-red-600">{errors.availability}</p>}
        </div>
      </div>
    </div>
  );
};

// Step 6: Portfolio & Terms
const Step6 = ({ formData, updateFormData, errors }: any) => {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircleIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Final Details</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Add your portfolio and accept the terms
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Portfolio Links */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Showreel/Portfolio URL
            </label>
            <input
              type="url"
              value={formData.portfolio.showreelUrl}
              onChange={(e) => updateFormData({
                portfolio: { ...formData.portfolio, showreelUrl: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://youtube.com/your-showreel"
            />
          </div>

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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://instagram.com/your-profile"
            />
          </div>

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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://your-website.com"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t dark:border-gray-700 pt-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => updateFormData({ acceptTerms: e.target.checked })}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900 dark:text-white">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                By checking this box, you confirm that all information provided is accurate and you agree to our professional standards.
              </p>
            </div>
          </label>
          {errors.acceptTerms && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{errors.acceptTerms}</p>
            </div>
          )}
        </div>

        {/* Success Message */}
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Ready to start your journey!
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Once you complete this setup, your profile will be reviewed and you can start receiving booking requests from clients in Kolkata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};