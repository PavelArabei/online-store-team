import './style.scss';
import { HeaderView } from './app/components/header/view';
import { SearchPage } from './app/pages/searchPage';

const body = document.body;
const header = new HeaderView();
const searchPage = new SearchPage();

body.prepend(header.headerElement, searchPage.container);
