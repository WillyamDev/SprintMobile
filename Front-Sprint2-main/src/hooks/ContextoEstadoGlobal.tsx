import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Feedback {
  id: number;
  usuario: string;
  comentario: string;
  data: string;
}

interface ContextoEstadoGlobal {
  feedbacks: Feedback[];
  carregarFeedbacks: () => void;
  adicionarFeedback: (usuario: string, comentario: string) => Promise<void>;
  editarFeedback: (id: number, novoComentario: string) => Promise<void>;
  excluirFeedback: (id: number) => Promise<void>;
  carregando: boolean;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  feedbacks: [],
  carregarFeedbacks: () => {},
  adicionarFeedback: async () => {},
  editarFeedback: async () => {},
  excluirFeedback: async () => {},
  carregando: false,
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  const carregarFeedbacks = async () => {
    setCarregando(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch('http://localhost:3000/api/feedbacks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar feedbacks');
      }

      const dados = await response.json();
      setFeedbacks(dados);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarFeedback = async (usuario: string, comentario: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch('http://localhost:3000/api/feedbacks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, comentario }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar feedback');
      }

      await carregarFeedbacks(); // Atualiza a lista após adicionar feedback
    } catch (error) {
      console.error(error);
    }
  };

  const editarFeedback = async (id: number, novoComentario: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch(`http://localhost:3000/api/feedbacks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comentario: novoComentario }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar feedback');
      }

      await carregarFeedbacks(); // Atualiza a lista após editar feedback
    } catch (error) {
      console.error(error);
    }
  };

  const excluirFeedback = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch(`http://localhost:3000/api/feedbacks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir feedback');
      }

      await carregarFeedbacks(); // Atualiza a lista após excluir feedback
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarFeedbacks(); // Garante que os feedbacks sejam carregados na inicialização
  }, []);

  return (
    <ContextoEstadoGlobal.Provider
      value={{
        feedbacks,
        carregarFeedbacks,
        adicionarFeedback,
        editarFeedback,
        excluirFeedback,
        carregando,
      }}
    >
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
