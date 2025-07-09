interface Flashcard {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  // Additional properties can be added as needed
  title?: string | null;
  description?: string | null;
  createdBy?: { connect: { id: string } };
}

interface FlashcardResponse {
  flashcards: Flashcard[];
}
