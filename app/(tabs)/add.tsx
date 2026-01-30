import { FlashcardForm } from "@/components/flashcards/FlashcardForm";
import { tokens } from "@/constants/designTokens";
import React from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function AddScreen() {
  function handleSave(payload: {
    question: string;
    answer: string;
    imageUri?: string | null;
  }) {
    // Por enquanto só confirmamos (sem salvar em storage)
    Alert.alert("Saved (mock)", `Q: ${payload.question}\nA: ${payload.answer}`);
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
