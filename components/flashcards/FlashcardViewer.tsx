import { tokens } from "@/constants/designTokens";
import { Flashcard } from "@/constants/types/flashcard";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  card: Flashcard;
  showBack: boolean;
};

export function FlashcardViewer({ card, showBack }: Props) {
  const progress = useSharedValue(showBack ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(showBack ? 1 : 0, { duration: 260 });
  }, [showBack, progress]);

  // Question card (located at the back)
  const questionStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.9]);
    const opacity = interpolate(progress.value, [0, 1], [1, 0.35]);
    const translateY = interpolate(progress.value, [0, 1], [0, 8]);
    return {
      transform: [{ scale }, { translateY }],
      opacity,
    };
  });

  // "Blur layer" over the background (so as not to interfere with reading the glass)
  const backdropBlurStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.2, 1], [0, 0.5, 1]);
    return { opacity };
  });

  // Response card (tilted glass)
  const answerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.25, 1], [0, 0.85, 1]);

    // more “floating” and separated from the one behind.
    const translateY = interpolate(progress.value, [0, 1], [11, 0]);
    const translateX = interpolate(progress.value, [0, 1], [6, 0]);

    // tilt type model
    const rotateZ = `${interpolate(progress.value, [0, 1], [0, -7])}deg`;

    return {
      opacity,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    };
  });

  return (
    <View style={{ height: 380 }}>
      {/* QUESTION card (on the back) */}
      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            backgroundColor: tokens.colors.surface,
            gap: tokens.spacing.md,
          },
          questionStyle,
        ]}
      >
        <Text
          style={{
            color: tokens.colors.muted,
            fontSize: tokens.typography.size.sm,
          }}
        >
          Question
        </Text>
        <Text
          style={{
            color: tokens.colors.text,
            fontSize: tokens.typography.size.lg,
          }}
        >
          {card.frontText}
        </Text>
      </Animated.View>

      {/* Blur in the BACKGROUND when showBack=true (attempt to create a frosted glass effect) */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            inset: 0,
            borderRadius: tokens.radius.lg,
            overflow: "hidden",
          },
          backdropBlurStyle,
        ]}
      >
        {/* This blur option blurs the text on the card below */}
        <BlurView intensity={90} tint="dark" style={{ flex: 1 }} />

        {/* Overlay (ink) over the blur to "kill" the letters */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(10,10,20,0.35)",
          }}
        />
      </Animated.View>

      {/* Response Card (glass imitation) */}
      <Animated.View
        pointerEvents={showBack ? "auto" : "none"}
        style={[
          {
            position: "absolute",
            inset: 0,
            borderRadius: tokens.radius.lg,
            overflow: "hidden",

            // cyan border (thin and elegant)
            borderWidth: 2.5,
            borderColor: "rgba(64, 224, 208, 0.70)", // turquoise/cyan

            // soft "glow" shine
            shadowColor: "rgba(64, 224, 208, 1)",
            shadowOpacity: 0.22,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
          },
          answerStyle,
        ]}
      >
        {/* Glass base: blur + light paint */}
        <BlurView intensity={18} tint="dark" style={{ flex: 1 }}>
          {/* Frosted glass ink */}
          <View
            style={{
              flex: 1,
              padding: tokens.spacing.lg,
              gap: tokens.spacing.md,

              // Leave the glass frosted.
              backgroundColor: "rgba(40, 170, 180, 0.16)", // very light blue/cyan
            }}
          >
            {/* Soft reflections*/}
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.10)",
                "rgba(255,255,255,0.04)",
                "rgba(255,255,255,0.00)",
              ]}
              start={{ x: 0.05, y: 0.1 }}
              end={{ x: 0.95, y: 1.0 }}
              style={{
                position: "absolute",
                inset: 0,
              }}
            />

            {/* Another very subtle "blade" reflection */}
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.00)",
                "rgba(255,255,255,0.06)",
                "rgba(255,255,255,0.00)",
              ]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "52%",
                right: "-12%",
                transform: [{ rotateZ: "-18deg" }],
              }}
            />

            <Text
              style={{
                color: "rgba(255,255,255,0.70)",
                fontSize: tokens.typography.size.sm,
              }}
            >
              Answer
            </Text>

            <Text
              style={{
                color: tokens.colors.text,
                fontSize: tokens.typography.size.lg,
              }}
            >
              {card.backText?.trim() ? card.backText : "No answer yet"}
            </Text>

            {card.backImageUri ? (
              <Image
                source={{ uri: card.backImageUri }}
                style={{
                  width: "100%",
                  height: 160,
                  borderRadius: tokens.radius.md,
                }}
                resizeMode="cover"
              />
            ) : null}
          </View>
        </BlurView>
      </Animated.View>
    </View>
  );
}
