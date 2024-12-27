import React from 'react';

const PricingSegment: React.FC = () => {
  return (
    <div className="flex justify-center mt-8">
      {/* Free Option */}
      <div className="bg-white shadow-lg rounded-lg mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Free</h2>
        <p className="text-gray-600 mb-4">Perfect for getting started</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>

      {/* $20 Option */}
      <div className="bg-white shadow-lg rounded-lg mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">$20</h2>
        <p className="text-gray-600 mb-4">Unlock premium features</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default PricingSegment;
