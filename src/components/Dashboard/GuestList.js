import React from "react";

const GuestList = (props) => {
  const {people} = props;
    return (
        <ul> 
        {people && people.map((person) => {
          return (
            <li className={`${person["username"]}`}>
              {`${person["username"]}`} is bringing{" "} {`${person["item"]}`}
            </li>
          );
        })}
      </ul>          
    )
}
export default GuestList;