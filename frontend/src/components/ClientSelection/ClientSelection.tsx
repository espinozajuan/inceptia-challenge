import React, { useEffect, useState } from 'react';
import { fetchClients } from '../../services/api';
import { Loader } from '../Loader';
import {
  ClientSelectionContainer,
  H3,
  ClientItemWrapper,
  ClientItem,
  Error,
  Button,
} from './ClientSelection.styles';
import { Client, ClientSelectionProps } from './ClientSelection.types';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
      <Button type='submit' onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </ClientSelectionContainer>
  );
};

export default ClientSelection;
