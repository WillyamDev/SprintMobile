import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Feedback {
  id: number;
  usuario: string;
  comentario: string;
  data: string;
}

interface Sintoma {
  id: number;
  descricao: string;
  intensidade: string;
  data_registro: string;
  status: 'pendente' | 'aprovado' | 'reprovado';
}

interface ContextoEstadoGlobal {
  feedbacks: Feedback[];
  sintomas: Sintoma[];
  carregarFeedbacks: () => void;
  carregarSintomas: () => void;
  adicionarSintoma: (descricao: string, intensidade: string) => Promise<void>;
  editarSintoma: (id: number, descricao: string, intensidade: string) => Promise<void>;
  excluirSintoma: (id: number) => Promise<void>;
  carregando: boolean;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  feedbacks: [],
  sintomas: [],
  carregarFeedbacks: () => {},
  carregarSintomas: () => {},
  adicionarSintoma: async () => {},
  editarSintoma: async () => {},
  excluirSintoma: async () => {},
  carregando: false,
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  const carregarSintomas = async () => {
    setCarregando(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch('http://localhost:3000/api/sintomas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar sintomas');
      }

      const dados = await response.json();
      setSintomas(dados);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarSintoma = async (descricao: string, intensidade: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch('http://localhost:3000/api/sintomas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, intensidade }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar sintoma');
      }

      const novoSintoma: Sintoma = await response.json();
      setSintomas(prevSintomas => [...prevSintomas, novoSintoma]);
    } catch (error) {
      console.error(error);
    }
  };

  const editarSintoma = async (id: number, descricao: string, intensidade: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch(`http://localhost:3000/api/sintomas/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, intensidade }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar sintoma');
      }

      const sintomaAtualizado = await response.json();
      setSintomas(prevSintomas =>
        prevSintomas.map(sintoma => (sintoma.id === id ? sintomaAtualizado : sintoma))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const excluirSintoma = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    try {
      const response = await fetch(`http://localhost:3000/api/sintomas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir sintoma');
      }

      setSintomas(prevSintomas => prevSintomas.filter(sintoma => sintoma.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContextoEstadoGlobal.Provider
      value={{
        sintomas,
        carregarSintomas,
        adicionarSintoma,
        editarSintoma,
        excluirSintoma,
        carregando,
        feedbacks: [], // Pode expandir aqui também se quiser integrar ambos
        carregarFeedbacks: () => {},
      }}
    >
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
