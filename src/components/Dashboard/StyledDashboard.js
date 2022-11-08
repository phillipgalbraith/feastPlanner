import styled from "styled-components";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  align-items: center;
  height:100%;
  form{
    display: inline-block;
    height: 150px;
  }
  
  div.meeting {
    margin: 10px 0;
  }
  

  .styledButton {
    margin-bottom: 10px;
  }

  #cardContainer {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }



  button {
    font-size: 2rem;
  }

  h2 {
    line-height: 8rem;
  }
  
  .styledButton {
    width: 200px;
  }

  @media (min-width: 400px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }
  }

  
  @media (min-width: 700px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }

    div.meeting {
      margin: 10px 0;
    }

  }
  
  @media (min-width: 1000px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }

  form{
    display: inline-block;
    height: 120px;
  }

  }
  
  @media (min-width: 1200px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }

    div.meeting {
     margin: 10px 0;
   }

  }
  
`;

export default StyledDashboard
