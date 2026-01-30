import { FlashcardList } from "@/components/flashcards/FlashcardList";
import { FlashcardViewer } from "@/components/flashcards/FlashcardViewer";
import { useFlashcards } from "@/state/flashcards-context";

import { tokens } from "@/constants/designTokens";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { flashcards } = useFlashcards();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showBack, setShowBack] = useState(false);

  if (flashcards.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: tokens.colors.muted }}>
          No flashcards yet. Add your first one!
        </Text>
      </View>
    );
  }
  // const card = flashcards[0];
  const selectedCard =
    flashcards.find((c) => c.id === selectedId) ?? flashcards[0];
  const hasAnswer = !!selectedCard.backText?.trim();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.colors.bg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.lg,
      }}
    >
      <Text
        style={{
          color: tokens.colors.text,
          fontSize: tokens.typography.size.xl,
        }}
      >
        Flashcard
      </Text>

      <FlashcardList
        data={flashcards}
        selectedId={selectedCard.id}
        onSelect={(id) => {
          setSelectedId(id);
          setShowBack(false); // It always comes back to the question.
        }}
      />

      <FlashcardViewer card={selectedCard} showBack={showBack} />

      <Pressable
        disabled={!hasAnswer}
        onPress={() => setShowBack((v) => !v)}
        style={{
          backgroundColor: tokens.colors.primary,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          alignItems: "center",
          opacity: hasAnswer ? 1 : 0.45,
        }}
      >
        <Text style={{ color: "#0D0B1F", fontSize: tokens.typography.size.md }}>
          {!hasAnswer
            ? "No answer yet"
            : showBack
              ? "Show Question"
              : "Show Answer"}
        </Text>
      </Pressable>
    </View>
  );
}
