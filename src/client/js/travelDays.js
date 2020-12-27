//Function to display the duration of the travel in days.

function travelTime () {
    //Formating function for the input date.
    const convertDateFormat = (string) => {
        let info = string.split('-').reverse().join(',');
        return info;
    }
    
    //store values for the dates taken in the input.
    let initialDay = document.getElementById('departDate').value;
    let finalDay = document.getElementById('leaveDate').value;

    /*Right here we start by converting the raw dates, then using th new Date method we take the format needed to the getTime function 
    and finally we make the arimetic operation with the conversion to display an alert in days*/
    const convertInitialDate = convertDateFormat(initialDay);
    const convertFinalDate =  convertDateFormat(finalDay);

    let dateOne = new Date(convertInitialDate);
    let dateTwo = new Date(convertFinalDate);
    
    let differenceTime = dateTwo.getTime() - dateOne.getTime(); 
    
    let differenceDays= differenceTime / (1000 * 3600 * 24);

    // I like to display an alert on the web page.
    console.log (alert(`The travel is ${Math.round(differenceDays)} days long.`));    
}

export {travelTime}