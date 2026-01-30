import { tokens } from "@/constants/designTokens";
import { Flashcard } from "@/constants/types/flashcard";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type Props = {
  data: Flashcard[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function FlashcardList({ data, selectedId, onSelect }: Props) {
  return (
    <View>
      <Text
        style={{ color: tokens.colors.muted, marginBottom: tokens.spacing.sm }}
      >
        Your flashcards
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm }}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;

          return (
            <Pressable
              hitSlop={10}
              onPress={() => onSelect(item.id)}
              style={{
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderWidth: 1,
                borderColor: isSelected
                  ? tokens.colors.primary
                  : tokens.colors.border,
                opacity: isSelected ? 1 : 0.85,
                minWidth: 140,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: tokens.colors.text,
                  fontSize: tokens.typography.size.md,
                  fontFamily: tokens.typography.family.base,
                }}
              >
                {item.frontText}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  color: isSelected ? tokens.colors.text : tokens.colors.muted,
                  fontSize: tokens.typography.size.sm,
                  marginTop: 2,
                }}
              >
                {isSelected ? "Selected" : "Tap to select"}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
