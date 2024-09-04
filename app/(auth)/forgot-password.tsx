import { View, Text, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "react-native-paper";

export default function ForgotPassword() {

  const onSubmit = async () => {
  }

  return (
    <SafeAreaView>
      <ThemedText>Regsiter for an account</ThemedText>
      <ThemedText>Email Address</ThemedText>
      <Button mode='contained' onPress={onSubmit}>
        Reset Password
      </Button>
    </SafeAreaView>
  );
};
