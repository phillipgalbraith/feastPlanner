import axios from "axios";

export const getNewFeastItem = (e, myFeastData, userData, userLoggedIn) => {
    
    const currentFeast = myFeastData.find( p => p.meetingId === e.target.name)
    const currPotIdx = myFeastData.indexOf(currentFeast);
    const currentUser = currentFeast.people.find( p => p.username === userLoggedIn)
    const currUsrIdx = currentFeast.people.indexOf(currentUser);
    const newFeastData = [...myFeastData];
    const selectedItem = userData.find( i => i.id === e.target.name).item;
    newFeastData[currPotIdx]["people"][currUsrIdx]["item"] = selectedItem;
    
    
    axios.post('https://reqres.in/api/users', newFeastData)
    .then(function (response) {
      console.log({response});
    })
    .catch(function (error) {
      console.log({error});
    });

    return newFeastData
}

export const getNewFeastConfirmed = (e, myFeastData, userData, userLoggedIn) => {
  const currentFeast = myFeastData.find( p => p.meetingId === e.target.name)
  const currPotIdx = myFeastData.indexOf(currentFeast);
  const currentUser = currentFeast.people.find( p => p.username === userLoggedIn)
  const currUsrIdx = currentFeast.people.indexOf(currentUser);
  let newFeastData = [...myFeastData];
  const currConfirmed = newFeastData[currPotIdx]["people"][currUsrIdx]["confirmed"];
  newFeastData[currPotIdx]["people"][currUsrIdx]["confirmed"] = !currConfirmed;

  axios.post('https://reqres.in/api/users', newFeastData)
  .then(function (response) {
    console.log({response});
  })
  .catch(function (error) {
    console.log({error});
  });

  return newFeastData
}