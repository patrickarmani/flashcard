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
    <View style={{ gap: tokens.spacing.sm }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: tokens.colors.muted }}>Your flashcards</Text>
        <Text style={{ color: tokens.colors.muted }}>{data.length}</Text>
      </View>

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
              onPress={() => onSelect(item.id)}
              style={{
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderWidth: 1,
                borderColor: isSelected
                  ? "rgba(139,92,246,0.65)"
                  : tokens.colors.border,

                // soft elevation
                shadowColor: "#000",
                shadowOpacity: isSelected ? 0.35 : 0.2,
                shadowRadius: isSelected ? 10 : 6,
                shadowOffset: { width: 0, height: 6 },
                elevation: isSelected ? 8 : 4,

                minWidth: 170,
                opacity: isSelected ? 1 : 0.88,
              }}
            >
              {/* little accent dot */}
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : "rgba(255,255,255,0.18)",
                  marginBottom: 8,
                }}
              />

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
                  marginTop: 4,
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
