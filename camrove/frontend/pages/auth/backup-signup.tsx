import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Import your existing categories (simplified version)
const serviceCategories = [
  {
    id: 'wedding-photography',
    name: 'WEDDING PHOTOGRAPHY',
    subcategories: ['Pre-Wedding Shoot', 'Engagement Ceremony', 'Wedding Day Coverage', 'Reception Coverage']
  },
  {
    id: 'portrait-photography', 
    name: 'PORTRAIT PHOTOGRAPHY',
    subcategories: ['Family Portraits', 'Couple Portraits', 'Maternity Shoot', 'Professional Headshots']
  },
  {
    id: 'event-photography',
    name: 'EVENT PHOTOGRAPHY', 
    subcategories: ['Birthday Parties', 'Corporate Events', 'Product Launches', 'Private Parties']
  },
  {
    id: 'wedding-videography',
    name: 'WEDDING VIDEOGRAPHY',
    subcategories: ['Wedding Highlights Film', 'Full Ceremony Coverage', 'Cinematic Wedding Films']
  },
  {
    id: 'dj-services',
    name: 'DJ SERVICES',
    subcategories: ['Wedding DJ', 'Club DJ', 'Private Party DJ', 'Corporate Event DJ']
  },
  {
    id: 'music-production',
    name: 'MUSIC PRODUCTION',
    subcategories: ['Music Composition', 'Song Production', 'Background Scores', 'Jingle Creation']
  }
  // Add more categories as needed from your existing list
];

const budgetOptions = [
  { value: 'budget', label: 'Budget (Under ₹10,000)', range: '₹5,000 - ₹10,000' },
  { value: 'mid-range', label: 'Mid-Range (₹10,000 - ₹50,000)', range: '₹10,000 - ₹50,000' },
  { value: 'premium', label: 'Premium (₹50,000 - ₹1,00,000)', range: '₹50,000 - ₹1,00,000' },
  { value: 'luxury', label: 'Luxury (₹1,00,000+)', range: '₹1,00,000 and above' },
  { value: 'custom', label: 'Custom Budget', range: 'I have a specific budget in mind' }
];

const locationOptions = [
  { value: 'entire-kolkata', label: 'Entire Kolkata', description: 'Open to professionals from anywhere in Kolkata' },
  { value: 'my-locality', label: 'My Locality Only', description: 'Prefer professionals near my area' },
  { value: 'specific-areas', label: 'Specific Areas', description: 'I have specific areas in mind' }
];

const kolkataLocalities = [
  'Central Kolkata', 'North Kolkata', 'South Kolkata', 'East Kolkata', 'West Kolkata',
  'Salt Lake', 'New Town', 'Howrah', 'Park Street', 'Gariahat', 'Dum Dum', 'Behala'
];

