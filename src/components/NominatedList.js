import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { ToggleButton } from "./ToggleButton";
import { Loading } from "./Loading";

export const NominatedList = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const OscarsApi = "https://zancotti-oscars-api.herokuapp.com/";
  const CategoryApi = `https://zancotti-oscars-api.herokuapp.com/category/${selectedFilter}`;
  const PageApi = `https://zancotti-oscars-api.herokuapp.com/?page=${selectedPage}`;

  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    fetch(OscarsApi)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(PageApi)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, [selectedPage, PageApi]);

  useEffect(() => {
    setIsLoading(true);
    if (selectedFilter === "") {
      fetch(OscarsApi)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
    } else
      fetch(CategoryApi)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
  }, [selectedFilter, CategoryApi, selectedPage]);

  return (
    <>
      <Header>Oscars Nominations from 1928 - 2020</Header>

      <ButtonsContainer>
        <ToggleButton
          title="Lead Actor"
          isSelected={selectedFilter === "Lead Actor"}
          onClick={() => {
            if (selectedFilter !== "Lead Actor") {
              setSelectedFilter("Lead Actor");
            } else setSelectedFilter("");
          }}
        />
        <ToggleButton
          title="Lead Actress"
          isSelected={selectedFilter === "Lead Actress"}
          onClick={() => {
            if (selectedFilter !== "Lead Actress") {
              setSelectedFilter("Lead Actress");
            } else setSelectedFilter("");
          }}
        />
        <ToggleButton
          title="Directing"
          isSelected={selectedFilter === "Directing"}
          onClick={() => {
            if (selectedFilter !== "Directing") {
              setSelectedFilter("Directing");
            } else setSelectedFilter("");
          }}
        />
        <div></div>
        {selectedFilter === "" && selectedPage !== 0 && (
          <Button
            onClick={() => {
              setSelectedPage(selectedPage - 1);
            }}
          >
            Previous Page
          </Button>
        )}
        {selectedFilter === "" && (
          <Button
            onClick={() => {
              setSelectedPage(selectedPage + 1);
            }}
          >
            Next Page
          </Button>
        )}
      </ButtonsContainer>

      {isLoading && (
        <Container>
          <Loading />
        </Container>
      )}

      {!isLoading && (
        <Container>
          {data.map((item) => {
            return (
              <ItemContainer key={item.id}>
                <Category>{item.category}</Category>
                <InformationContainer>
                  <ResultYearContainer>
                    {item.winner === "TRUE" ? (
                      <Result>Winner</Result>
                    ) : (
                      <Result>Nominated</Result>
                    )}
                    <CeremonyYear>{item.yearCeremony}</CeremonyYear>
                  </ResultYearContainer>
                  <Film>{item.film}</Film>
                  <span>{item.name}</span>
                </InformationContainer>
              </ItemContainer>
            );
          })}
        </Container>
      )}
    </>
  );
};

const Header = styled.h1`
  margin: 40px 80px;
  font-size: 50px;
  font-weight: 300;

  @media (min-width: 668px) and (max-width: 1024px) {
    margin: 40px;
  }

  @media (max-width: 667px) {
    margin: 20px;
    font-size: 30px;
  }
`;

const ButtonsContainer = styled.div`
  padding: 0 80px 40px 80px;
  display: grid;
  grid-template-columns: auto auto auto 1fr auto auto;
  width: 100%;

  @media (min-width: 668px) and (max-width: 1024px) {
    padding: 0 40px 40px 40px;
  }

  @media (max-width: 667px) {
    padding: 20px;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    row-gap: 10px;
  }
`;

const Button = styled.button`
  padding: 10px;
  letter-spacing: 1px;
  font-size: 14px;
  margin: 0 4px;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  background-color: #efefef;
  &:hover {
    background-color: #d7d7d7;
  }

  @media (max-width: 667px) {
    padding: 8px;
    font-size: 12px;
    letter-spacing: 0px;
  }
`;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin: 0 80px 80px 80px;

  @media (min-width: 668px) and (max-width: 1024px) {
    margin: 0 40px 40px 40px;
  }

  @media (max-width: 667px) {
    margin: 20px;
    justify-content: center;
  }
`;

const ItemContainer = styled.div`
  background-color: white;
  width: 300px;
  height: 220px;
  text-align: center;
  border-bottom: 3px solid #b2ded6;
  box-shadow: 0 3px 10px rgb(0 0 0 /20%);

  @media (max-width: 667px) {
    width: 300px;
    height: 200px;
  }
`;

const Category = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1px;
  color: white;
  background-color: #b2ded6;
  padding: 10px;
  height: 65px;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #b2ded6;
    border-bottom: 0;
    margin-left: -6px;
    margin-bottom: -6px;
  }
`;

const ResultYearContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 0 20px;
  padding: 8px 4px;
`;

const CeremonyYear = styled.span`
  font-size: 12px;
`;

const Result = styled.div`
  font-size: 12px;
`;

const InformationContainer = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const Film = styled.span`
  font-weight: 700;
  padding: 10px 0 0 0;
`;
