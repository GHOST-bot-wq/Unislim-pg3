import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full bg-[#EEECFF] h-1 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#7B6FE8] to-[#A78BFA] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
