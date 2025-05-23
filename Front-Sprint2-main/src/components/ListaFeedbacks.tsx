import React, { useEffect, useState } from "react";
import { FlatList, Text, Box, Spinner, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedbackItem from './FeedbackItem';

interface Feedback {
  id: number;
  nota: number;
  comentario: string;
  data_feedback: string;
}

const ListaFeedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar feedbacks');
      }

      const data = await response.json();
      setFeedbacks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError("Erro ao buscar feedbacks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFeedbacks(prev => prev.filter(feedback => feedback.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar feedback:', error);
    }
  };

  if (loading) {
    return <Spinner color="blue.500" />;
  }

  if (error) {
    return (
      <Box padding={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <ScrollView>
      <FlatList
        data={feedbacks}
        renderItem={({ item }) => (
          <FeedbackItem
            id={item.id}
            nota={item.nota}
            comentario={item.comentario}
            data={item.data_feedback}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item?.id?.toString() || Math.random().toString()}
        ListEmptyComponent={() => (
          <Box p={4}>
            <Text textAlign="center">Nenhum feedback encontrado</Text>
          </Box>
        )}
      />
    </ScrollView>
  );
};

export default ListaFeedbacks;