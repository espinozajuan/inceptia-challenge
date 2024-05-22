import React, { useEffect, useState } from 'react';
import { fetchInboundCases } from '../../services/api';
import { Loader } from '../Loader';
import {
  TableContainer,
  TableWrapper,
  Table,
  TableHeader,
  TableCell,
  EstadoTableCell,
} from './ConversationTable.styles';
import { Case, ConversationTableProps } from './ConversationTable.types';

const ConversationTable: React.FC<ConversationTableProps> = ({
  clientId,
  fromDate,
  toDate,
  statusFilter,
  searchTerm,
}) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCases = async () => {
      try {
        setIsLoading(true);
        let data;
        if (fromDate && toDate) {
          data = await fetchInboundCases(clientId, fromDate, toDate);
        } else {
          data = await fetchInboundCases(clientId, '', '');
        }
        if (data.results.length === 0) {
          setError('No se encontraron resultados.');
        } else {
          setError('');
        }
        setCases(data.results);
      } catch (error) {
        setError('Failed to fetch cases');
      } finally {
        setIsLoading(false);
      }
    };

    loadCases();
  }, [clientId, fromDate, toDate]);

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const filteredCases = cases.filter((caseData) => {
    const statusMatches =
      normalizeString(statusFilter) === 'todos' ||
      normalizeString(caseData.case_result.name) ===
        normalizeString(statusFilter);

    const searchTermMatches =
      caseData.case_uuid.includes(searchTerm) ||
      (caseData.extra_metadata.dni &&
        caseData.extra_metadata.dni.includes(searchTerm)) ||
      caseData.phone.toString().includes(searchTerm);

    return statusMatches && searchTermMatches;
  });

  return (
    <TableContainer>
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
          {error && <div>{error}</div>}
          <tbody>
            {filteredCases.map((caseData) => (
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
