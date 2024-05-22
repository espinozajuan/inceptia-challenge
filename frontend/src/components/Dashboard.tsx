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
  background-color: #ffe6e6;
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
  height: 120px;
  background-color: #50d8d7;
  background-image: linear-gradient(316deg, #50d8d7 0%, #923993 74%);
`;

const H2 = styled.h2`
  color: #ffffff;
  font-weight: 500;
  font-size: 36px;
  line-height: 0px;
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
        <GreetingsWrapper>
          <H2>Dashboard</H2>
        </GreetingsWrapper>
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
