import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button, Text, TextInput, } from "react-native-paper";
import { Link } from 'expo-router';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();

  const onSubmit = () => {
  }

  return (
    <SafeAreaView>
      <Text
        variant="displaySmall"
        style={{
          ...styles.header,
          color: colorScheme ? Colors[colorScheme].text : '',
        }}
      >
        Welcome to Kean SM.
      </Text>

      <View style={styles.container}>
        <TextInput
          label="Email Adress"
          value={email}
          onChangeText={email => setEmail(email)}
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          style={styles.input}
        />

        <Button mode='contained' onPress={onSubmit}>
          Login User
        </Button>

        <Button mode="text" style={styles.registerButton}>
          <Link href="/(auth)/register">
            Need an account? Register here.
          </Link>
        </Button>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  input: {
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 40,
    textAlign: 'center',
  }
});
