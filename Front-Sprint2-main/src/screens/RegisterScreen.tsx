import React, { useState } from 'react';
import { Box, VStack, Text, Input, Button, ScrollView, useToast, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const toast = useToast();

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        toast.show({
          description: "Preencha todos os campos",
          placement: "top",
          bgColor: "red.500"
        });
        return;
      }

      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: 'paciente'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.show({
          description: "Cadastro realizado com sucesso!",
          placement: "top",
          bgColor: "green.500"
        });
        navigation.navigate('LoginScreen' as never);
      } else {
        throw new Error(data.error || 'Erro ao cadastrar');
      }
    } catch (err) {
      toast.show({
        description: err instanceof Error ? err.message : 'Erro ao cadastrar',
        placement: "top",
        bgColor: "red.500"
      });
    }
  };

  return (
    <ScrollView bg="white">
      <Box p={6}>
        <VStack space={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.600">
            Cadastro de Novo Usuário
          </Text>

          <Input
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
            size="lg"
            borderColor="blue.300"
            _focus={{
              borderColor: "blue.500",
              backgroundColor: "white"
            }}
            px={4}
            py={3}
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChangeText={setPassword}
            size="lg"
            borderColor="blue.300"
            _focus={{
              borderColor: "blue.500",
              backgroundColor: "white"
            }}
            px={4}
            py={3}
          />

          <Button
            onPress={handleRegister}
            bg="blue.600"
            _pressed={{ bg: 'blue.700' }}
            size="lg"
            mt={6}
            borderRadius="full"
          >
            Cadastrar
          </Button>

          <HStack justifyContent="center" alignItems="center" space={2} mt={4}>
            <Text color="blue.600">Já tem uma conta?</Text>
            <Button
              variant="ghost"
              onPress={() => navigation.navigate('LoginScreen' as never)}
              _text={{ color: "blue.600", fontWeight: "bold" }}
            >
              Faça login
            </Button>
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default RegisterScreen;