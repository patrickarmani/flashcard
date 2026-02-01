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

  const selectedCard =
    flashcards.find((c) => c.id === selectedId) ?? flashcards[0];

  const hasAnswer = !!selectedCard.backText?.trim();

  // ✅ Progress info
  const total = flashcards.length;
  const selectedIndex = Math.max(
    0,
    flashcards.findIndex((c) => c.id === selectedCard.id),
  );

  function goPrev() {
    if (total === 0) return;
    const prevIndex = (selectedIndex - 1 + total) % total;
    setSelectedId(flashcards[prevIndex].id);
    setShowBack(false);
  }

  function goNext() {
    if (total === 0) return;
    const nextIndex = (selectedIndex + 1) % total;
    setSelectedId(flashcards[nextIndex].id);
    setShowBack(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.colors.bg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.lg,
      }}
    >
      <View style={{ gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: tokens.colors.text,
            fontSize: tokens.typography.size.xl,
          }}
        >
          Flashcard
        </Text>

        <Text style={{ color: tokens.colors.muted }}>
          {selectedIndex + 1}/{total}
        </Text>
      </View>

      <FlashcardList
        data={flashcards}
        selectedId={selectedCard.id}
        onSelect={(id) => {
          setSelectedId(id);
          setShowBack(false); // always back to question
        }}
      />

      <FlashcardViewer card={selectedCard} showBack={showBack} />

      {/* ✅ Prev/Next controls */}
      <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
        <Pressable
          onPress={goPrev}
          style={{
            flex: 1,
            backgroundColor: tokens.colors.surface,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: tokens.colors.text,
              fontSize: tokens.typography.size.md,
            }}
          >
            Prev
          </Text>
        </Pressable>

        <Pressable
          onPress={goNext}
          style={{
            flex: 1,
            backgroundColor: tokens.colors.surface,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: tokens.colors.text,
              fontSize: tokens.typography.size.md,
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>

      {/* ✅ Flip */}
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
