import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../GlobalStyles.css";
import styled from "styled-components";
import axios from "axios";

const userLoggedIn = "Phil2";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  align-items: center;
  
  form{
    display: inline-block;
    height: 120px;
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

  @media (min-width: 700px){
    button {
      font-size: 2.5rem;
    }

    h2 {
      margin: none;
      padding: 50px 0 0 0;
    }
  }
`;

const myFeasts = [
  {
    meetingId: "11",
    meetingName: "Foodapaloosa",
    people: [
      {username:"Abe123", item: "spaghetti", role: "organizer", confirmed: false}, 
      {username:"Gabe234", item: "cookies", role: "guest", confirmed: false},
      {username:"Sal123", item: "biscuits", role: "guest", confirmed: false},
      {username:"Phil2", item: "ratatouille", role: "guest", confirmed: false}
    ],
    items: ["spaghetti", "cookies", "biscuits", "pretzels", "ratatouille", "soda", "crackers", "cookies" ],
    date: "11/19/2021",
    time: "12PM-1PM",
    location: "McArthur Park",
    confirmed: false
  },
  {
    meetingId: "12",
    meetingName: "Feast Fest",
    people: [
      {username:"Abe123", item: "apricots", role: "guest", confirmed: false}, 
      {username:"Gabe234", item: "bread bowls", role: "guest", confirmed: false},
      {username:"Sal123", item: "chowder", role: "guest", confirmed: false},
      {username:"Phil2", item: "turkey", role: "organizer", confirmed: false}
    ],
    items: ["turkey","chowder","bread bowls","apricots", "ratatouille", "soda", "crackers", "cookies" ],
    date: "11/26/2021",
    time: "11AM-12PM",
    location: "BJHS staff lounge",
    confirmed: false
  },
  {
    meetingId: "13",
    meetingName: "Feast Fest",
    people: [
      {username:"Abe123", item: "apricots", role: "guest", confirmed: false}, 
      {username:"Gabe234", item: "bread bowls", role: "guest", confirmed: false},
      {username:"Sal123", item: "chowder", role: "guest", confirmed: false},
      {username:"Phil2", item: "turkey", role: "organizer", confirmed: false}
    ],
    items: [ "turkey","chowder","bread bowls","apricots", "ratatouille", "soda", "crackers", "cookies" ],
    date: "11/26/2021",
    time: "11AM-12PM",
    location: "BJHS staff lounge",
    confirmed: false,
  },
  {
    meetingId: "14",
    meetingName: "Feast Fest",
    people: [
      {username:"Phil2", item: "turkey", role: "organizer", confirmed: false},
      {username:"Abe123", item: "apricots", role: "guest", confirmed: false}, 
      {username:"Gabe234", item: "bread bowls", role: "guest", confirmed: false},
      {username:"Sal123", item: "chowder", role: "guest", confirmed: false}
    ],
    items: [ "turkey","chowder","bread bowls","apricots","ratatouille", "soda", "crackers", "cookies" ],
    date: "11/26/2021",
    time: "11AM-12PM",
    location: "BJHS staff lounge",
    confirmed: false,
  }
];

const getConfirmedText = (confirmed) => {
  return confirmed? "Cancel Confirmation?" : "Confirm You're Going!"
}

const initialUserData = myFeasts.map( p => {
  const currentUser = p.people.find( p => p.username === userLoggedIn);
  return { 
    username: currentUser.username,
    item: currentUser.item,
    confirmed: currentUser.confirmed,
    id: p.meetingId,
    confirmedText: getConfirmedText(currentUser.confirmed)
  }
})


const Dashboard = () => {

  //state
  const [myFeastData, setMyFeastData] = useState(myFeasts);
  const [userData, setUserData] = useState(initialUserData);
  const [hidden, setHidden] = useState(true);
  const [detailsClass, setDetailsClass] = useState("");

  useEffect(() => { 
    const newUserData= userData.map( u => {
      return { 
        username: u.username,
        item: u.item,
        id: u.id,
        confirmedText: getConfirmedText(myFeastData.find(p => p.meetingId === u.id).people.find( p => p.username === u.username).confirmed)
      }
    })
    
    setUserData(newUserData);
  }, [myFeastData]);

  useEffect(() => {
    hidden ? setDetailsClass("") : setDetailsClass("hidden");
  }, [hidden]);

  const detailsClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  const selectUserItem = (e) => {
    const newUserData= [...userData];
    const optionIdx = userData.indexOf(userData.find( i => i.id === e.target.id));
    newUserData[optionIdx].item = e.target.value
    setUserData(newUserData);
  }

  const changeItem = (e) => {
    e.preventDefault();
    const currentFeast = myFeastData.find( p => p.meetingId === e.target.name)
    const currPotIdx = myFeastData.indexOf(currentFeast);
    const currentUser = currentFeast.people.find( p => p.username === userLoggedIn)
    const currUsrIdx = currentFeast.people.indexOf(currentUser);
    let newFeastData = [...myFeastData];
    const selectedItem = userData.find( i => i.id === e.target.name).item;
    newFeastData[currPotIdx]["people"][currUsrIdx]["item"] = selectedItem;
    
    setMyFeastData(newFeastData);    
    
    axios.post('https://reqres.in/api/users', myFeastData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  const changeConfirmed = (e) => {
    e.preventDefault();
    const currentFeast = myFeastData.find( p => p.meetingId === e.target.name)
    const currPotIdx = myFeastData.indexOf(currentFeast);
    const currentUser = currentFeast.people.find( p => p.username === userLoggedIn)
    const currUsrIdx = currentFeast.people.indexOf(currentUser);
    let newFeastData = [...myFeastData];
    const currConfirmed = newFeastData[currPotIdx]["people"][currUsrIdx]["confirmed"];
    newFeastData[currPotIdx]["people"][currUsrIdx]["confirmed"] = !currConfirmed;
    return setMyFeastData(newFeastData);
  }
  
  useEffect ( () => {  
    axios.post('https://reqres.in/api/users', myFeastData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })}
  , [myFeastData])


  return (
    <StyledDashboard>
      <h1 className="pageTitle">{`${userLoggedIn}`}'s Dashboard</h1>
      
      <Link to="/feast/create">
        <button className="newPotLuck-button">Create New Feast</button>
      </Link>
      
      <h2>My Feasts</h2>

      <section id="myFeasts" className="mtg-container">
      
          {
           
            myFeastData.map( feast => {
              return (

              <div className="meeting" key={`meeting ${feast["meetingId"]}`} name={feast.meetingId}>
                <div className="info">
                  <h3 className="feastName">{`${feast["meetingName"]}`}</h3>
                  
                  <ul>
                    <form name={feast.meetingId}>
                      <li>I'm bringing: {feast.people.find(p => p.username === userLoggedIn).item}</li>
                      <select 
                        id={feast.meetingId} 
                        onChange={selectUserItem}
                        name={feast.meetingId}
                      > 
                       
                        {
                        feast.items.filter( item => {
                          return !feast.people.map( person => person.item).includes(item)
                          }
                          ).map( item => {
                          return (
                            <option name={item} key={`${item}-${feast["meetingId"]}`}>
                              {item}
                            </option>
                          );
                        })}

                      </select>
                      <button name={feast.meetingId} className="styledButton" onClick={changeItem}>Change Your Item</button>
                    </form>
                    <li>Role: {`${feast.people.filter(p => p.username === userLoggedIn)[0].role}`}</li>
                    <li>Date: {`${feast["date"]}`}</li>
                    <li>Time: {`${feast["time"]}`}</li>
                    <li>Location: {`${feast["location"]}`}</li>
                    <li><button name={feast.meetingId} className={ `styledButton ${detailsClass}`} onClick={detailsClick}>Details</button></li>
                  </ul>

                <ul className={ hidden? "hidden" : ""} onClick={detailsClick}>
                  {feast["people"].filter(person => person.username !== userLoggedIn).map( person => {
                    return(
                      <li key={`${person["username"]}-${feast["meetingId"]}`}>{`${person["username"]}`} is bringing {`${person["item"]}`}</li>
                    )
                  })}
                </ul>

                <ul className={hidden ? "hidden" : ""} onClick={detailsClick}>
                  {feast["people"].map((person) => {
                    return (
                      <li className={`${person["username"]}`}>
                        {`${person["username"]}`} is bringing{" "}
                        {`${person["item"]}`}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="alert">
                <button name={feast.meetingId} className="styledButton" onClick={changeConfirmed}>
                  {`${userData.find( p => p.id === feast.meetingId).confirmedText}`}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </StyledDashboard>
  );
};

export default Dashboard;
