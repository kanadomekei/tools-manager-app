import React from 'react';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4 cursor-pointer",
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          )}
          onClick={() => onRatingChange(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;