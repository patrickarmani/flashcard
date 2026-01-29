import { Flashcard } from "@/constants/types/flashcard";

export const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    frontText: "What is React Native?",
    backText: "A framework for building native apps using React.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    frontText: "What does useState do?",
    backText: "It creates state in a functional component.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
