import React from 'react';
import { Box, Text, IconButton, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface FeedbackItemProps {
  id: number;
  nota: number;
  comentario: string;
  data: string;
  onDelete?: (id: number) => Promise<void>;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ id, nota, comentario, data, onDelete }) => {
  return (
    <Box bg="white" p={4} m={2} rounded="md" shadow={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Text fontSize="lg" fontWeight="bold">
            Nota: {nota}
          </Text>
          <Text mt={1}>{comentario}</Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            {new Date(data).toLocaleDateString()}
          </Text>
        </Box>
        {onDelete && (
          <IconButton
            icon={<MaterialIcons name="delete" size={24} color="red" />}
            onPress={() => onDelete(id)}
          />
        )}
      </HStack>
    </Box>
  );
};

export default FeedbackItem;