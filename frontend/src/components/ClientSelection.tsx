import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchClients } from '../services/api';

const ClientSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientItem = styled.div<{ selected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#e0e0e0' : 'transparent')};
  &:hover {
    background-color: #e0e0e0;
  }
`;

interface Client {
  id: number;
  name: string;
}

interface ClientSelectionProps {
  onSelectClient: (clientId: number) => void;
}

const ClientSelection: React.FC<ClientSelectionProps> = ({
  onSelectClient,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        setError('Failed to fetch clients');
      }
    };

    loadClients();
  }, []);

  const handleSelectClient = (clientId: number) => {
    setSelectedClientId(clientId);
    onSelectClient(clientId);
  };

  return (
    <ClientSelectionContainer>
      <h3>CLIENTE</h3>
      {error && <div>{error}</div>}
      {clients.map((client) => (
        <ClientItem
          key={client.id}
          selected={client.id === selectedClientId}
          onClick={() => handleSelectClient(client.id)}
        >
          {client.name}
        </ClientItem>
      ))}
    </ClientSelectionContainer>
  );
};

export default ClientSelection;
