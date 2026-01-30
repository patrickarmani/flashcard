import { mockFlashcards } from "@/constants/data/mockFlashcards";
import { Flashcard } from "@/constants/types/flashcard";
import React, { createContext, useContext, useMemo, useState } from "react";

type AddFlashcardInput = {
  question: string;
  answer: string;
  imageUri?: string | null;
};

type FlashcardsContextValue = {
  flashcards: Flashcard[];
  addFlashcard: (input: AddFlashcardInput) => void;
};

const FlashcardsContext = createContext<FlashcardsContextValue | null>(null);

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function FlashcardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);

  function addFlashcard(input: AddFlashcardInput) {
    const now = new Date().toISOString();
    const newCard: Flashcard = {
      id: makeId(),
      frontText: input.question,
      backText: input.answer,
      backImageUri: input.imageUri ?? undefined,
      createdAt: now,
      updatedAt: now,
    };

    setFlashcards((prev) => [newCard, ...prev]);
  }

  const value = useMemo(() => ({ flashcards, addFlashcard }), [flashcards]);

  return (
    <FlashcardsContext.Provider value={value}>
      {children}
    </FlashcardsContext.Provider>
  );
}

export function useFlashcards() {
  const ctx = useContext(FlashcardsContext);
  if (!ctx) {
    throw new Error("useFlashcards must be used inside FlashcardsProvider");
  }
  return ctx;
}
