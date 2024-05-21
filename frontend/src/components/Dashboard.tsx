import React from 'react';
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
  return (
    <DashboardContainer>
      <Sidebar>
        <ClientSelection />
      </Sidebar>
      <MainContent>
        <Header>Dashboards</Header>
        <DateFilter />
        <ConversationTable />
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
