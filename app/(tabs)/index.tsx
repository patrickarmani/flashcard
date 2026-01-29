import { FlashcardViewer } from "@/components/flashcards/FlashcardViewer";
import { mockFlashcards } from "@/constants/data/mockFlashcards";
import { tokens } from "@/constants/designTokens";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [showBack, setShowBack] = useState(false);

  const card = mockFlashcards[0];

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

      <FlashcardViewer card={card} showBack={showBack} />

      <Pressable
        onPress={() => setShowBack((v) => !v)}
        style={{
          backgroundColor: tokens.colors.primary,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0D0B1F", fontSize: tokens.typography.size.md }}>
          {showBack ? "Show Question" : "Show Answer"}
        </Text>
      </Pressable>
    </View>
  );
}
