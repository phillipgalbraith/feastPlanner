import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledCoverPage = styled.div`
  div {
    background-color: black;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 90vw;
  }
  h3 {
    color: white;
  }
`
const CoverPage = () => {
  const { push } = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    push("/login");
  };
  return (
    <StyledCoverPage>
      <div>
        <h1 className="pageTitle">Feast Planner</h1>
        <h3>Plan for every feast</h3>
        <button className="styledButton" onClick={handleClick}>Let's Plan</button>
      </div>
    </StyledCoverPage>
    );
};

export default CoverPage;
