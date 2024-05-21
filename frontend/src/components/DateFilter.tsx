import React from 'react';
import styled from 'styled-components';

const DateFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DateInputLabel = styled.label`
  margin-bottom: 5px;
`;

const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const DateFilter: React.FC = () => {
  return (
    <DateFilterContainer>
      <DateInputContainer>
        <DateInputLabel>Desde</DateInputLabel>
        <DateInput type='date' />
      </DateInputContainer>
      <DateInputContainer>
        <DateInputLabel>Hasta</DateInputLabel>
        <DateInput type='date' />
      </DateInputContainer>
    </DateFilterContainer>
  );
};

export default DateFilter;