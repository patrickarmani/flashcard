import { tokens } from "@/constants/designTokens";
import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const questionError = submitted && question.trim().length === 0;
  const answerError = submitted && answer.trim().length === 0;

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled) return;

    setImageUri(result.assets[0]?.uri ?? null);
  }

  function clearImage() {
    setImageUri(null);
  }

  function handleSave() {
    setSubmitted(true);

    if (question.trim().length === 0 || answer.trim().length === 0) {
      return;
    }

    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
      imageUri,
    });

    // Clean after saving
    setQuestion("");
    setAnswer("");
    setImageUri(null);
    setSubmitted(false);
  }

  const inputBase = useMemo(
    () => ({
      backgroundColor: tokens.colors.surface,
      color: tokens.colors.text,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      borderRadius: tokens.radius.md,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      fontSize: tokens.typography.size.md,
      fontFamily: tokens.typography.family.base,
    }),
    [],
  );

  return (
    <View style={{ gap: tokens.spacing.md }}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text style={{ color: tokens.colors.muted }}>Question</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type the question"
          placeholderTextColor={tokens.colors.muted}
          style={{
            ...inputBase,
            borderColor: questionError ? "#ef4444" : tokens.colors.border,
          }}
        />
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        <Text style={{ color: tokens.colors.muted }}>Answer</Text>
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type the answer"
          placeholderTextColor={tokens.colors.muted}
          style={{
            ...inputBase,
            borderColor: answerError ? "#ef4444" : tokens.colors.border,
          }}
          multiline
        />
      </View>

      {/* Image section */}
      <View style={{ gap: tokens.spacing.sm }}>
        <Text style={{ color: tokens.colors.muted }}>Optional image</Text>

        {!imageUri ? (
          <Pressable
            onPress={pickImage}
            style={{
              borderWidth: 1,
              borderColor: tokens.colors.border,
              borderRadius: tokens.radius.md,
              padding: tokens.spacing.md,
              alignItems: "center",
            }}
          >
            <Text style={{ color: tokens.colors.text }}>Pick image</Text>
          </Pressable>
        ) : (
          <View style={{ gap: tokens.spacing.sm }}>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: tokens.radius.md,
              }}
              resizeMode="cover"
            />

            <Pressable
              onPress={clearImage}
              style={{
                borderWidth: 1,
                borderColor: tokens.colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
                alignItems: "center",
              }}
            >
              <Text style={{ color: tokens.colors.text }}>Remove image</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable
        onPress={handleSave}
        style={{
          backgroundColor: tokens.colors.primary,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0D0B1F", fontSize: tokens.typography.size.md }}>
          Save Flashcard
        </Text>
      </Pressable>
    </View>
  );
}
