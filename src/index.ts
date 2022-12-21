import './style.scss';
import { inputRangeAndNumbArr } from './app/range';
import { gallery } from './app/mainGallery';
import { filter } from './app/filters/filters';
import { ItemPageView as ItemPage } from './app/components/itemPage/view';
inputRangeAndNumbArr.forEach((el) => {
  el.rangeToNumb();
  el.numbToRange();
});
gallery.createGallery();
filter.createAll();

// TEST PURPOSES, DELETE THIS LATER

import { products } from './app/products';
const page = new ItemPage(products[1]);
(document.querySelector('header') as HTMLElement).after(page.container);
