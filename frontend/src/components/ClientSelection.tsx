import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchClients } from '../services/api';
import { Loader } from './shared';

const ClientSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const H3 = styled.h3`
  text-align: center;
  width: 100%;
  font-size: 24px;
  line-height: 0px;
  color: #36454f;
  font-weight: 600;
`;

const ClientItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ClientItem = styled.div<{ selected: Boolean }>`
  cursor: pointer;
  padding: 10px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ selected }) => (selected ? '#7469B6' : '#E1AFD1')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#36454f')};
  &:hover {
    background-color: #7469b6;
    color: #ffffff;
    padding: 10px 8px;
    border-radius: 4px;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  text-align: left;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
      setIsLoading(true);
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        setError('Failed to fetch clients');
      } finally {
        setIsLoading(false);
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
      <H3>CLIENTE</H3>
      {error && <Error>{error}</Error>}
      {isLoading && (
        <div
          style={{
            margin: 'auto',
          }}
        >
          <Loader />
        </div>
      )}
      <ClientItemWrapper>
        {clients.map((client) => (
          <ClientItem
            key={client.id}
            selected={client.id === selectedClientId}
            onClick={() => handleSelectClient(client.id)}
          >
            {client.name}
          </ClientItem>
        ))}
      </ClientItemWrapper>
    </ClientSelectionContainer>
  );
};

export default ClientSelection;
