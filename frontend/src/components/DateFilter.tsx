import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dateFilterTabs } from '../constants';

const MainWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

const SearchBoxMainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 6px 8px;
`;

const SearchInput = styled.input`
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

const SearchIcon = styled.img`
  object-fit: contain;
  cursor: pointer;
`;

const TabsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const Tab = styled.div<{ isActive: Boolean }>`
  color: ${({ isActive }) => (isActive ? '30245D' : '#d3d3d3')};
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  font-size: 12px;
  cursor: pointer;
`;

const DateFilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 10px 0px;
  width: 100%;
`;

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  border: 1px solid #1b83d8;
  padding: 4px 4px;
  border-radius: 4px;
`;

const DateInputLabel = styled.label`
  color: #36454f;
  font-weight: 500;
  font-size: 14px;
`;

const DateInput = styled.input`
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

const Error = styled.p`
  color: red;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-align: right;
`;

interface DateFilterProps {
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onStatusFilterChange: (status: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onFromDateChange,
  onToDateChange,
  onStatusFilterChange,
}) => {
  // States
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [isFromDateValid, setIsFromDateValid] = useState<boolean>(true);
  const [isToDateValid, setIsToDateValid] = useState<boolean>(true);
  const [isToDateFuture, setIsToDateFuture] = useState<boolean>(false);
  const [isFromDateFuture, setIsFromDateFuture] = useState<boolean>(false);

  useEffect(() => {
    // Validate if the "To" date is greater than or equal to the "From" date
    if (fromDate && toDate) {
      setIsToDateValid(new Date(toDate) >= new Date(fromDate));
      setIsToDateFuture(new Date(toDate) > new Date());
    } else {
      setIsToDateValid(true);
      setIsToDateFuture(false);
    }

    // Validate if the "From" date is not greater than today's date
    if (fromDate) {
      setIsFromDateFuture(new Date(fromDate) > new Date());
    } else {
      setIsFromDateFuture(false);
    }
  }, [fromDate, toDate]);

  // Handler ==> Update active tab index
  const updateActiveTabIndex = (updatedIndex: number) => {
    setActiveTabIndex(updatedIndex);
    onStatusFilterChange(dateFilterTabs[updatedIndex]); // Call the handler to update the status filter
  };

  const handleFromDateChange = (date: string) => {
    setFromDate(date);
    onFromDateChange(date);
  };

  const handleToDateChange = (date: string) => {
    setToDate(date);
    onToDateChange(date);
  };

  return (
    <MainWrapper>
      <SearchBoxMainContainer>
        <SearchInputContainer>
          <SearchInput type='text' placeholder='ID Caso, ID Cliente o Tel' />
          <SearchIcon
            src='/icons/search.svg'
            width={23}
            height={23}
            alt='icon'
          />
        </SearchInputContainer>
      </SearchBoxMainContainer>
      <DateFilterContainer>
        <DateInputContainer>
          <DateInputLabel>Desde</DateInputLabel>
          <DateInput
            type='date'
            value={fromDate}
            onChange={(e) => handleFromDateChange(e.target.value)}
          />
        </DateInputContainer>
        <DateInputContainer>
          <DateInputLabel>Hasta</DateInputLabel>
          <DateInput
            type='date'
            value={toDate}
            onChange={(e) => handleToDateChange(e.target.value)}
            disabled={!fromDate}
          />
        </DateInputContainer>
      </DateFilterContainer>
      {!isFromDateValid && <Error>La fecha 'Desde' debe ser válida.</Error>}
      {isFromDateFuture && (
        <Error>La fecha 'Desde' no puede ser una fecha futura.</Error>
      )}
      {!isToDateValid && (
        <Error>
          La fecha 'Hasta' debe ser posterior o igual a la fecha 'Desde'.
        </Error>
      )}
      {isToDateFuture && (
        <Error>La fecha 'Hasta' no puede ser una fecha futura.</Error>
      )}
      <TabsContainer>
        {dateFilterTabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTabIndex === index}
            onClick={() => updateActiveTabIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>
    </MainWrapper>
  );
};

export default DateFilter;
