import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 10px;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f8f8f8;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const data = [
  {
    managed: '03/11/2021 13:41:40',
    caseId: 6,
    phone: 541140754716,
    dni: '33487562',
    group: 4875,
    order: 726,
    call: '00:01:07',
    status: 'CORTÓ CLIENTE - ORDEN IDENTIFICADA',
  },
  {
    managed: '03/11/2021 12:33:18',
    caseId: 5,
    phone: 541140754716,
    dni: '35957282',
    group: 1452,
    order: 521,
    call: '00:01:55',
    status: 'TRANSFERIDO',
  },
];

const ConversationTable: React.FC = () => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Gestionado</TableHeader>
            <TableHeader>ID Caso</TableHeader>
            <TableHeader>Teléfono</TableHeader>
            <TableHeader>Dni</TableHeader>
            <TableHeader>Grupo</TableHeader>
            <TableHeader>Orden</TableHeader>
            <TableHeader>Llamada</TableHeader>
            <TableHeader>Estado</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.managed}</TableCell>
              <TableCell>{row.caseId}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.dni}</TableCell>
              <TableCell>{row.group}</TableCell>
              <TableCell>{row.order}</TableCell>
              <TableCell>{row.call}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ConversationTable;
