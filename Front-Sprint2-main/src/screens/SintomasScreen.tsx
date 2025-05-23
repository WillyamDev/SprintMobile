import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Input, Button, Select, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sintoma {
  id: number;
  descricao: string;
  intensidade: number;
}

const SintomasScreen = () => {
  const [descricao, setDescricao] = useState('');
  const [intensidade, setIntensidade] = useState('1');
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  const carregarSintomas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/sintomas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const dados = await response.json();
      setSintomas(dados);
    } catch (error) {
      console.error('Erro ao carregar sintomas:', error);
    }
  };

  const handleRegistrarOuEditarSintoma = async () => {
    const metodo = editando ? 'PUT' : 'POST';
    const url = editando 
      ? `http://localhost:3000/api/sintomas/${editando}`
      : 'http://localhost:3000/api/sintomas';

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricao,
          intensidade: parseInt(intensidade),
        }),
      });

      if (response.ok) {
        setDescricao('');
        setIntensidade('1');
        setEditando(null);
        alert(`Sintoma ${editando ? 'atualizado' : 'registrado'} com sucesso!`);
        carregarSintomas();
      } else {
        alert('Erro ao processar sintoma');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar sintoma');
    }
  };

  const handleExcluirSintoma = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/sintomas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Sintoma excluído com sucesso!');
        carregarSintomas();
      } else {
        alert('Erro ao excluir sintoma');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir sintoma');
    }
  };

  useEffect(() => {
    carregarSintomas();
  }, []);

  return (
    <ScrollView bg="white">
      <Box p={5}>
        <VStack space={4}>
          <Text fontSize="xl" fontWeight="bold">
            {editando ? 'Editar Sintoma' : 'Registrar Sintomas'}
          </Text>

          <Input
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva seus sintomas"
            multiline
            numberOfLines={4}
          />

          <Select
            selectedValue={intensidade}
            onValueChange={value => setIntensidade(value)}
          >
            <Select.Item label="1 - Muito Leve" value="1" />
            <Select.Item label="2 - Leve" value="2" />
            <Select.Item label="3 - Moderado" value="3" />
            <Select.Item label="4 - Forte" value="4" />
            <Select.Item label="5 - Muito Forte" value="5" />
          </Select>

          <Button
            onPress={handleRegistrarOuEditarSintoma}
            colorScheme="blue"
            isDisabled={!descricao}
          >
            {editando ? 'Atualizar Sintoma' : 'Registrar Sintoma'}
          </Button>

          <VStack mt={5} space={3}>
            {sintomas.map(sintoma => (
              <Box key={sintoma.id} p={3} borderWidth={1} borderRadius="md">
                <Text>{sintoma.descricao}</Text>
                <Text>Intensidade: {sintoma.intensidade}</Text>
                <Button size="sm" onPress={() => {
                  setDescricao(sintoma.descricao);
                  setIntensidade(sintoma.intensidade.toString());
                  setEditando(sintoma.id);
                }}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" onPress={() => handleExcluirSintoma(sintoma.id)}>
                  Excluir
                </Button>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default SintomasScreen;