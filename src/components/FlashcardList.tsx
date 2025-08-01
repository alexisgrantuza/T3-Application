"use client";

import { api } from "~/trpc/react";
import Flashcard, { type Difficulty } from "./flashcard/Flashcard";

export default function FlashcardList() {
  const {
    data: flashcardSets,
    isLoading,
    error,
  } = api.flashcard.getFlashcardSets.useQuery();

  if (isLoading) return <div>Loading flashcards...</div>;
  if (error) return <div>Error loading flashcards: {error.message}</div>;
  if (!flashcardSets?.length)
    return <div>No flashcards found. Upload a file to get started!</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flashcardSets.map((flashcardSet) => (
        <Flashcard
          key={flashcardSet.id}
          question={
            flashcardSet.flashcards[0]?.question ?? "No question available"
          }
          answer={flashcardSet.flashcards[0]?.answer ?? "No answer available"}
          difficulty={
            (flashcardSet.flashcards[0]?.difficulty as Difficulty) || "medium"
          }
        />
      ))}
    </div>
  );
}
