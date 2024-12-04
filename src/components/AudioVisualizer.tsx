import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioVisualizer = ({ audioRef }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5;

        const gradient = ctx.createLinearGradient(0, HEIGHT, 0, HEIGHT - barHeight);
        gradient.addColorStop(0, '#00F3FF');
        gradient.addColorStop(1, '#9D00FF');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 rounded-lg border border-dj-neonBlue/20"
      width={800}
      height={128}
    />
  );
};

export default AudioVisualizer;