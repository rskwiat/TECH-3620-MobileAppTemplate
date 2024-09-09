import { SafeAreaView, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedText } from '@/components/ThemedText';
import { Button, TextInput, Text } from "react-native-paper";
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors, ButtonTheme } from "@/constants/Colors";
import { RegisterUserSchema, RegisterUserSchemaType } from '@/schemas/registerUserSchema';

export default function RegisterUser() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const { createAccount } = useAuth();
  const {
    control,
    handleSubmit,
    formState: {
      errors, isValid
    }
  } = useForm<RegisterUserSchemaType>({
    'resolver': zodResolver(RegisterUserSchema),
    'mode': 'onBlur'
  });

  const onSubmit = async (data: any) => {
    const passwordUpdate = {
      ...data,
      passwordConfirm: data.password
    };

    try {
      await createAccount(passwordUpdate);
      router.replace('/(tabs)');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: colorScheme ? Colors[colorScheme].text : '',
        }}
      >
        Register for an Account
      </Text>

      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="Real Name"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <ThemedText>{errors.name && errors?.name?.message as string}</ThemedText>
      </View>

      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name='username'
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="UserName"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <ThemedText>{errors.name && errors?.name?.message as string}</ThemedText>
      </View>

      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="Email"
              keyboardType='email-address'
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <ThemedText>{errors.email && errors?.email?.message as string}</ThemedText>
      </View>

      <View style={styles.inputWrapper}>

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="Password"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
          )}
        />
        <ThemedText>{errors.password && errors?.password?.message as string}</ThemedText>
      </View>

      <Button
        mode='contained'
        disabled={!isValid}
        theme={ButtonTheme}
        onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  }
});
