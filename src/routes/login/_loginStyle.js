import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  @media only screen and (min-width: 1024px) {
    > form {
      width: 300px;
    }
  }
`;
