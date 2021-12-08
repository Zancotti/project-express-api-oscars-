import { Main } from "components/Main";
import React from "react";
import styled from "styled-components/macro";

export const App = () => {
  return (
    <Container>
      <Main />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
`;
