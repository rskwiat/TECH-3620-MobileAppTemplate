import { View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "react-native-paper";
export default function LoginScreen() {
  return (
    <View>
      <ThemedText>Regsiter for an account</ThemedText>
      <Button mode='contained'>
        Sign Up
      </Button>
    </View>
  );
};
