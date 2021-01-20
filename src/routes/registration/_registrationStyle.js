import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;

  > h2 {
    margin-bottom: 0;
  }

  > h2,
  form {
    width: 300px;
  }

  section {
    margin-top: 40px;
  }

  button[type="submit"] {
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;
