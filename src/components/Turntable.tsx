import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface TurntableProps {
  side: 'left' | 'right';
}

const Turntable = ({ side }: TurntableProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-dj-dark rounded-lg border border-dj-neonBlue/20">
      <div className={`w-64 h-64 rounded-full bg-gradient-to-r from-dj-neonBlue to-dj-neonPurple p-1 ${isPlaying ? 'animate-turntable-spin' : ''}`}>
        <div className="w-full h-full rounded-full bg-dj-dark flex items-center justify-center">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${side}`}
          />
          <label
            htmlFor={`file-upload-${side}`}
            className="cursor-pointer text-dj-neonBlue hover:text-dj-neonPurple transition-colors"
          >
            {audioFile ? audioFile.name : 'Drop Track Here'}
          </label>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-dj-neonBlue/20 hover:bg-dj-neonBlue/40 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-dj-neonBlue" />
          ) : (
            <Play className="w-6 h-6 text-dj-neonBlue" />
          )}
        </button>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-dj-neonBlue" />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default Turntable;