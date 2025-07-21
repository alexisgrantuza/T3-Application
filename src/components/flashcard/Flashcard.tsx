import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "~/lib/utils";

type Difficulty = 'easy' | 'medium' | 'hard';

interface FlashcardProps {
  question: string;
  answer: string;
  difficulty: Difficulty;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export default function Flashcard({ question, answer, difficulty, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div 
      className={cn(
        "w-full max-w-md h-64 perspective-1000 mx-auto",
        className
      )}
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 ease-in-out preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* Front of Card */}
        <motion.div 
          className={cn(
            "absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col backface-hidden",
            "border border-gray-200"
          )}
          initial={false}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium px-2.5 py-0.5 rounded-full mb-2">
              Question
            </div>
            <span className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-full",
              difficultyColors[difficulty]
            )}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-lg font-medium">{question}</p>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            Click to reveal answer
          </div>
        </motion.div>

        {/* Back of Card */}
        <motion.div 
          className={cn(
            "absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col backface-hidden",
            "border border-gray-200 rotate-y-180"
          )}
          initial={false}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium px-2.5 py-0.5 rounded-full mb-2">
              Answer
            </div>
            <span className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-full",
              difficultyColors[difficulty]
            )}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-lg">{answer}</p>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            Click to see question
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
