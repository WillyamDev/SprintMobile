import React from 'react';
import { Box, VStack, Button, Text, Center, Divider, Icon, HStack, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Box flex={1} bg="#F5F5F5" safeArea>
      <HStack justifyContent="space-between" alignItems="center" px={4} py={4} bg="white" shadow={1}>
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          Sistema Odontológico
        </Text>
        <Button
          onPress={handleLogout}
          variant="ghost"
          _text={{ color: 'blue.600', fontWeight: 'bold' }}
          _pressed={{ bg: 'blue.100' }}
          leftIcon={<Icon as={MaterialIcons} name="logout" size="sm" color="blue.600" />}
          rounded="full"
        >
          Sair
        </Button>
      </HStack>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Center>
          <VStack space={5} alignItems="center" width="100%">
            <Box bg="white" width="100%" borderRadius="lg" shadow={2} p={4}>
              <HStack alignItems="center" space={3}>
                <Icon as={MaterialIcons} name="feedback" size="lg" color="blue.500" />
                <Text fontSize="lg" fontWeight="bold" color="blue.700">
                  Feedbacks
                </Text>
              </HStack>
              <Divider my={3} bg="gray.200" />
              <Button
                bg="blue.500"
                _text={{ color: 'white', fontWeight: 'bold' }}
                _pressed={{ bg: 'blue.600' }}
                rounded="full"
                onPress={() => navigation.navigate('AdicionarFeedbackScreen')}
                mt={2}
              >
                Registrar Novo Feedback
              </Button>
              <Button
                bg="blue.500"
                _text={{ color: 'white', fontWeight: 'bold' }}
                _pressed={{ bg: 'blue.600' }}
                rounded="full"
                onPress={() => navigation.navigate('FeedbackScreen')}
                mt={3}
              >
                Ver Histórico de Feedbacks
              </Button>
            </Box>

            <Box bg="white" width="100%" borderRadius="lg" shadow={2} p={4}>
              <HStack alignItems="center" space={3}>
                <Icon as={MaterialIcons} name="healing" size="lg" color="blue.500" />
                <Text fontSize="lg" fontWeight="bold" color="blue.700">
                  Sintomas
                </Text>
              </HStack>
              <Divider my={3} bg="gray.200" />
              <Button
                bg="blue.500"
                _text={{ color: 'white', fontWeight: 'bold' }}
                _pressed={{ bg: 'blue.600' }}
                rounded="full"
                onPress={() => navigation.navigate('SintomasScreen')}
                mt={2}
              >
                Registrar Sintomas
              </Button>
              <Button
                bg="blue.500"
                _text={{ color: 'white', fontWeight: 'bold' }}
                _pressed={{ bg: 'blue.600' }}
                rounded="full"
                onPress={() => navigation.navigate('ListaSintomasScreen')}
                mt={3}
              >
                Ver Histórico de Sintomas
              </Button>
            </Box>

            <Box bg="white" width="100%" borderRadius="lg" shadow={2} p={4}>
              <HStack alignItems="center" space={3}>
                <Icon as={MaterialIcons} name="medical-services" size="lg" color="blue.500" />
                <Text fontSize="lg" fontWeight="bold" color="blue.700">
                  Recomendações Odontológicas
                </Text>
              </HStack>
              <Divider my={3} bg="gray.200" />
              <Button
                bg="blue.500"
                _text={{ color: 'white', fontWeight: 'bold' }}
                _pressed={{ bg: 'blue.600' }}
                rounded="full"
                onPress={() => navigation.navigate('RecomendacoesScreen')}
                mt={2}
              >
                Ver Recomendações
              </Button>
            </Box>
          </VStack>
        </Center>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;