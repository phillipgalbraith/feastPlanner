import React from "react";


const AvailableItems = (props) => {
    const {feast , onChange} = props;

    if (!feast){ return  <p>loading...</p> }
    
    return (
        <select 
            id={feast.meetingId} 
            name={feast.meetingId}
            onChange={onChange}
          > 
            {feast.items.filter( item => {
              return !feast.people
                .map( person => person.item)
                .includes(item)
              }).map( item => {
                  return (
                  <option name={item} key={`${item}`}>
                    {item}
                  </option>
              );
            })}
        </select>
        )
      }
    
          


export default AvailableItems;