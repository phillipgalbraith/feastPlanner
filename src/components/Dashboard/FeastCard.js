import React from "react";
import GuestList from "./GuestList";
import AvailableItems from "./AvailableItems";

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

  return (
     
    <div className="meeting" key={`meeting ${feast["meetingId"]}`} name={feast.meetingId}>
      <div className="info">
        <h3 className="feastName">{`${feast["meetingName"]}`}</h3>
          
        <ul>
          <li>Role: {`${feast.people.filter(p => p.username === userLoggedIn)[0].role}`}</li>
          <li>Date: {`${feast["date"]}`}</li>
          <li>Time: {`${feast["time"]}`}</li>
          <li>Location: {`${feast["location"]}`}</li>
        </ul>
    
        <form className="itemSelect" name={feast.meetingId}>
       
          <p> I'm bringing: 
            {feast.people.find(p => p.username === userLoggedIn).item}
          </p>
          <AvailableItems feast={feast}  onChange={selectUserItem}/>
          <button name={feast.meetingId} className="styledButton" onClick={changeItem}>Change Your Item</button>
        </form>
  
        <button 
          name={feast.meetingId} 
          className="styledButton" 
          onClick={detailsClick}>
          <span className={ detailsClass ? "" : "hidden"} >Hide </span>
          Details
        </button>

        <div className={hidden ? "hidden" : ""} >
          <GuestList people={feast.people}  />
        </div>
        <button name={feast.meetingId} className="styledButton" onClick={changeConfirmed}>
          {feast.people.find( p => p.username === userLoggedIn).confirmed? "Not Going?" : "RSVP Now!"}
        </button>  
      </div>
                
    </div>    
  )
}

export default FeastCard;