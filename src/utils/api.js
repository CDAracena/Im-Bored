export const fetchBoredData = (recreationType) => {
  let apiDataLink;
  if (recreationType === "random"){
    apiDataLink = 'https://www.boredapi.com/api/activity/'
  } else {
    apiDataLink = `https://www.boredapi.com/api/activity?type=${recreationType}`
  }
  return fetch(apiDataLink)
  .then(response => response.json())
  .catch(err => console.log(err))
}


  export const postSuggestion = (activity, category, participants) => {
    return fetch('https://www.boredapi.com/api/suggestion', {
       method: 'POST',
       body: JSON.stringify({
         activity: activity,
         type: category,
         participants: participants
       }),
       headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
     })
     .then(res => res.json())
     .then(data => data)
     .catch(err => console.log(err))
  }
