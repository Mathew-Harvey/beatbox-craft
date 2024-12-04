import React from 'react';
import { Slider } from "@/components/ui/slider";

interface CrossfaderProps {
  onChange: (value: number[]) => void;
}

const Crossfader = ({ onChange }: CrossfaderProps) => {
  return (
    <div className="w-64 p-4 bg-dj-dark rounded-lg border border-dj-neonPurple/20">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={onChange}
        className="w-full"
      />
    </div>
  );
};

export default Crossfader;