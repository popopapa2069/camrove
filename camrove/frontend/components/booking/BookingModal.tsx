import { useState, useEffect } from 'react';

interface ServiceOption {
  id: string;
  option_name: string;
  extra_cost: number;
  is_default: boolean;
  description: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studioId: string;
  serviceId: string;
  serviceName: string;
  basePrice: number;
  options: ServiceOption[];
}

export default function BookingModal({
  isOpen,
  onClose,
  studioId,
  serviceId,
  serviceName,
  basePrice,
  options
}: BookingModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    let total = basePrice;
    selectedOptions.forEach(optionId => {
      const option = options.find(opt => opt.id === optionId);
      if (option) total += option.extra_cost;
    });
    return total;
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleBookNow = async () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select date and time slot');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to create booking
      const bookingData = {
        studioId,
        serviceId,
        selectedOptions,
        totalAmount: calculateTotal(),
        date: selectedDate,
        slot: selectedSlot
      };
      
      console.log('Booking data:', bookingData);
      
      // TODO: Integrate with actual booking API
      alert('Booking created successfully! (Dummy)');
      onClose();
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load default selected options
  useEffect(() => {
    const defaultOptions = options
      .filter(opt => opt.is_default)
      .map(opt => opt.id);
    setSelectedOptions(defaultOptions);
  }, [options]);

  // Simulate loading available slots
  useEffect(() => {
    if (selectedDate) {
      // In real app, fetch from API
      setAvailableSlots([
        { id: '1', time: '09:00 AM - 12:00 PM' },
        { id: '2', time: '02:00 PM - 05:00 PM' },
        { id: '3', time: '06:00 PM - 09:00 PM' }
      ]);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  const totalAmount = calculateTotal();
  const depositAmount = 999;
  const remainingAmount = totalAmount - depositAmount;
  const escrowAmount = remainingAmount * 0.25;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book {serviceName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Options & Add-ons</h3>
            <div className="space-y-3">
              {options.map(option => (
                <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionToggle(option.id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{option.option_name}</span>
                      <span className="text-green-600">+₹{option.extra_cost}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      selectedSlot === slot.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>₹{basePrice}</span>
              </div>
              {selectedOptions.map(optionId => {
                const option = options.find(opt => opt.id === optionId);
                return option ? (
                  <div key={optionId} className="flex justify-between text-sm">
                    <span>+ {option.option_name}:</span>
                    <span>₹{option.extra_cost}</span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Booking Deposit:</span>
                  <span>₹{depositAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Remaining Amount:</span>
                  <span>₹{remainingAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Escrow Hold (25%):</span>
                  <span>₹{escrowAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Pay Now:</span>
                <span>₹{depositAmount}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleBookNow}
              disabled={isLoading || !selectedDate || !selectedSlot}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : `Pay ₹${depositAmount} Deposit`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}