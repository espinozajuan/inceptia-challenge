import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Header>Dashboard</Header>
      {/*Bot selection, date filter, and conversation display here */}
    </DashboardContainer>
  );
};

export default Dashboard;
