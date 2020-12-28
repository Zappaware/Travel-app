//All global variables goes here.
const geoNamesApiUser = process.env.API_USER;
const weatherbitApiKey = process.env.API_WEATHERBIT_KEY;
const pixaBayApiKey = process.env.API_PIXABAY_KEY;

const geoNamesbaseUrl = 'http://api.geonames.org/';
const userQuery = 'postalCodeSearchJSON?';
const weatherbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayBaseUrl = 'https://pixabay.com/api/?';


const handleSubmit = (event) => {
    event.preventDefault()



 //function to invert date to the format for weatherbit API.
 const convertDateFormat = (string) => {
    let info = string.split('-').reverse().join('-');
    return info;
}

//Starting point to the GeoNames platform

//Async function to hit the GET request in the GeoNames API.
const geoNamesRequest = async (baseUrl, query, userInput, apiUser) => {
    const response = await fetch(baseUrl + query + 'placename=' + userInput + '&username=' + apiUser);
//we make a request and this function takes the values returned object.
    try {
        const apiResponse = await response.json();
        const latitude = apiResponse.postalCodes[0].lat;
        const longitud = apiResponse.postalCodes[0].lng;
        const placeName = apiResponse.postalCodes[0].placeName;
        return [latitude, longitud, placeName]
    } catch (error) {
        alert('Place and forecast not found. Please check name and date of your travel')
        console.log('error', error);
    }
};

//Async function to hit the GET request in the WeatherBit API.
const weatherBitRequest = async (baseUrl, key, latitude, longitud, city) => {
    const response = await fetch(baseUrl + '&key=' + key + '&lat=' + latitude + '&lon=' + longitud + '&city='+ city);
//Right here we take more values for the travel app to post it in the server, within an array.
    try {
        const apiResponse = await response.json();
        let date = document.getElementById('departDate').value;
        let dateFormat = convertDateFormat(date);
        let dataInfo = [];
        for (let i=0; i < apiResponse.data.length; i++) { 
            if (apiResponse.data[i].valid_date === dateFormat) {
                const weatherData = apiResponse.data[i].weather.description;
                const tempData = apiResponse.data[i].temp;
                const minTempData = apiResponse.data[i].low_temp;
                const maxTempData = apiResponse.data[i].max_temp;
                const snowData = apiResponse.data[i].snow;
                dataInfo.push(weatherData, tempData, minTempData, maxTempData, snowData);
            }
        }
        return dataInfo
    } catch (error) {
        alert('Place and forecast not found. Please check name and date of your travel')
        console.log('error', error);
    }
};

//Async function to hit the GET request in the Pixabay API.
const pixaBayRequest = async (baseUrl, key, location) => {
    const response = await fetch(baseUrl + 'key=' + key + '&q=' + location + '&image_type=photo&orientation=horizontal' );

    try {
        const apiResponse = await response.json();
        let image = document.getElementById('image').src = apiResponse.hits[0].largeImageURL;
        return apiResponse
    } catch (error) {
        alert('Place and forecast not found. Please check name and date of your travel')
        console.log('error', error);
    }
};

//Async function to POST data in the Express server.

const postData = async (url='', data = {})=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData
    } catch(error) {
        alert('Place and forecast not found. Please check name and date of your travel')
        console.log('error', error);
    }
};

//Async function to render data on the app
const renderData = async (url) => {
    const getData = await fetch(url);
/*we make the request in the upper variable and then we try this differents steps to create an array for the rendered data, 
then we use the Object.values property to store the values and finally we use some conditional statements with the DOM for rendering the data*/ 
    try {
        const allData = await getData.json();
        let allDataKeys = ['Description', 'Temperature', 'Min/Temp','Max/Temp','Snow'];
        const allDataValues = Object.values(allData);
        const card = document.querySelector('.card');
        let divList = document.getElementById('dataList');
            while (divList.hasChildNodes()) {
                divList.removeChild(divList.childNodes[0]);
            }
        if (divList.hasChildNodes() ===false){
            for (let i = 0; i < allDataValues.length; i++) { 
                let childDiv = document.createElement('li');
                childDiv.setAttribute('class', 'info');
                if (i === 0 || i === 4){
                childDiv.innerHTML = `${allDataKeys[i]}: ${allDataValues[i]}`;         
                divList.appendChild(childDiv);
                } else {
                childDiv.innerHTML = `${allDataKeys[i]}: ${allDataValues[i]} °`;         
                divList.appendChild(childDiv);
                }
            }
        }
        card.appendChild(divList);
        return card
    } catch (error){
        alert('Place and forecast not found. Please check name and date of your travel')
        console.log('error', error);

    }
}

//Right herre we create the location variable for the firs function requested.
let location = document.getElementById('place').value;    
   
    
    //Starting point to the chaining promises of this module.
    geoNamesRequest(geoNamesbaseUrl, userQuery, location, geoNamesApiUser)
    .then(([latitude, longitud,city])=>{
        weatherBitRequest(weatherbitBaseUrl, weatherbitApiKey, latitude, longitud, city)
        .then((data)=>{
            postData('/add', {
                weatherData: data[0],
                tempData: data[1],
                minTempData: data[2],
                maxTempData: data[3],
                snowData: data[4],
            }).then(renderData('/all'));
    }); 

    pixaBayRequest( pixabayBaseUrl, pixaBayApiKey, location);
  })

}


export { handleSubmit }