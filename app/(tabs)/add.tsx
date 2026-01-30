import { FlashcardForm } from "@/components/flashcards/FlashcardForm";
import { tokens } from "@/constants/designTokens";
import { useFlashcards } from "@/state/flashcards-context";
import React from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function AddScreen() {
  const { addFlashcard } = useFlashcards();

  function handleSave(payload: {
    question: string;
    answer: string;
    imageUri?: string | null;
  }) {
    // For now, we've only confirmed (without saving to storage).
    addFlashcard(payload);
    Alert.alert("Saved ✅", "Flashcard added!");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.bg }}>
      <ScrollView
        contentContainerStyle={{
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        <Text
          style={{
            color: tokens.colors.text,
            fontSize: tokens.typography.size.xl,
            fontFamily: tokens.typography.family.base,
          }}
        >
          Add Flashcard
        </Text>

        <View
          style={{
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            padding: tokens.spacing.lg,
          }}
        >
          <FlashcardForm onSubmit={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
