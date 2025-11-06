import { useState, useEffect } from 'react';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  field: {
    name: string;
    type: 'radio' | 'select' | 'multiselect' | 'text' | 'number';
    label: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    maxSelections?: number;
  };
  nextStep: string | { [key: string]: string };
}

interface OnboardingData {
  role?: string;
  experience_level?: string;
  team_size?: string;
  services_offered?: string[];
  equipment?: string[];
  base_locality?: string;
}

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

export default function OnboardingWizard({ isOpen, onComplete, onClose }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState('q1');
  const [formData, setFormData] = useState<OnboardingData>({});
  const [steps, setSteps] = useState<WizardStep[]>([]);

  // Load wizard schema
  useEffect(() => {
    const loadWizardSchema = async () => {
      try {
        const response = await fetch('/data/wizard-schema.json');
        const schema = await response.json();
        setSteps(schema.steps);
      } catch (error) {
        console.error('Failed to load wizard schema:', error);
      }
    };

    if (isOpen) {
      loadWizardSchema();
      setCurrentStep('q1');
      setFormData({});
    }
  }, [isOpen]);

  const currentStepData = steps.find(step => step.id === currentStep);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleNext = () => {
    if (!currentStepData) return;

    const currentValue = formData[currentStepData.field.name as keyof OnboardingData];
    
    // Validate required fields
    if (currentStepData.field.required && !currentValue) {
      alert('This field is required');
      return;
    }

    // Determine next step
    let nextStep: string;
    if (typeof currentStepData.nextStep === 'string') {
      nextStep = currentStepData.nextStep;
    } else {
      nextStep = currentStepData.nextStep[currentValue as string] || 'q3';
    }

    if (nextStep === 'complete') {
      onComplete(formData);
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    // Simple back navigation - in real app, implement proper step history
    const stepIndex = steps.findIndex(step => step.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  const getProgressPercentage = () => {
    if (!steps.length) return 0;
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  if (!isOpen || !currentStepData) return null;

  const renderField = () => {
    const field = currentStepData.field;
    const value = formData[field.name as keyof OnboardingData];

    switch (field.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={value as string || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        const selectedValues = (value as string[]) || [];
        return (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    
                    if (field.maxSelections && newValues.length > field.maxSelections) {
                      alert(`Maximum ${field.maxSelections} selections allowed`);
                      return;
                    }
                    
                    handleInputChange(field.name, newValues);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
            {field.maxSelections && (
              <p className="text-sm text-gray-500">
                Select up to {field.maxSelections} options
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {currentStepData.field.label}
              {currentStepData.field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 'q1'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {typeof currentStepData.nextStep === 'string' && currentStepData.nextStep === 'complete' 
                ? 'Complete Setup' 
                : 'Continue'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}