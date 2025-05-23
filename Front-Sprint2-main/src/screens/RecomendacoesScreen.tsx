import React from 'react';
import { Box, Button, Text, ScrollView } from 'native-base';
import { Linking } from 'react-native';

const RecomendacoesScreen: React.FC = () => {

  const openStreamlitPage = () => {
    Linking.openURL('https://willyamdev-sprintia-main-2uloda.streamlit.app')
      .catch((err) => console.error('Erro ao tentar abrir a página', err));
  };

  return (
    <Box flex={1} bg="#F5F5F5" safeArea>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Box bg="white" p={5} borderRadius="lg" shadow={2} alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="blue.700">
            Recomendações Odontológicas
          </Text>
          <Text mt={4} fontSize="md" color="gray.700">
            Para acessar as recomendações odontológicas, clique no botão abaixo:
          </Text>
          <Button mt={6} onPress={openStreamlitPage}>
            <Text color="white">Ir para a Página Streamlit</Text>
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default RecomendacoesScreen;
