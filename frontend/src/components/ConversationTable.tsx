import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchInboundCases } from '../services/api';
import { Loader } from './shared';

const TableContainer = styled.div`
  width: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding: 10px 0px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eff3f9;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #e20616;
  font-weight: 500;
  color: #ffffff;
`;

const TableCell = styled.td<{ isRed?: boolean }>`
  padding: 10px;
  text-align: center;
  border: 1px solid #d3d3d3;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: ${({ isRed }) => (isRed ? 'red' : '#30245D')};
`;

const EstadoTableCell = styled.td<{ isRed?: boolean }>`
  padding: 10px;
  text-align: center;
  border: 1px solid #d3d3d3;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: ${({ isRed }) => (isRed ? '#E73377' : '#1B83D8')};
  background-color: ${({ isRed }) => (isRed ? '#FADDE6' : '#EFF3F9')};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCases = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInboundCases(clientId, fromDate, toDate);
        setCases(data.results);
      } catch (error) {
        setError('Failed to fetch cases');
      } finally {
        setIsLoading(false);
      }
    };

    loadCases();
  }, [clientId, fromDate, toDate]);

  return (
    <TableContainer>
      {error && <div>{error}</div>}
      <TableWrapper>
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
              <tr key={caseData.id}>
                <TableCell isRed>{caseData.last_updated}</TableCell>
                <TableCell>{caseData.case_uuid}</TableCell>
                <TableCell>{caseData.phone}</TableCell>
                <TableCell isRed>{caseData.extra_metadata.dni}</TableCell>
                <TableCell isRed>{caseData.extra_metadata.grupo}</TableCell>
                <TableCell isRed>{caseData.extra_metadata.orden}</TableCell>
                <TableCell isRed>{caseData.case_duration}</TableCell>
                <EstadoTableCell
                  isRed={
                    caseData.case_result.name.toLowerCase() ===
                    'cliente no encontrado en db'
                  }
                >
                  {caseData.case_result.name}
                </EstadoTableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      {/* Loader  */}
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <Loader />
        </div>
      )}
    </TableContainer>
  );
};

export default ConversationTable;
