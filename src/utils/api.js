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
