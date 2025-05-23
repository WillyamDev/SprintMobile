import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SintomasScreen from '../screens/SintomasScreen';
import ListaSintomasScreen from '../screens/ListaSintomasScreen';
import AdicionarFeedbackScreen from '../screens/AdicionarFeedbackScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecomendacoesScreen from '../screens/RecomendacoesScreen'; // Tela de recomendações odontológicas
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          title: 'Menu Principal',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{ title: 'Histórico de Feedbacks' }}
      />
      <Stack.Screen
        name="SintomasScreen"
        component={SintomasScreen}
        options={{ title: 'Registro de Sintomas' }}
      />
      <Stack.Screen
        name="ListaSintomasScreen"
        component={ListaSintomasScreen}
        options={{ title: 'Histórico de Sintomas' }}
      />
      <Stack.Screen
        name="AdicionarFeedbackScreen"
        component={AdicionarFeedbackScreen}
        options={{ title: 'Novo Feedback' }}
      />
      <Stack.Screen
        name="RecomendacoesScreen"
        component={RecomendacoesScreen}
        options={{ title: 'Recomendações Odontológicas' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
