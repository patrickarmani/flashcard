export type Flashcard = {
  id: string;
  frontText: string;
  backText: string;
  backImageUri?: string; // optional image in the answer
  createdAt: string;
  updatedAt: string;
};
