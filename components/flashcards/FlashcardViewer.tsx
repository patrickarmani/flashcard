import { tokens } from "@/constants/designTokens";
import { Flashcard } from "@/constants/types/flashcard";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  card: Flashcard;
  showBack: boolean;
};

export function FlashcardViewer({ card, showBack }: Props) {
  return (
    <View
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        gap: tokens.spacing.md,
      }}
    >
      <Text
        style={{
          color: tokens.colors.muted,
          fontSize: tokens.typography.size.sm,
        }}
      >
        {showBack ? "Answer" : "Question"}
      </Text>

      <Text
        style={{
          color: tokens.colors.text,
          fontSize: tokens.typography.size.lg,
        }}
      >
        {showBack ? card.backText : card.frontText}
      </Text>

      {showBack && card.backImageUri ? (
        <Image
          source={{ uri: card.backImageUri }}
          style={{ width: "100%", height: 180, borderRadius: tokens.radius.md }}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
}
