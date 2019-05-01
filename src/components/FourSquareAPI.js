const CLIENT_ID = 'JMMI3TQMXGFIN3ZYY5NN4SEGLG0QD31ZRSOUAWUT0FU2KCUF'
const CLIENT_SECRET = 'WQNXVXEP4VIACTXQQ4PLYJIRR4EYKZRYHXF0VNS3IWTQBODW'
const api = "https://api.foursquare.com/v2/venues/search?"
let query = '%22rock%20bar%22';
let near = 'Belo Horizonte, MG, Brazil';
let todaysData = '20190430'

//https://api.foursquare.com/v2/venues/search?query=%22rock%20bar%22&near=%22Belo%20Horizonte%22&client_id=JMMI3TQMXGFIN3ZYY5NN4SEGLG0QD31ZRSOUAWUT0FU2KCUF&client_secret=WQNXVXEP4VIACTXQQ4PLYJIRR4EYKZRYHXF0VNS3IWTQBODW&v=20190430
//`${api}query=${query}&near=${near}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20190430`
//api + 'query=' + query + '&near=' + near + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + todaysData
 export const get = () => {
    fetch(api + 'query=' + query + '&near=' + near + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + todaysData)
     .then(res => res.json())
     .then(data => data.response.venues)
    .catch( error => {
        window.alert('An error ocorred: ' + error)
        console.log(error);
    })
}
