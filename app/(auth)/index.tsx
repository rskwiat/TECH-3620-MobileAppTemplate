import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { Link } from 'expo-router';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
export default function LoginScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <Text
        variant="displaySmall"
        style={{
          ...styles.header,
          color: colorScheme ? Colors[colorScheme].text : '',
        }}
      >
        Welcome to Kean Social Media TBD.
      </Text>

      <Button mode='contained' onPress={() => console.log('error')}>
        Login User
      </Button>

      <Button mode="text" style={styles.registerButton}>
        <Link href="/(auth)/forgot-password">
          Forgot your password?
        </Link>
      </Button>

      <Button mode="text" style={styles.registerButton}>
        <Link href="/(auth)/register">
          Need an account? Register here.
        </Link>
      </Button>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  registerButton: {
    marginTop: 40,
    textAlign: 'center',
  }
});
