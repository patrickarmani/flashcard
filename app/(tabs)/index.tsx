import { FlashcardList } from "@/components/flashcards/FlashcardList";
import { FlashcardViewer } from "@/components/flashcards/FlashcardViewer";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { tokens } from "@/constants/designTokens";
import { useFlashcards } from "@/state/flashcards-context";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { flashcards } = useFlashcards();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showBack, setShowBack] = useState(false);

  const selectedCard = useMemo(() => {
    if (flashcards.length === 0) return null;
    return flashcards.find((c) => c.id === selectedId) ?? flashcards[0];
  }, [flashcards, selectedId]);

  const currentIndex = useMemo(() => {
    if (!selectedCard) return 0;
    const idx = flashcards.findIndex((c) => c.id === selectedCard.id);
    return idx >= 0 ? idx : 0;
  }, [flashcards, selectedCard]);

  const progress = flashcards.length
    ? (currentIndex + 1) / flashcards.length
    : 0;

  if (!selectedCard) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.bg,
          justifyContent: "center",
          alignItems: "center",
          padding: tokens.spacing.lg,
        }}
      >
        <Text style={{ color: tokens.colors.muted }}>
          No flashcards yet. Add your first one!
        </Text>
      </View>
    );
  }

  const hasAnswer = !!selectedCard.backText?.trim();

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.bg }}>
      {/* HEADER */}
      <View
        style={{
          paddingTop: tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing.md,
          gap: tokens.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() =>
              Alert.alert("Close", "You can navigate later if you want.")
            }
            hitSlop={12}
            style={{ padding: 6 }}
          >
            <IconSymbol size={20} name="xmark" color={tokens.colors.muted} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Info", "Study mode UI")}
            hitSlop={12}
            style={{ padding: 6 }}
          >
            <IconSymbol
              size={18}
              name="info.circle"
              color={tokens.colors.muted}
            />
          </Pressable>
        </View>

        <Text
          style={{
            color: tokens.colors.text,
            fontSize: 18,
            fontFamily: tokens.typography.family.base,
          }}
        >
          Flashcard • Study
        </Text>

        {/* Progress bar */}
        <View style={{ gap: 6 }}>
          <View
            style={{
              height: 6,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.10)",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: tokens.colors.primary,
                borderRadius: 999,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: tokens.colors.muted, fontSize: 12 }}>
              {currentIndex + 1} card
            </Text>
            <Text style={{ color: tokens.colors.muted, fontSize: 12 }}>
              {flashcards.length} total
            </Text>
          </View>
        </View>
      </View>

      {/* BODY */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <FlashcardViewer card={selectedCard} showBack={showBack} />

        <FlashcardList
          data={flashcards}
          selectedId={selectedCard.id}
          onSelect={(id) => {
            setSelectedId(id);
            setShowBack(false);
          }}
        />

        <Pressable
          disabled={!hasAnswer}
          onPress={() => setShowBack((v) => !v)}
          style={{
            backgroundColor: tokens.colors.primary,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            alignItems: "center",
            opacity: hasAnswer ? 1 : 0.45,
            marginBottom: tokens.spacing.lg,
          }}
        >
          <Text
            style={{ color: "#0D0B1F", fontSize: tokens.typography.size.md }}
          >
            {!hasAnswer
              ? "No answer yet"
              : showBack
                ? "Show Question"
                : "Show Answer"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
