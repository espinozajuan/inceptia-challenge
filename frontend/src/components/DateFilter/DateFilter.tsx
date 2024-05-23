import React, { useEffect, useState } from 'react';
import {
  MainWrapper,
  SearchBoxMainContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  TabsContainer,
  Tab,
  DateFilterContainer,
  DateInputContainer,
  DateInputLabel,
  DateInput,
  Error,
} from './DateFilter.styles';
import { DateFilterProps } from './DateFilter.types';
import { dateFilterTabs } from '../../constants';

const DateFilter: React.FC<DateFilterProps> = ({
  onFromDateChange,
  onToDateChange,
  onStatusFilterChange,
  onClearFilters,
  onSearchTermChange,
}) => {
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

  const handleClearFilters = () => {
    setFromDate('');
    setToDate('');
    setActiveTabIndex(0);
    onClearFilters();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <MainWrapper>
      <SearchBoxMainContainer>
        <SearchInputContainer>
          <SearchInput
            type='text'
            placeholder='ID Caso, ID Cliente o Tel'
            onChange={handleSearchChange}
          />
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
        {fromDate && toDate && (
          <SearchIcon
            src='/icons/delete.svg'
            width={23}
            height={23}
            alt='icon'
            onClick={handleClearFilters}
          />
        )}
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
