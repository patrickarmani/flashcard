import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { FlashcardsProvider } from "@/state/flashcards-context";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <FlashcardsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* ✅ Welcome será a primeira tela */}
            <Stack.Screen name="index" />

            {/* ✅ suas tabs continuam existindo */}
            <Stack.Screen name="(tabs)" />

            {/* ✅ modal continua */}
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>

          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </FlashcardsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