const timelineOptions = [
  { value: 'immediately', label: 'Immediately (Within a week)', description: 'I need this service soon' },
  { value: '2-weeks', label: 'Within 2 weeks', description: 'Planning for the near future' },
  { value: '1-month', label: 'Within a month', description: 'Planning ahead' },
  { value: 'exploring', label: 'Just exploring options', description: 'No specific timeline yet' }
];

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    
    // Step 2: Service Preferences
    selectedServices: [] as string[],
    serviceSearch: '',
    
    // Step 3: Budget
    budget: '',
    customBudget: '',
    
    // Step 4: Location
    locationPreference: '',
    selectedLocalities: [] as string[],
    
    // Step 5: Timeline
    timeline: '',
    
    // Step 6: How heard about us
    referralSource: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [filteredServices, setFilteredServices] = useState(serviceCategories);

  const router = useRouter();

  // Filter services based on search
  useEffect(() => {
    if (formData.serviceSearch) {
      const query = formData.serviceSearch.toLowerCase();
      const {filteredServices.map((category: any) => (


    else {
      setFilteredServices(serviceCategories);
    }
  }, [formData.serviceSearch]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';
    }

    if (step === 2) {
      if (formData.selectedServices.length === 0) {
        newErrors.selectedServices = 'Please select at least one service you are interested in';
      }
    }

    if (step === 3) {
      if (!formData.budget) newErrors.budget = 'Please select your budget range';
      if (formData.budget === 'custom' && !formData.customBudget) {
        newErrors.customBudget = 'Please specify your custom budget';
      }
    }

    if (step === 4) {
      if (!formData.locationPreference) newErrors.locationPreference = 'Please select your location preference';
      if (formData.locationPreference === 'specific-areas' && formData.selectedLocalities.length === 0) {
        newErrors.selectedLocalities = 'Please select at least one area';
      }
    }

    if (step === 5) {
      if (!formData.timeline) newErrors.timeline = 'Please select your timeline';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 6) {
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
    
    console.log('User signup data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleService = (service: string) => {
    const updatedServices = formData.selectedServices.includes(service)
      ? formData.selectedServices.filter(s => s !== service)
      : [...formData.selectedServices, service];
    
    setFormData(prev => ({ ...prev, selectedServices: updatedServices }));
    
    if (errors.selectedServices) {
      setErrors(prev => ({ ...prev, selectedServices: '' }));
    }
  };

  const toggleLocality = (locality: string) => {
    const updatedLocalities = formData.selectedLocalities.includes(locality)
      ? formData.selectedLocalities.filter(l => l !== locality)
      : [...formData.selectedLocalities, locality];
    
    setFormData(prev => ({ ...prev, selectedLocalities: updatedLocalities }));
    
    if (errors.selectedLocalities) {
      setErrors(prev => ({ ...prev, selectedLocalities: '' }));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return (
          <Step2 
            formData={formData} 
            handleChange={handleChange}
            toggleService={toggleService}
            filteredServices={filteredServices}
            errors={errors}
          />
        );
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return (
          <Step4 
            formData={formData} 
            handleChange={handleChange}
            toggleLocality={toggleLocality}
            errors={errors}
          />
        );
      case 5:
        return <Step5 formData={formData} handleChange={handleChange} errors={errors} />;
      case 6:
        return <Step6 formData={formData} handleChange={handleChange} />;
      default:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Sign Up - CamRove</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center">
          <Link href="/">
            <div className="h-12 w-40 relative">
              <img
                src="/logo.png"
                alt="CamRove"
                className="h-12 w-40 object-contain"
              />
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Join CamRove
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Find the perfect creative professionals for your needs
        </p>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStep} of 6</span>
            <span>{Math.round((currentStep / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t dark:border-gray-700">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating Account...' : currentStep === 6 ? 'Complete Sign Up' : 'Next'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Basic Information
const Step1 = ({ formData, handleChange, errors }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h3>
        <p className="text-gray-600 dark:text-gray-400">Tell us a bit about yourself</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Create a password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </label>
            {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Service Preferences
const Step2 = ({ formData, handleChange, toggleService, filteredServices, errors }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Service Preferences</h3>
        <p className="text-gray-600 dark:text-gray-400">What services are you looking for? Select all that interest you.</p>
      </div>

      {/* Search Box */}
      <div>
        <label htmlFor="serviceSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Services
        </label>
        <input
          id="serviceSearch"
          name="serviceSearch"
          type="text"
          value={formData.serviceSearch}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Search for services (e.g., wedding photography, DJ, video editing...)"
        />
      </div>

      {/* Services Selection */}
      <div className="max-h-96 overflow-y-auto space-y-4">
        {filteredServices.map((category) => (
          <div key={category.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{category.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {category.subcategories.map((subcategory) => (
                <label key={subcategory} className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedServices.includes(subcategory)}
                    onChange={() => toggleService(subcategory)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{subcategory}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {errors.selectedServices && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {errors.selectedServices}
        </p>
      )}

      {formData.selectedServices.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Selected services:</strong> {formData.selectedServices.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

// Step 3: Budget
const Step3 = ({ formData, handleChange, errors }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Budget Range</h3>
        <p className="text-gray-600 dark:text-gray-400">What's your budget for these services?</p>
      </div>

      <div className="space-y-4">
        {budgetOptions.map((option) => (
          <label key={option.value} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <input
              type="radio"
              name="budget"
              value={option.value}
              checked={formData.budget === option.value}
              onChange={handleChange}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.range}</p>
            </div>
          </label>
        ))}
      </div>

      {errors.budget && <p className="text-sm text-red-600">{errors.budget}</p>}

      {/* Custom Budget Input */}
      {formData.budget === 'custom' && (
        <div className="mt-4">
          <label htmlFor="customBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Budget Amount
          </label>
          <input
            id="customBudget"
            name="customBudget"
            type="text"
            value={formData.customBudget}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.customBudget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., ₹25,000"
          />
          {errors.customBudget && <p className="mt-1 text-sm text-red-600">{errors.customBudget}</p>}
        </div>
      )}
    </div>
  );
};

// Step 4: Location Preference
const Step4 = ({ formData, handleChange, toggleLocality, errors }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Location Preference</h3>
        <p className="text-gray-600 dark:text-gray-400">Where are you looking for professionals?</p>
      </div>

      <div className="space-y-4">
        {locationOptions.map((option) => (
          <label key={option.value} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <input
              type="radio"
              name="locationPreference"
              value={option.value}
              checked={formData.locationPreference === option.value}
              onChange={handleChange}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
          </label>
        ))}
      </div>

      {errors.locationPreference && <p className="text-sm text-red-600">{errors.locationPreference}</p>}

      {/* Specific Areas Selection */}
      {formData.locationPreference === 'specific-areas' && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Select specific areas:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {kolkataLocalities.map((locality) => (
              <label key={locality} className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.selectedLocalities.includes(locality)}
                  onChange={() => toggleLocality(locality)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{locality}</span>
              </label>
            ))}
          </div>
          {errors.selectedLocalities && <p className="mt-2 text-sm text-red-600">{errors.selectedLocalities}</p>}
        </div>
      )}
    </div>
  );
};

// Step 5: Timeline
const Step5 = ({ formData, handleChange, errors }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Timeline</h3>
        <p className="text-gray-600 dark:text-gray-400">When are you planning to book these services?</p>
      </div>

      <div className="space-y-4">
        {timelineOptions.map((option) => (
          <label key={option.value} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <input
              type="radio"
              name="timeline"
              value={option.value}
              checked={formData.timeline === option.value}
              onChange={handleChange}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
          </label>
        ))}
      </div>

      {errors.timeline && <p className="text-sm text-red-600">{errors.timeline}</p>}
    </div>
  );
};

// Step 6: How did you hear about us
const Step6 = ({ formData, handleChange }: any) => {
  const referralSources = [
    'Social Media (Instagram/Facebook)',
    'Friend or Family Referral',
    'Google Search',
    'YouTube',
    'Advertisement',
    'Word of Mouth',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Almost Done!</h3>
        <p className="text-gray-600 dark:text-gray-400">How did you hear about CamRove?</p>
      </div>

      <div>
        <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How did you hear about us?
        </label>
        <select
          id="referralSource"
          name="referralSource"
          value={formData.referralSource}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select an option</option>
          {referralSources.map((source) => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300">
          <strong>Great!</strong> Your preferences will help us find the perfect professionals for you. 
          You can always update these in your profile settings.
        </p>
      </div>
    </div>
  );
};