import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchInboundCases } from '../services/api';

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

interface Case {
  id: number;
  bot: { id: number; name: string; alias: string };
  case_uuid: string;
  phone: number;
  first_name: string;
  last_name: string;
  case_result: {
    result_id: number;
    name: string;
    is_final: boolean;
    contacted: boolean;
  };
  case_duration: string;
  case_log: {
    responses: { text: string; time: number; confidence: number }[];
    result_id: number;
    commitment: string;
    got_promise: boolean;
    transcription: { text: string; time: number; confidence: number }[];
    final_sip_code: number;
  };
  extra_metadata: { dni: string; grupo: string; orden: string };
  recording: string;
  is_complete: boolean;
  status: string;
  last_updated: string;
  is_active: boolean;
}

interface ConversationTableProps {
  clientId: number;
  fromDate: string;
  toDate: string;
}

const ConversationTable: React.FC<ConversationTableProps> = ({
  clientId,
  fromDate,
  toDate,
}) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchInboundCases(clientId, fromDate, toDate);
        setCases(data.results);
      } catch (error) {
        setError('Failed to fetch cases');
      }
    };

    loadCases();
  }, [clientId, fromDate, toDate]);

  return (
    <TableContainer>
      {error && <div>{error}</div>}
      <Table>
        <thead>
          <tr>
            <TableHeader>Gestionado</TableHeader>
            <TableHeader>ID Caso</TableHeader>
            <TableHeader>Teléfono</TableHeader>
            <TableHeader>Dni</TableHeader>
            <TableHeader>Grupo</TableHeader>
            <TableHeader>Orden</TableHeader>
            <TableHeader>Duración</TableHeader>
            <TableHeader>Estado</TableHeader>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseData) => (
            <TableRow key={caseData.id}>
              <TableCell>{caseData.last_updated}</TableCell>
              <TableCell>{caseData.case_uuid}</TableCell>
              <TableCell>{caseData.phone}</TableCell>
              <TableCell>{caseData.extra_metadata.dni}</TableCell>
              <TableCell>{caseData.extra_metadata.grupo}</TableCell>
              <TableCell>{caseData.extra_metadata.orden}</TableCell>
              <TableCell>{caseData.case_duration}</TableCell>
              <TableCell>{caseData.case_result.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ConversationTable;
