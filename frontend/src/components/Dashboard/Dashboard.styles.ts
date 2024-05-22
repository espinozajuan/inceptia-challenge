import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

export const Sidebar = styled.div`
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

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin-left: 270px;
`;

export const GreetingsWrapper = styled.div`
  border-radius: 12px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const H2 = styled.h2`
  color: #8d929c;
  font-weight: 400;
  font-size: 36px;
  line-height: 0px;
`;
