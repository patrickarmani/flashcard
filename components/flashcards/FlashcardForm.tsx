import { tokens } from "@/constants/designTokens";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  onSubmit: (payload: {
    question: string;
    answer: string;
    imageUri?: string | null;
  }) => void;
};

export function FlashcardForm({ onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && (!question.trim() || !answer.trim());

  function handleSubmit() {
    setSubmitted(true);

    if (!question.trim() || !answer.trim()) return;

    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
    });

    setQuestion("");
    setAnswer("");
    setSubmitted(false);
  }

  return (
    <View style={{ gap: tokens.spacing.md }}>
      {/* Question */}
      <View>
        <Text style={{ color: tokens.colors.muted, marginBottom: 6 }}>
          Question
        </Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type the question"
          placeholderTextColor={tokens.colors.muted}
          style={{
            color: tokens.colors.text,
            backgroundColor: tokens.colors.bg,
            borderRadius: tokens.radius.md,
            padding: tokens.spacing.md,
            borderWidth: 1,
            borderColor: hasError && !question ? "red" : tokens.colors.border,
          }}
        />
      </View>

      {/* Answer */}
      <View>
        <Text style={{ color: tokens.colors.muted, marginBottom: 6 }}>
          Answer
        </Text>
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type the answer"
          placeholderTextColor={tokens.colors.muted}
          multiline
          style={{
            color: tokens.colors.text,
            backgroundColor: tokens.colors.bg,
            borderRadius: tokens.radius.md,
            padding: tokens.spacing.md,
            minHeight: 100,
            borderWidth: 1,
            borderColor: hasError && !answer ? "red" : tokens.colors.border,
          }}
        />
      </View>

      {/* Save button */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: tokens.spacing.sm,
          backgroundColor: tokens.colors.primary,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: tokens.typography.size.md,
          }}
        >
          Save Flashcard
        </Text>
      </TouchableOpacity>
    </View>
  );
}
