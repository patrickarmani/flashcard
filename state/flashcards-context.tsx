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
  deleteFlashcard: (id: string) => void;
  updateFlashcard: (id: string, input: AddFlashcardInput) => void;
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

  // 1) Load from AsyncStorage when app starts
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Flashcard[];
          setFlashcards(parsed);
        } else {
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

  // 2) Save whenever the list changes (after hydration)
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

  // ✅ CREATE
  function addFlashcard(input: AddFlashcardInput) {
    const q = input.question.trim();
    const a = input.answer.trim();

    // ✅ Safety guard: do not save empty fields
    if (!q || !a) return;

    const now = new Date().toISOString();
    const newCard: Flashcard = {
      id: makeId(),
      frontText: q,
      backText: a,
      backImageUri: input.imageUri ?? undefined,
      createdAt: now,
      updatedAt: now,
    };

    setFlashcards((prev) => [newCard, ...prev]);
  }

  // ✅ DELETE
  function deleteFlashcard(id: string) {
    setFlashcards((prev) => prev.filter((c) => c.id !== id));
  }

  // ✅ UPDATE
  function updateFlashcard(id: string, input: AddFlashcardInput) {
    const q = input.question.trim();
    const a = input.answer.trim();

    // ✅ Safety guard: do not update with empty fields
    if (!q || !a) return;

    const now = new Date().toISOString();

    setFlashcards((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              frontText: q,
              backText: a,
              backImageUri: input.imageUri ?? undefined,
              updatedAt: now,
            }
          : c,
      ),
    );
  }

  const value = useMemo(
    () => ({ flashcards, addFlashcard, deleteFlashcard, updateFlashcard }),
    [flashcards],
  );

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
