import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const SearchBoxMainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 6px 8px;
`;

export const SearchInput = styled.input`
  border: none;
  font-size: 14px;
  color: #808080;
  outline: none;
  width: 170px;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const SearchIcon = styled.img`
  object-fit: contain;
  cursor: pointer;
`;

export const TabsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const Tab = styled.div<{ isActive: Boolean }>`
  color: ${({ isActive }) => (isActive ? '30245D' : '#d3d3d3')};
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  font-size: 12px;
  cursor: pointer;
`;

export const DateFilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 10px 0px;
  width: 100%;
`;

export const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  border: 1px solid #1b83d8;
  padding: 4px 4px;
  border-radius: 4px;
`;

export const DateInputLabel = styled.label`
  color: #36454f;
  font-weight: 500;
  font-size: 14px;
`;

export const DateInput = styled.input`
  padding: 5px;
  border: 0px;
  border-radius: 3px;
  max-width: 200px;
  color: #36454f;

  &:focus {
    border: 0px;
    outline: 0px;
  }

  &:focus-visible {
    border: 0px;
    outline: 0px;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-align: right;
`;
