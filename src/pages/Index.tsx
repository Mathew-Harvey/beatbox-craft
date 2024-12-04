import React, { useState } from 'react';
import Turntable from '@/components/Turntable';
import Crossfader from '@/components/Crossfader';

const Index = () => {
  const [crossfaderValue, setCrossfaderValue] = useState([50]);

  const handleCrossfaderChange = (value: number[]) => {
    setCrossfaderValue(value);
    // TODO: Implement audio mixing logic
  };

  return (
    <div className="min-h-screen bg-dj-dark p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-dj-neonBlue to-dj-neonPurple text-transparent bg-clip-text">
          Web DJ
        </h1>
        
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-8">
            <Turntable side="left" />
            <Turntable side="right" />
          </div>
          
          <Crossfader onChange={handleCrossfaderChange} />
        </div>
      </div>
    </div>
  );
};

export default Index;