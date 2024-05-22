import React, { useState } from 'react';
import {
  DashboardContainer,
  Sidebar,
  MainContent,
  GreetingsWrapper,
  H2,
} from './Dashboard.styles';
import ClientSelection from '../ClientSelection/ClientSelection';
import DateFilter from '../DateFilter/DateFilter';
import ConversationTable from '../ConversationTable/ConversationTable';

const Dashboard: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleClearFilters = () => {
    setFromDate('');
    setToDate('');
    setActiveStatusFilter('TODOS');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <ClientSelection onSelectClient={setSelectedClientId} />
      </Sidebar>
      <MainContent>
        <GreetingsWrapper>
          <H2>Reportes</H2>
        </GreetingsWrapper>
        {selectedClientId && (
          <>
            <DateFilter
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
              onStatusFilterChange={setActiveStatusFilter}
              onClearFilters={handleClearFilters}
              onSearchTermChange={setSearchTerm}
            />
            <ConversationTable
              clientId={selectedClientId}
              fromDate={fromDate}
              toDate={toDate}
              statusFilter={activeStatusFilter}
              searchTerm={searchTerm}
            />
          </>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
