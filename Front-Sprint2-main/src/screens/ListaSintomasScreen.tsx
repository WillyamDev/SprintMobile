import React, { useEffect, useState } from 'react';
import { Box, FlatList, Text, VStack, Spinner, HStack, Badge, Center, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Sintoma {
  id: number;
  descricao: string;
  intensidade: number;
  data_registro: string;
  status: string;
}

const ListaSintomasScreen: React.FC = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchSintomas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/sintomas', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSintomas(data);
      }
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSintomas();
  }, []);

  const getIntensidadeColor = (intensidade: number) => {
    if (intensidade >= 4) return 'red.500'; 
    if (intensidade >= 3) return 'yellow.500';
    return 'green.500';
  };

  const getIntensidadeText = (intensidade: number) => {
    switch (intensidade) {
      case 5: return 'Muito Forte';
      case 4: return 'Forte';
      case 3: return 'Moderado';
      case 2: return 'Leve';
      case 1: return 'Muito Leve';
      default: return 'Não Especificado';
    }
  };

  const renderSintomaItem = ({ item }: { item: Sintoma }) => (
    <Box bg="white" p={4} m={3} rounded="lg" shadow={2} borderColor="gray.200" borderWidth={1}>
      <VStack space={3}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" flex={1} color="gray.800">
            {item.descricao}
          </Text>
          <Center
            bg={getIntensidadeColor(item.intensidade)}
            p={3}
            rounded="full"
            minW="120px"
          >
            <Text color="white" fontWeight="bold" textTransform="uppercase">
              {getIntensidadeText(item.intensidade)}
            </Text>
          </Center>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.500">
            {new Date(item.data_registro).toLocaleDateString()}
          </Text>
          <Badge 
            colorScheme={item.status === 'resolvido' ? 'success' : 'warning'}
            rounded="full"
            variant="subtle"
            px={3}
            py={1}
          >
            {item.status}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <Box p={4}>
        <Text color="blue.600" fontSize="2xl" textAlign="center" fontWeight="bold">
          Histórico de Sintomas
        </Text>
      </Box>

      {sintomas.length === 0 ? (
        <Center flex={1}>
          <Text color="gray.600" fontSize="lg">
            Nenhum sintoma registrado ainda.
          </Text>
        </Center>
      ) : (
        <FlatList
          data={sintomas}
          renderItem={renderSintomaItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        />
      )}
    </Box>
  );
};

export default ListaSintomasScreen;