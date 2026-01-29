import { tokens } from "@/constants/designTokens";
import { Flashcard } from "@/constants/types/flashcard";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  cards: Flashcard[];
};

export function FlashcardList({ cards }: Props) {
  return (
    <View style={{ padding: tokens.spacing.md }}>
      <Text style={{ color: tokens.colors.muted }}>
        Total cards: {cards.length}
      </Text>
    </View>
  );
}
