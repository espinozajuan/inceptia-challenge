import React, { useState } from 'react';
import styled from 'styled-components';
import ClientSelection from './ClientSelection';
import DateFilter from './DateFilter';
import ConversationTable from './ConversationTable';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 10px;
  background-color: #eff3f9;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  flex-shrink: 0;
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin-left: 270px;
`;

const GreetingsWrapper = styled.div`
  border-radius: 12px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const H2 = styled.h2`
  color: #8d929c;
  font-weight: 400;
  font-size: 36px;
  line-height: 0px;
`;

const Dashboard: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('TODOS');

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
        <DateFilter
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onStatusFilterChange={setActiveStatusFilter}
          onClearFilters={handleClearFilters}
        />
        {selectedClientId && (
          <ConversationTable
            clientId={selectedClientId}
            fromDate={fromDate}
            toDate={toDate}
            statusFilter={activeStatusFilter}
          />
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
