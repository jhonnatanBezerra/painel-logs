import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to{
    transform: rotate(360deg);
  }

`;

export const LoadingSpinning = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  &:before, &:after {
    content: "JB";
    position: relative;
    border-radius: inherit;
  }

  &::before {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #2280FF 10%,   #00F 100%);
    animation: ${spin} .5s infinite linear;
  }

  &::after {
    width: 85%;
    height: 85%;
    background-color: #151515;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

`