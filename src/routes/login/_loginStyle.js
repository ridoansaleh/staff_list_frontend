import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  > form,
  div {
    width: 300px;
  }
`;

export const DoesntHaveAccount = styled.div`
  text-align: center;
  span {
    color: blue;
    cursor: pointer;
  }
`;
