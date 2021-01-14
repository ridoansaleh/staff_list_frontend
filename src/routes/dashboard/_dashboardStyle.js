import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  > section {
    width: 90%;
    margin-top: 20px;
  }

  @media only screen and (min-width: 1024px) {
    > section {
      width: 1000px;
    }
  }
`;

export const AddWrapper = styled.div`
  width: 90%;
  margin-top: 30px;

  @media only screen and (min-width: 1024px) {
    width: 1000px;
    margin-top: 60px;
  }
`;
