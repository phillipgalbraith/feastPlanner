import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../GlobalStyles.css";
import StyledDashboard from "./StyledDashboard";

import { myInitialFeasts } from "./utils/dummyData"
import { getNewFeastItem, getNewFeastConfirmed } from "./model/getDashboardData";
import FeastCard from "./FeastCard";

const userLoggedIn = "Phil2";

const getConfirmedText = (confirmed) => {
  return confirmed? "Cancel Confirmation?" : "Confirm You're Going!"
}

const getInitialConfirmedText = (feastData, u) => {
  const confirmed = feastData.find(p => p.meetingId === u.id)
    .people
    .find( p => p.username === u.username)
    .confirmedText
    return confirmed? "Cancel Confirmation?" : "Confirm You're Going!"
}

// User data is state only pertaining to the displayed information
//  it is an array of feast objects but only concerning the current user.
const initialUserData = myInitialFeasts.map( feast => {
  const currentUser = feast.people.find( p => p.username === userLoggedIn);
  return { 
    username: currentUser.username,
    item: currentUser.item,
    id: feast.meetingId,
    confirmedText: getConfirmedText(currentUser.confirmed),
    confirmed: false
  }
})

const Dashboard = () => {
  //state
  const [myFeastData, setMyFeastData] = useState(myInitialFeasts);
  const [userData, setUserData] = useState(initialUserData);
  const [hidden, setHidden] = useState(true);
  const [detailsClass, setDetailsClass] = useState("");

  useEffect(() => { 
    const newUserData = userData.map( u => {
      return { 
        item: u.item,
        confirmedText: getInitialConfirmedText(myFeastData,u),
        ...u
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
    const newFeastData = getNewFeastItem(e, myFeastData, userData, userLoggedIn) ;
    setMyFeastData(newFeastData);    
  }
  
  const changeConfirmed = (e) => {
    const newFeastData = getNewFeastConfirmed(e, myFeastData, userData, userLoggedIn)
    return setMyFeastData(newFeastData);
  }
  
  const feastCardProps={ 
      userLoggedIn, 
      selectUserItem, 
      changeItem, 
      detailsClick, 
      hidden,
      detailsClass,
      changeConfirmed,
      userData 
  }

  return (

    <StyledDashboard>
      <h1 className="pageTitle">
        {`${userLoggedIn}`}'s Feasts
       
      </h1>
      <Link to="/feast/create">
          <button className="card-button"> + Plan Feast</button>
      </Link>
    
      
      <section id="cardContainer" className="mtg-container">
    
          {   
            myFeastData.map( feast => {
              return (<FeastCard feast={feast} props={feastCardProps}/>);
        })}
      </section>
    </StyledDashboard>
  );
};

export default Dashboard;