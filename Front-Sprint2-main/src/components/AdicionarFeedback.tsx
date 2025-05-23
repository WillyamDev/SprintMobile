import React, { useState } from "react";
import { View, Input, IconButton, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/ContextoEstadoGlobal";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigido o import do AsyncStorage

interface AdicionarFeedbackProps {
  onAdicionarFeedback: (feedback: string) => void; // Função de callback para atualizar a lista de feedbacks
}

const AdicionarFeedback: React.FC<AdicionarFeedbackProps> = ({ onAdicionarFeedback }) => {
  const [comentario, setComentario] = useState<string>(""); // Comentário do feedback
  const [nota, setNota] = useState<number>(0); // Nota do feedback
  const { adicionarFeedback } = useEstadoGlobal(); // Função global para adicionar feedback

  const handleAdicionarFeedback = async () => {
    if (comentario.trim() === "") return; // Verifica se o comentário está vazio

    try {
      const token = await AsyncStorage.getItem('token'); // Recupera o token de autenticação
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nota, comentario }), // Envia os dados do feedback
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar feedback');
      }

      // Se tudo deu certo, adicionar o feedback no estado global
      adicionarFeedback("usuario_exemplo", comentario); // Ajuste conforme o necessário no seu contexto

      setComentario(""); // Limpa o comentário
      setNota(0); // Limpa a nota

      onAdicionarFeedback(comentario); // Chama a função passada por prop para atualizar a lista de feedbacks
    } catch (error) {
      console.error('Erro ao adicionar feedback:', error);
    }
  };

  return (
    <View 
      style={{ 
        backgroundColor: '#402291', 
        paddingVertical: 20, 
        paddingHorizontal: 20, 
        paddingTop: 50 
      }}
    >
      <Text 
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Adicionar Feedback
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input
            placeholder="Digite a nota"
            placeholderTextColor="white"
            value={nota.toString()}
            onChangeText={(text) => setNota(Number(text))}
            keyboardType="numeric"
            fontSize={18}
            color="white"
            style={{ borderColor: 'white', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input
            placeholder="Digite o comentário"
            placeholderTextColor="white"
            value={comentario}
            onChangeText={setComentario}
            fontSize={18}
            color="white"
            style={{ borderColor: 'white', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}
          />
        </View>
        <IconButton
          icon={<Ionicons name="add" size={24} color="#402291" />}
          colorScheme="light"
          onPress={handleAdicionarFeedback}
          style={{ borderRadius: 50, backgroundColor: 'gold' }}
        />
      </View>
    </View>
  );
};

export default AdicionarFeedback;

