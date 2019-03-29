//Create a function that getsHeaders from the token, pass those headers to make post requests to items and cards
//if headers don't exist just send request as content-type:'application json'


export const signInUser = (creds) => {
  return fetch(`${process.env.REACT_APP_RAILS_LOCAL}/api/auth/sign_in`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(creds)
})
}

export const registerNewUser = (creds) => {
  return fetch(`${process.env.REACT_APP_RAILS_LOCAL}/api/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
}


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

  export const fetchGeekJoke = () => {
    return fetch('https://geek-jokes.sameerkumar.website/api')
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
  }

export const fetchDadJoke = (searchTerm) => {
  let apiLink = '';

  if (searchTerm) {
    apiLink = `https://icanhazdadjoke.com/search?term=${searchTerm}`
  } else {
    apiLink = "https://icanhazdadjoke.com/"
  }

  return fetch(apiLink, {
    method: 'GET',
    headers: {
      "Accept": 'application/json',
      "User-Agent": "My Library (https://github.com/CDAracena/Im-Bored)"
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

export const postDadJoke = (joke) => {
  return fetch('https://icanhazdadjoke/submit', {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "User-Agent": "My Library (https://github.com/CDAracena/Im-Bored)"
    },
    body: JSON.stringify({
      joke: joke
    })
  }).then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

export const fetchCorporateBS = () => {
  return fetch (process.env.REACT_APP_PROXY_URL + 'https://corporatebs-generator.sameerkumar.website/', {
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}

export const fetchAdvice = (searchTerm) => {
  let apiLink = '';
  if (searchTerm){
    apiLink = `https://api.adviceslip.com/advice/search/${searchTerm}`
  } else {
    apiLink = 'https://api.adviceslip.com/advice'
  }
  return fetch(apiLink)
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))
}

export const fetchKanyeQuote = () => {
  return fetch('https://api.kanye.rest')
  .then(res => res.json())
  .then(data => data)
  .catch(e => console.log(e))
}

export const fetchAnimalFact = (animalType) => {
  return fetch(`${process.env.REACT_APP_PROXY_URL}https://fact.birb.pw/api/v1/${animalType}`)
  .then(res => res.json())
  .then(data => data)
  .catch(error => console.log(error))
}
