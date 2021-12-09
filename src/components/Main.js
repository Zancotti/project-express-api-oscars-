import React from "react";
import styled from "styled-components/macro";
import { NominatedList } from "./NominatedList";

export const Main = () => {
  return (
    <MainContainer>
      <NominatedList />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  width: 100%;
  min-width: 320px;
`;
