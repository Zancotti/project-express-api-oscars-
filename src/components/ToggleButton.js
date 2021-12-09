import React from "react";
import styled from "styled-components/macro";

export const ToggleButton = ({ title, onClick, isSelected }) => {
  return (
    <ToggleBtn isSelected={isSelected} onClick={onClick}>
      {title}
    </ToggleBtn>
  );
};

const ToggleBtn = styled.button`
  padding: 10px;
  letter-spacing: 1px;
  font-size: 14px;
  margin: 0 4px;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  background-color: ${(props) => (props.isSelected ? "#b2ded6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (props.isSelected ? "#b2ded6" : "#d7d7d7")};
  }

  @media (max-width: 667px) {
    padding: 8px;
    font-size: 12px;
    letter-spacing: 0px;
  }
`;
