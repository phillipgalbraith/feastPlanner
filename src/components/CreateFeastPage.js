import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//axios is here for  now until we make axiosWithAuth()
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";

const StyledCreatePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  height: 110vh;
  form {
    height: fit-content;
  }

  @media (min-width: 900px) {
    height: 145vh;
  }
`;

const initialFeastValues = {
  feast_name: "",
  location: "",
  date: "",
  time: "",
};

const CreateFeastPage = () => {
  //state initialization
  const [feastValues, setFeastValues] = useState(initialFeastValues);

  //destructuring
  const { push } = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/meetings", feastValues)
      .then((resp) => {
        console.log(resp.data);
      });
    push("/dashboard");
  };
  const handleChange = (e) => {
    setFeastValues({
      ...feastValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <StyledCreatePage>
      <div>
        <h1 className="pageTitle">Create Your Feast</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Event Name:
            <input type="text" name="feast_name" onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" onChange={handleChange} />
          </label>
          <label>
            Date (mm-dd-yy):
            <input type="text" name="date" onChange={handleChange} />
          </label>
          <label>
            Time (hh:mm:ss):
            <input type="text" name="time" onChange={handleChange} />
          </label>
          <button>Create Feast</button>
        </form>
      </div>
    </StyledCreatePage>
  );
};

export default CreateFeastPage;
