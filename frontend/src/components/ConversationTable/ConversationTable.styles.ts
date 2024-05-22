import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
`;

export const TableWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding: 10px 0px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eff3f9;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #e20616;
  font-weight: 500;
  color: #ffffff;
`;

export const TableCell = styled.td<{ isRed?: boolean }>`
  padding: 10px;
  text-align: center;
  border: 1px solid #d3d3d3;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: ${({ isRed }) => (isRed ? 'red' : '#30245D')};
`;

export const EstadoTableCell = styled.td<{ isRed?: boolean }>`
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
