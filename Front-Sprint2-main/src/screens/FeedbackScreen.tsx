import React, { useEffect, useState } from 'react';
import { Box, FlatList, Text, VStack, Spinner, Heading, Center } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Feedback {
  id: number;
  nota: number;
  comentario: string;
  data_feedback: string;
}

const FeedbackScreen: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('Token não encontrado');
        navigation.navigate('LoginScreen' as never);
        return;
      }

      const response = await fetch('http://localhost:3000/api/feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao buscar feedbacks: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      setFeedbacks(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Erro ao carregar feedbacks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const renderFeedbackItem = ({ item }: { item: Feedback }) => (
    <Box bg="white" p={4} mb={3} rounded="lg" shadow={2} borderColor="gray.200" borderWidth={1}>
      <VStack space={2}>
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          Nota: {item.nota}/5
        </Text>
        <Text fontSize="md" color="gray.700">
          {item.comentario}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Data: {new Date(item.data_feedback).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );

  if (loading) {
    return (
      <Center flex={1} bg="gray.50">
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} bg="gray.50" p={4}>
        <Text color="red.500" fontSize="md">
          {error}
        </Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <Heading p={4} textAlign="center" color="blue.600" size="lg">
        Feedbacks Recebidos
      </Heading>
      <Text fontSize="md" color="gray.600" textAlign="center" mb={4}>
        Total de feedbacks: {feedbacks.length}
      </Text>
      {feedbacks.length === 0 ? (
        <Center flex={1} p={4}>
          <Text fontSize="lg" color="gray.600">
            Nenhum feedback registrado ainda.
          </Text>
        </Center>
      ) : (
        <FlatList
          data={feedbacks}
          renderItem={renderFeedbackItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        />
      )}
    </Box>
  );
};

export default FeedbackScreen;