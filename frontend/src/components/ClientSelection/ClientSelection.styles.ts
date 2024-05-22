import styled from 'styled-components';

export const ClientSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

export const H3 = styled.h3`
  text-align: center;
  width: 100%;
  font-size: 24px;
  line-height: 0px;
  color: #8d929c;
  font-weight: 300;
`;

export const ClientItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const ClientItem = styled.div<{ selected: Boolean }>`
  cursor: pointer;
  padding: 10px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ selected }) => (selected ? '#D7E4F5' : 'transparent')};
  border-right: ${({ selected }) =>
    selected ? '4px solid #006ACB' : 'transparent'};
  color: ${({ selected }) => (selected ? '#006ACB' : '#7984A2')};
  &:hover {
    background-color: #d7e4f5;
    color: #526aca;
    padding: 10px 8px;
    border-radius: 4px;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  text-align: left;
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  color: white;
  cursor: pointer;
  background: #bd3f32;
  margin-bottom: 20px;
`;
