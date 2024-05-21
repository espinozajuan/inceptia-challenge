import React, { useState } from 'react';
import styled from 'styled-components';
import ClientSelection from './ClientSelection';
import DateFilter from './DateFilter';
import ConversationTable from './ConversationTable';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 10px;
  background-color: #f8f8f8;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Dashboard: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>('2021-03-01');
  const [toDate, setToDate] = useState<string>('2022-03-25');

  return (
    <DashboardContainer>
      <Sidebar>
        <ClientSelection onSelectClient={setSelectedClientId} />
      </Sidebar>
      <MainContent>
        <Header>Dashboards</Header>
        <DateFilter onFromDateChange={setFromDate} onToDateChange={setToDate} />
        {selectedClientId && (
          <ConversationTable
            clientId={selectedClientId}
            fromDate={fromDate}
            toDate={toDate}
          />
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
