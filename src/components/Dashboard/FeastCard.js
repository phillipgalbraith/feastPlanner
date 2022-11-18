import React from "react";
import GuestList from "./GuestList";
import AvailableItems from "./AvailableItems";
import {useState} from 'react';

const FeastCard = (props) => {
  const {
    userLoggedIn, 
    selectUserItem, 
    changeItem, 
    detailsClick, 
    hidden,
    detailsClass,
    changeConfirmed, 
  } = props.props;
  
  const feast = props.feast;
  const [isSelecting, setIsSelecting] = useState(false)

  function handleSelectClick(e) {
    e.preventDefault(e);
    setIsSelecting(!isSelecting);
    return
  }

  function handleSelectSubmit(e) {
    e.preventDefault(e);
    setIsSelecting(!isSelecting);
    changeItem(e);
    return
  }
  return (
     
    <div className="card" key={`meeting ${feast["meetingId"]}`} name={feast.meetingId}>
        <div className="block-text-spacing">  
          <div className="card-top">
            <h3 className="feastName">
              {`${feast["meetingName"]}`}
            </h3>
            { 
              feast.people
              .filter(p => p.username === userLoggedIn)[0].role === "guest"?
              "You're Invited"
              : "You're Hosting"
    
            }
          </div>
          <ul>
            <li>Date: {`${feast["date"]}`}</li>
            <li>Time: {`${feast["time"]}`}</li>
            <li>Location: {`${feast["location"]}`}</li>
          </ul>
          <p> I'm bringing: 
              {feast.people.find(p => p.username === userLoggedIn).item}
          </p>
        </div>
        <button className={"card-button " + (isSelecting? "hidden" : "")} onClick={handleSelectClick}>Change Item</button>
        
        <form className={"itemSelect " + (isSelecting? "" : "hidden")} name={feast.meetingId}>
          <button className="card-button" name={feast.meetingId} onClick={handleSelectSubmit}>Change Your Item</button>          
          <AvailableItems feast={feast}  onChange={selectUserItem}/>
        </form>
  
        <button 
          name={feast.meetingId} 
          className="card-button" 
          onClick={detailsClick}>
          <span className={ detailsClass ? "" : "hidden"} > ∇ Hide </span>
          Details
        </button>

        <div className={"block-text-spacing margin-vert-5 " + (hidden ? "hidden" : "")} >
          <GuestList people={feast.people}  />
        </div>

        <button name={feast.meetingId} className="card-button" onClick={changeConfirmed}>
          {feast.people.find( p => p.username === userLoggedIn).confirmed? "Not Going?" : "RSVP Now!"}
        </button>  
        <h5>
          {
            feast.people.find( p => p.username === userLoggedIn)
              .confirmed? 
              "You confirmed you're going!" 
              : "Are you going?"
          }
        </h5>
      </div>
    )
}

export default FeastCard;