import { handleSubmit } from './js/formHandler.js'
import './styles/styles.scss'
import './styles/responsive.scss'
import img from './media/plane.jpg';

let srcImage = document.getElementById('image');

srcImage.src= img;

export {
        handleSubmit
   }