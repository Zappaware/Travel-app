//First we import the functions, styles and images needed for the webpack configutration.
import { handleSubmit } from './js/formHandler.js'
import { travelTime} from './js/travelDays.js'
import './styles/styles.scss'
import './styles/responsive.scss'
import img from './media/plane.jpg';

let srcImage = document.getElementById('image');

srcImage.src= img;


//We add our event listeners in the generate button.
document.getElementById('generate').addEventListener('click', travelTime);

document.getElementById('generate').addEventListener('click', handleSubmit);

//we export our functions to the Client library for Webpack configuration.
export { 
    handleSubmit, 
    travelTime 
}