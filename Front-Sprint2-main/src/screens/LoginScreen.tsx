import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, VStack, Center, Box } from 'native-base';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      setError(null);
      navigation.navigate('HomeScreen');
    } catch (error) {
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/login.png')}
      style={styles.background}
    >
      <Center flex={1} px={4}>
        <Box style={styles.container} shadow={6}>
          <Text style={styles.title}>Bem-vindo</Text>
          <VStack space={4} width="90%">
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="#555"
            />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#555"
            />
            <Button
              onPress={handleLogin}
              style={styles.loginButton}
              _text={{ fontWeight: 'bold' }}
              _pressed={{ opacity: 0.8 }}
            >
              Entrar
            </Button>
            <Button
              onPress={() => navigation.navigate('RegisterScreen')}
              variant="unstyled"
              _text={{ color: '#1E3A8A', fontWeight: 'bold' }}
            >
              Criar nova conta
            </Button>
          </VStack>
          {error && <Text style={styles.error}>{error}</Text>}
        </Box>
      </Center>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#1E3A8A',
    borderRadius: 30,
    justifyContent: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;