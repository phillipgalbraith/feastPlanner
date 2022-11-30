import React, { useState } from "react";

const Organizer = () => {
  //Destructuring
  // const { user_id } = useContext(createContext());
  // const { feast_id } = useParams();
  //State
  const [guests, setGuests] = useState([]);
  const [itemsToAdd, setItemsToAdd] = useState([]);
  const [formValues, setFormValues] = useState({
    invite: "",
    item: "",
  });

  //Handles
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleInviteUser = (e) => {
    e.preventDefault();

    //need the end point to work so we can make a post to invite users
    // axiosWithAuth()
    //   .post("", { username: username })
    //   .then((resp) => {
    //     setGuests([...guests, { username: username }]);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    setFormValues({
      ...formValues,
      invite: "",
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setItemsToAdd([...itemsToAdd, { item: formValues.item }]);
  };
  return (
    <div>
      <h3 className="pageTitle">Invite a Person</h3>

      <h3 className="pageTitle">Current Guests</h3>
      {guests.map((guest) => {
        return <p>{guest.username}</p>;
      })}
      <form>
        <label>
          username:
          <input
            type="text"
            name="invite"
            value={formValues.invite}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleInviteUser} className="button">
          Invite
        </button>
        <hr />
        <h3 className="pageTitle">Add Items</h3>

        <label>
          Item Name:
          <input
            type="text"
            name="item"
            value={formValues.item}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddItem} className="button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Organizer;
