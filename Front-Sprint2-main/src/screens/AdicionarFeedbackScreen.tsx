import React, { useState } from 'react';
import { Box, VStack, Text, Button, Select, ScrollView, TextArea } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AdicionarFeedbackScreen: React.FC = () => {
  const [nota, setNota] = useState('5');
  const [comentario, setComentario] = useState('');
  const [data, setData] = useState(new Date());
  const navigation = useNavigation();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nota: parseInt(nota),
          comentario,
          data_feedback: data.toISOString(),
        }),
      });

      if (response.ok) {
        alert('Feedback registrado com sucesso!');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        alert(`Erro ao registrar feedback: ${errorData.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao registrar feedback');
    }
  };

  return (
    <ScrollView bg="white">
      <Box p={5}>
        <VStack space={4}>
          <Text fontSize="xl" fontWeight="bold">
            Registrar Feedback da Consulta
          </Text>

          <Text>Data da Consulta:</Text>
          <input
            type="date"
            value={formatDate(data)}
            onChange={(e) => setData(new Date(e.target.value))}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              backgroundColor: '#f9f9f9'
            }}
          />

          <Text>Nota do Atendimento:</Text>
          <Select
            selectedValue={nota}
            onValueChange={value => setNota(value)}
            accessibilityLabel="Escolha a nota"
            bg="gray.100"
            borderColor="gray.300"
          >
            <Select.Item label="5 - Excelente" value="5" />
            <Select.Item label="4 - Muito Bom" value="4" />
            <Select.Item label="3 - Bom" value="3" />
            <Select.Item label="2 - Regular" value="2" />
            <Select.Item label="1 - Ruim" value="1" />
          </Select>

          <Text>Comentário:</Text>
          <TextArea
            value={comentario}
            onChangeText={setComentario}
            placeholder="Descreva sua experiência com o atendimento"
            autoCompleteType={undefined}
            h={20}
            bg="gray.100"
            borderColor="gray.300"
          />

          <Button
            onPress={handleSubmit}
            bg="blue.600"
            _pressed={{ bg: '#2A1761' }}
            isDisabled={!comentario}
            mt={4}
          >
            Registrar Feedback
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default AdicionarFeedbackScreen; 