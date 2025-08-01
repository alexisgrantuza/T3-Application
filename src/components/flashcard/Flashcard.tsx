import { useState } from "react";

export type Difficulty = "easy" | "medium" | "hard";

interface FlashcardProps {
  question: string;
  answer: string;
  difficulty: Difficulty;
  className?: string;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function Flashcard({
  question,
  answer,
  difficulty,
  className = "",
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`mx-auto h-64 w-full max-w-md cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of Card */}
        <div
          className={`absolute flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg border border-gray-200 ${difficultyColors[difficulty]}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="mb-2 rounded-full px-2.5 py-0.5 text-sm font-medium">
              Question
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center text-center">
            <p className="text-lg font-medium">{question}</p>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            Click to reveal answer
          </div>
        </div>

        {/* Back of Card */}
        <div
          className={`absolute flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg border border-gray-200 ${difficultyColors[difficulty]}`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="mb-2 rounded-full px-2.5 py-0.5 text-sm font-medium">
              Answer
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center text-center">
            <p className="text-lg font-medium">{answer}</p>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            Click to see question
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component to test the flashcard
function FlashcardDemo() {
  const sampleFlashcards = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      difficulty: "easy" as Difficulty
    },
    {
      question: "What is the derivative of x²?",
      answer: "2x",
      difficulty: "medium" as Difficulty
    },
    {
      question: "Explain quantum entanglement",
      answer: "A phenomenon where particles become interconnected and the quantum state of each particle cannot be described independently.",
      difficulty: "hard" as Difficulty
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Flashcard Demo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleFlashcards.map((card, index) => (
            <Flashcard
              key={index}
              question={card.question}
              answer={card.answer}
              difficulty={card.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  );
}