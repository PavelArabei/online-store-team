import './style.css';
import { inputRangeAndNumbArr } from './app/range';
import { gallery } from './app/mainGallery';
import { filter } from './app/filters/filters';

inputRangeAndNumbArr.forEach((el) => {
  el.rangeToNumb();
  el.numbToRange();
});
gallery.createGallery();
filter.createAll();
