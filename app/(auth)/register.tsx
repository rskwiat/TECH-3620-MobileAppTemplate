import { useState } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useAuth } from '@/context/auth';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function RegisterUser() {
  const colorScheme = useColorScheme();
  const { createAccount } = useAuth();

  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {

    const data = {
      "username": userName,
      "name": name,
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
    };

    const auth = await createAccount(data);
    console.log(auth);
  }


  return (
    <SafeAreaView>
      <Text
        style={{
          color: colorScheme ? Colors[colorScheme].text : '',
        }}
      >
        Register for an Account
      </Text>

      <TextInput
        label="name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <TextInput
        label="UserName"
        value={userName}
        onChangeText={text => setUserName(text)}
      />

      <Button mode='contained' onPress={onSubmit}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};
