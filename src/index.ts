import './style.scss';
//import { Gallery } from './app/components/mainGallery/mainGallery';
import { filter } from './app/components/filters/filters';
import { HeaderView } from './app/components/header/view';
//import { HeaderGallery } from './app/components/headerGallery/headerGalery';
import { AllGallery } from './app/components/gallery/gallery';
const body = document.body;
const header = new HeaderView();
//const gallery = new Gallery();

body.append(header.headerElement);

filter.createAll();
body.prepend(header.headerElement);

const allProducts = document.querySelector('.main-page__all-products') as HTMLElement;
new AllGallery(allProducts);
//new HeaderGallery(allProducts);
//allProducts.append(gallery.galleryElement);
