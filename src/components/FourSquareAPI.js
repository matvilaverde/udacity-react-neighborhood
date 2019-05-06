const CLIENT_ID = 'JMMI3TQMXGFIN3ZYY5NN4SEGLG0QD31ZRSOUAWUT0FU2KCUF'
const CLIENT_SECRET = '2O0XX4VTVFFYVDKT3KFXXXP0BNUS2YR2ZSDHULMLTF4JSLJ4'
const api = "https://api.foursquare.com/v2/venues/"
const query = '%22rock%20bar%22'
const near = 'New York, USA'
const todaysData = '20190506'

export const getSearch = () => {
    // Fetches Rock bars in New York City
    return fetch(api + 'search?query=' + query + '&near=' + near + '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET + '&v=' + todaysData)
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch( error => {
      window.alert('An error ocorred: ' + error)
      console.log(error);
    })
}

export const getInfo = (venueID) => {
  return fetch(api + venueID + '?client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET + '&v=' + todaysData)
    .then(res => res.json())
    .then(data => data.response.venue)
    .catch( error => {
      window.alert('An error ocorred: ' + error)
      console.log(error);
    })
}