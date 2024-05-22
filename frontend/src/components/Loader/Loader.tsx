import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% { transform: rotate(1turn); }
`;

const Loader = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: ${rotate} 1s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1 / 1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
  }

  &::before {
    border-color: #f03355 #0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }

  &::after {
    margin: 8px;
  }
`;

export default Loader;
