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

  



  #cardContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    margin: 5;
  }

  .card {
    font-family: "Yanone Kaffeesatz", sans-serif;
    color: black;
    background-color: #c6b6bf;
    border: 2px solid #92828d;
    width: 90vw;
  }
  
  .hidden {
  display: none !important;
}
  .card{
    width: 90vw;
  }

  .dashboard-top {
    display: flex;
  }

  button.card-button {
    color: black !important;
    font-size: 2rem;
    margin: 3px 0;
  }

  h2 {
    line-height: 1rem;
  }
  
  .styledButton {
    width: 200px;
  }
  
  .card-button

  .block-text-spacing {
    line-height: 2rem;
  }

  .margin-vert-5 {
    margin:5px 0;
  }

  div.card {
    margin: 10px 0;
  }

  form{
    display: flex;
    flex-direction: column;
  }

    @media (min-width: 500px){

    .card{
      width: 48vw;
    }


  @media (min-width: 700px){

 

    h2 {
      margin: none;
      padding: 50px 0 0 0;
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



  }
  
  @media (min-width: 1200px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }

    div.card {
     margin: 10px 0;
   }

  }
  
.hidden {
  display: none !important;
}
`;

export default StyledDashboard
