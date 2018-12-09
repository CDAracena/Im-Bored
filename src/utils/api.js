export const fetchBoredData = (recreationType) => {
  return fetch(`http://www.boredapi.com/api/activity?type=${recreationType}`)
  .then(response => response.json())
  .catch(err => console.log(err))
}
