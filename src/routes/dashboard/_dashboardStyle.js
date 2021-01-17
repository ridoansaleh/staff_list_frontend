import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;

  > section {
    width: 90%;
    margin-top: 20px;
  }

  @media only screen and (min-width: 768px) {
    > section {
      overflow-x: auto;
    }
  }

  @media only screen and (min-width: 1024px) {
    > section {
      width: 1000px;
      overflow-x: hidden;
    }
  }

  @media only screen and (min-width: 1400px) {
    > section {
      width: 1300px;
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

  @media only screen and (min-width: 1400px) {
    width: 1300px;
  }
`;
