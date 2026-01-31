import { mockFlashcards } from "@/constants/data/mockFlashcards";
import { Flashcard } from "@/constants/types/flashcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AddFlashcardInput = {
  question: string;
  answer: string;
  imageUri?: string | null;
};

type FlashcardsContextValue = {
  flashcards: Flashcard[];
  addFlashcard: (input: AddFlashcardInput) => void;
};
const STORAGE_KEY = "flashcards.v1";

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
  const [hydrated, setHydrated] = useState(false);

  // 1) Carregar do AsyncStorage quando o app iniciar
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Flashcard[];
          setFlashcards(parsed);
        } else {
          // primeira execução: usa mockFlashcards
          setFlashcards(mockFlashcards);
        }
      } catch (err) {
        console.warn("Failed to load flashcards:", err);
        setFlashcards(mockFlashcards);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // 2) Salvar toda vez que a lista mudar (depois que já carregou)
  useEffect(() => {
    if (!hydrated) return;

    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
      } catch (err) {
        console.warn("Failed to save flashcards:", err);
      }
    })();
  }, [flashcards, hydrated]);

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
