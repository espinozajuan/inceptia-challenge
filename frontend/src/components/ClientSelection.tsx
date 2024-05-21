import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchClients } from '../services/api';

const ClientSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

interface Client {
  id: number;
  name: string;
}

const ClientSelection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
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

  return (
    <ClientSelectionContainer>
      <h3>CLIENTE</h3>
      {error && <div>{error}</div>}
      {clients.map((client) => (
        <ClientItem key={client.id}>{client.name}</ClientItem>
      ))}
    </ClientSelectionContainer>
  );
};

export default ClientSelection;
