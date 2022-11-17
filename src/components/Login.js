import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import formSchema from "./Validation/LoginFormSchema";
import * as yup from 'yup';
import { Link, Route } from "react-router-dom";
import Signup from "./Signup";
import axios from "axios";


const initialLoginValues = {
  username: '',
  password: ''
}
const initialFormErrors = {
  username: '',
  password: ''
};

export default function Login () {
  const {push} = useHistory();
  //const { username, password } = props.values;
  const [loginValues, setLoginValues] = useState(initialLoginValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  const validate = (name, value) => {
    yup.reach(formSchema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value })
    validate(name, value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await getUserData();
    if(data?Object.keys(data).includes("token"):false ){
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      
      push("/dashboard");
    }
  }
  const getUserData = () => {
    console.log()
    const user = {
      username: loginValues.username,
      password: loginValues.username
    }
    return axios
      .post(`${process.env.REACT_APP_API_URI}/auth/login`, user)
      .then(resp => {
        console.log({resp})
        return resp.data;
      })
      .catch(err => {
        console.error({err});
        setHasFailed(true);
      });
  };

  useEffect(() => {
    formSchema.isValid(loginValues).then(valid => setDisabled(!valid))
  }, [loginValues])

  return (
  <section>

    <div className='login-page'>
      <h1 className='pageTitle'>Login</h1>
      <form id='login' onSubmit={onSubmit}>
        <div>
          <p>{formErrors.username}</p>
          <p>{formErrors.password}</p>
        </div>
        <label> Username:
          <input 
            id='username-input'
            type='text'
            name='username' 
            value={loginValues.username}
            onChange={handleChange}
          />
        </label>

        <label> Password:
          <input
            id='password-input'
            type='password'
            name='password'
            value={loginValues.password}
            onChange={handleChange}
          />
        </label>
        <button disabled={disabled}>Submit</button>
        { disabled && <li>username and password required</li>}
  
        { hasFailed && <li>login has failed</li>}

        <Link to='/signup'>
          <button>Signup</button>
        </Link>
        <Route path='/signup'>
          <Signup/>
        </Route> 
      </form>
    </div>
  </section>
  );
};
