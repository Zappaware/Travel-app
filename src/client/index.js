import { handleSubmit } from './js/formHandler.js'
import { travelTime} from './js/travelDays.js'
import './styles/styles.scss'
import './styles/responsive.scss'
import img from './media/plane.jpg';

let srcImage = document.getElementById('image');

srcImage.src= img;


document.getElementById('generate').addEventListener('click', travelTime);

document.getElementById('generate').addEventListener('click', handleSubmit);


export { 
    handleSubmit, 
    travelTime 
}