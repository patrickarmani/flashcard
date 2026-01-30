import { tokens } from "@/constants/designTokens";
import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type FlashcardPayload = {
  question: string;
  answer: string;
  imageUri?: string | null;
};

type Props = {
  onSubmit: (payload: FlashcardPayload) => void;
};

export function FlashcardForm({ onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const canSave = useMemo(() => {
    return question.trim().length > 0 && answer.trim().length > 0;
  }, [question, answer]);

  function handleSave() {
    if (!canSave) return;

    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
      imageUri: null,
    });

    // limpa o form após salvar (mock)
    setQuestion("");
    setAnswer("");
  }

  return (
    <View style={{ gap: tokens.spacing.md }}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: tokens.colors.muted,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.sm,
          }}
        >
          Question
        </Text>

        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type the question..."
          placeholderTextColor={tokens.colors.muted}
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: tokens.colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            color: tokens.colors.text,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.md,
          }}
        />
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: tokens.colors.muted,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.sm,
          }}
        >
          Answer
        </Text>

        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type the answer..."
          placeholderTextColor={tokens.colors.muted}
          multiline
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: tokens.colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            minHeight: 120,
            textAlignVertical: "top",
            color: tokens.colors.text,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.md,
          }}
        />
      </View>

      {/* Placeholder (sem função por enquanto) */}
      <Pressable
        onPress={() => {}}
        style={{
          borderColor: tokens.colors.border,
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        }}
      >
        <Text
          style={{
            color: tokens.colors.muted,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.md,
            textAlign: "center",
          }}
        >
          + Add image (later)
        </Text>
      </Pressable>

      <Pressable
        onPress={handleSave}
        disabled={!canSave}
        style={({ pressed }) => ({
          backgroundColor: canSave
            ? tokens.colors.primary
            : "rgba(139, 92, 246, 0.35)",
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.md,
            textAlign: "center",
          }}
        >
          Save Flashcard
        </Text>
      </Pressable>

      {!canSave ? (
        <Text
          style={{
            color: tokens.colors.muted,
            fontFamily: tokens.typography.family.base,
            fontSize: tokens.typography.size.sm,
            textAlign: "center",
          }}
        >
          Fill in both fields to enable saving.
        </Text>
      ) : null}
    </View>
  );
}
