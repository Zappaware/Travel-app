
function travelTime () {
    const convertDateFormat = (string) => {
        let info = string.split('-').reverse().join(',');
        return info;
    }
    
    let initialDay = document.getElementById('departDate').value;
    let finalDay = document.getElementById('leaveDate').value;

    const convertInitialDate = convertDateFormat(initialDay);
    const convertFinalDate =  convertDateFormat(finalDay);

    let dateOne = new Date(convertInitialDate);
    let dateTwo = new Date(convertFinalDate);
    
    let differenceTime = dateTwo.getTime() - dateOne.getTime(); 
    
    let differenceDays= differenceTime / (1000 * 3600 * 24);

    console.log ( `The travel is for ${Math.round(differenceDays)} days.`);

    let dateResult = document.getElementById('dateTime');

    dateResult.innerHTML = `The travel is for ${Math.round(differenceDays)} days.`;

    let weatherSection = document.querySelector('.results');

    weatherSection.appendChild(dateResult);
    
}

export {travelTime}