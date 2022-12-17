import './style.css';
import { inputRangeAndNumbArr } from './app/range';
inputRangeAndNumbArr.forEach((el) => {
  el.rangeToNumb();
  el.numbToRange();
});
