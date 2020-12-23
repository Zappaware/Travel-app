const geoNamesApiUser = process.env.API_USER;
const weatherbitApiKey = process.env.API_WEATHERBIT_KEY;
const pixaBayApiKey = process.env.API_PIXABAY_KEY;

const geoNamesbaseUrl = 'http://api.geonames.org/';
const userQuery = 'postalCodeSearchJSON?';
const weatherbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayBaseUrl = 'https://pixabay.com/api/?';


function handleSubmit(event) {
    event.preventDefault()

//Starting point to the GeoNames platform

 console.log("::: GeoNames Form Submitted :::");

 //function to invert date to the format for weatherbit
 const convertDateFormat = (string) => {
    let info = string.split('-').reverse().join('-');
    return info;
}


//Async function to hit the GET request in the Geo Names API
const geoNamesRequest = async (baseUrl, query, userInput, apiUser) => {
    const response = await fetch(baseUrl + query + 'placename=' + userInput + '&username=' + apiUser);

    try {
        const apiResponse = await response.json();
        const latitude = apiResponse.postalCodes[0].lat;
        const longitud = apiResponse.postalCodes[0].lng;
        const placeName = apiResponse.postalCodes[0].placeName;
        //console.log(apiResponse);
        console.log(latitude);
        console.log(longitud);
        console.log(placeName);
        return [latitude, longitud, placeName]
    } catch (error) {
        console.log('error', error);
    }
};

//Async function to hit the GET request in the WeatherBit API
const weatherBitRequest = async (baseUrl, key, latitude, longitud, city) => {
    const response = await fetch(baseUrl + '&key=' + key + '&lat=' + latitude + '&lon=' + longitud + '&city='+ city);

    try {
        const apiResponse = await response.json();
        console.log(apiResponse);
        let date = document.getElementById('date').value;
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
        console.log(dataInfo);
        return dataInfo
    } catch (error) {
        console.log('error', error);
    }
};

//Async function to hit the GET request in the Pixabay API
const pixaBayRequest = async (baseUrl, key, location) => {
    const response = await fetch(baseUrl + 'key=' + key + '&q=' + location + '&image_type=photo&orientation=horizontal' );

    try {
        const apiResponse = await response.json();
        console.log(apiResponse);
        let image = document.getElementById('image').src = apiResponse.hits[0].largeImageURL;
        return apiResponse
    } catch (error) {
        console.log('error', error);
    }
};

//Async function to POST data in the express server

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
        console.log('error', error);
    }
};

//Async function to render data on the app
const renderData = async (url) => {
    const getData = await fetch(url);

    try {
        const allData = await getData.json();
        let allDataKeys = ['Description', 'Temperature', 'Min/Temp','Max/Temp','Snow'];
        const allDataValues = Object.values(allData);
        const card = document.querySelector('.card');
        const fatherDiv = document.createElement('div');
        fatherDiv.setAttribute('class', 'apiData');
        let divList = document.createElement('ul');
        divList.setAttribute('class', 'dataList');
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
        fatherDiv.appendChild(divList);
        card.appendChild(fatherDiv);
        return card
    } catch (error){
        console.log('error', error);

    }
}


    let location = document.getElementById('place').value;    
    
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