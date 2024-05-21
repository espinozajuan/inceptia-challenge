import React from 'react';
import styled from 'styled-components';

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

const clients = [
  'Equivida Mora Temp',
  'G&T Prestamos Mora',
  'G&T TC Mora',
  'Galicia M Temp Gedco',
  'gmotors',
  'gmfinancial',
  'gmsorteo',
  'GTD',
  'GTD HBO',
  'GTD Ventas',
  'GyT Mora Temp',
];

const ClientSelection: React.FC = () => {
  return (
    <ClientSelectionContainer>
      <h3>CLIENTE</h3>
      {clients.map((client) => (
        <ClientItem key={client}>{client}</ClientItem>
      ))}
    </ClientSelectionContainer>
  );
};

export default ClientSelection;
