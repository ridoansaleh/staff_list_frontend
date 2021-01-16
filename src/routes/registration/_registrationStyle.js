import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 40px;

  > h2,
  form,
  div {
    width: 300px;
  }

  button[type="submit"] {
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;
