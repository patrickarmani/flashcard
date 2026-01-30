import { tokens } from "@/constants/designTokens";
import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type FlashcardFormPayload = {
  question: string;
  answer: string;
  imageUri?: string | null;
};

type Props = {
  onSubmit: (payload: FlashcardFormPayload) => void;
};

export function FlashcardForm({ onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const canSave = useMemo(() => {
    return question.trim().length >= 3 && answer.trim().length >= 3;
  }, [question, answer]);

  function handlePickImagePlaceholder() {
    // Placeholder (sem galeria ainda)
    setImageUri("placeholder://image");
  }

  function handleRemoveImage() {
    setImageUri(null);
  }

  function handleSubmit() {
    if (!canSave) return;
    onSubmit({ question: question.trim(), answer: answer.trim(), imageUri });
    setQuestion("");
    setAnswer("");
    setImageUri(null);
  }

  return (
    <View style={{ gap: tokens.spacing.md }}>
      <Field label="Question">
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type the question..."
          placeholderTextColor={tokens.colors.muted}
          style={inputStyle}
          multiline
        />
      </Field>

      <Field label="Answer">
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type the answer..."
          placeholderTextColor={tokens.colors.muted}
          style={[inputStyle, { minHeight: 110 }]}
          multiline
        />
      </Field>

      <Field label="Optional Image">
        <View style={{ gap: tokens.spacing.sm }}>
          <View style={imageBoxStyle}>
            <Text
              style={{
                color: tokens.colors.muted,
                fontFamily: tokens.typography.family.base,
              }}
            >
              {imageUri ? "Image selected (placeholder)" : "No image selected"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: tokens.spacing.sm }}>
            <Pressable
              onPress={handlePickImagePlaceholder}
              style={secondaryBtnStyle}
            >
              <Text style={secondaryBtnText}>Choose Image</Text>
            </Pressable>

            <Pressable onPress={handleRemoveImage} style={secondaryBtnStyle}>
              <Text style={secondaryBtnText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </Field>

      <Pressable
        onPress={handleSubmit}
        disabled={!canSave}
        style={[primaryBtnStyle, { opacity: canSave ? 1 : 0.45 }]}
      >
        <Text style={primaryBtnText}>Save Flashcard</Text>
      </Pressable>
    </View>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: tokens.colors.muted,
          fontSize: tokens.typography.size.sm,
          fontFamily: tokens.typography.family.base,
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.03)",
  borderWidth: 1,
  borderColor: tokens.colors.border,
  borderRadius: tokens.radius.md,
  padding: tokens.spacing.md,
  color: tokens.colors.text,
  fontFamily: tokens.typography.family.base,
  fontSize: tokens.typography.size.md,
  minHeight: 60,
} as const;

const imageBoxStyle = {
  height: 92,
  borderRadius: tokens.radius.md,
  borderWidth: 1,
  borderColor: tokens.colors.border,
  backgroundColor: "rgba(255,255,255,0.03)",
  alignItems: "center",
  justifyContent: "center",
} as const;

const primaryBtnStyle = {
  marginTop: tokens.spacing.sm,
  backgroundColor: tokens.colors.primary,
  paddingVertical: 14,
  borderRadius: tokens.radius.md,
  alignItems: "center",
} as const;

const primaryBtnText = {
  color: tokens.colors.text,
  fontFamily: tokens.typography.family.base,
  fontSize: tokens.typography.size.md,
} as const;

const secondaryBtnStyle = {
  flex: 1,
  borderWidth: 1,
  borderColor: tokens.colors.border,
  borderRadius: tokens.radius.md,
  paddingVertical: 12,
  alignItems: "center",
} as const;

const secondaryBtnText = {
  color: tokens.colors.text,
  fontFamily: tokens.typography.family.base,
  fontSize: tokens.typography.size.sm,
} as const;
