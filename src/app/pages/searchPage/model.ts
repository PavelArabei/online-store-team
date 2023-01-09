import { ProductInterface } from '../../interfaces/interfaces';
import { Gallery } from '../../components/gallery/gallery';
import { products } from '../../data/products';
import { isHTMLElem } from '../../helpers/helpFunction';
import { Filters } from '../../components/filters/filters';
interface ObjectValue {
  [key: string]: string[] | string;
}

export class SearchModel {
  mainObj: ObjectValue;
  mainPage: HTMLElement;
  gallery: Gallery;
  product: ProductInterface[];
  filters: Filters;

  constructor(mainObj: ObjectValue, mainPage: HTMLElement, gallery: Gallery, filters: Filters) {
    this.productFilter;
    this.mainObj = mainObj;
    this.mainPage = mainPage;
    this.funcCreate;
    this.productFilter;
    this.gallery = gallery;
    this.product = products;
    this.filters = filters;
  }
  resetFunction() {
    console.log(this.mainObj);
    (this.mainObj.brand as Array<string>).splice(0);
    (this.mainObj.category as Array<string>).splice(0);

    const inputCategoryArr = this.filters.filters.subCategory.inputsArr;
    const inputBrandArr = this.filters.filters.subBrand.inputsArr;
    const allInputsCheck = inputCategoryArr.concat(inputBrandArr);
    for (let i = 0; i < allInputsCheck.length; i++) {
      allInputsCheck[i].checked = false;
    }

    (this.mainObj.rangePrice as Array<string>)[0] = '0';
    (this.mainObj.rangePrice as Array<string>)[1] = '5041';
    (this.mainObj.rangeStock as Array<string>)[1] = '0';
    (this.mainObj.rangeStock as Array<string>)[1] = '50';
    this.filters.search.container.value = '';
    const buttonSort = this.gallery.header.sortButtonArr[0];
    const mainButtonSort = this.gallery.header.sortButtonText;
    mainButtonSort.textContent = 'no-Sort';

    this.sortWithoutRender(buttonSort);
    const buttonSortDirection = this.gallery.header.sortDirection;
    localStorage.removeItem('sort');
    buttonSortDirection.classList.remove('mirror');
    localStorage.removeItem('bigItems');
    this.gallery.galleryItemsCntainer.style.gridTemplateColumns = '1fr 1fr 1fr';
    this.funcCreate();

    //
  }

  funcSort(button: HTMLElement): void {
    this.sortWithoutRender(button);
    this.funcCreate();
  }
  sortWithoutRender(button: HTMLElement) {
    if (button.textContent === 'no-Sort') {
      localStorage.setItem('sortButton', 'no-Sort');
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.id - b.id);
    } else if (button.textContent === 'price') {
      localStorage.setItem('sortButton', 'price');
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.price - b.price);
    } else if (button.textContent === 'rating') {
      localStorage.setItem('sortButton', 'rating');
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.rating - b.rating);
    }
  }

  funcSortDirection(img: HTMLElement): void {
    this.sortDirectionsortWithoutRender(img);
    this.funcCreate();
  }
  sortDirectionsortWithoutRender(img: HTMLElement) {
    localStorage.setItem('sort', 'on');
    const isOn = img.className;
    if (isOn !== `main-page__sort-direction`) {
      localStorage.removeItem('sort');
    }
    img.classList.toggle('mirror');
    this.product.reverse();
  }
  changeGrid(img: HTMLElement, img2: HTMLElement) {
    const type = img.getAttribute('configuration');
    img.style.filter = 'invert(42%) sepia(77%) saturate(1822%) hue-rotate(352deg) brightness(102%) contrast(108%)';
    img2.style.filter = 'none';
    if (type === 'small') {
      this.gallery.galleryItemsCntainer.style.gridTemplateColumns = '1fr 1fr 1fr';
      localStorage.removeItem('bigItems');
    } else if (type === 'big') {
      this.gallery.galleryItemsCntainer.style.gridTemplateColumns = '1fr 1fr';
      localStorage.setItem('bigItems', 'on');
      //img.style.filter = 'invert(42%) sepia(77%) saturate(1822%) hue-rotate(352deg) brightness(102%) contrast(108%)';
    }
  }

  funcCreate(): void {
    if (localStorage.getItem('bigItems')) {
      this.gallery.galleryItemsCntainer.style.gridTemplateColumns = '1fr 1fr';
    }

    localStorage.setItem('mainObj', JSON.stringify(this.mainObj));
    const newProducts = this.productFilter(this.product);

    this.gallery.galleryItems.changeGallery(newProducts);
    if (newProducts.length === 0) {
      console.log(this.gallery.galleryItemsCntainer);
      this.gallery.galleryItemsCntainer.textContent = 'No results';
      this.gallery.galleryItemsCntainer.classList.add('big-text');
    } else {
      this.gallery.galleryItemsCntainer.classList.remove('big-text');
    }
    console.log(this.gallery.galleryItemsCntainer);
    const searchResults = this.gallery.header.resultNum;
    searchResults.textContent = `${newProducts.length}`;
  }

  productFilter(products: ProductInterface[]): ProductInterface[] {
    let newProducts = JSON.parse(JSON.stringify(products));
    if (this.mainObj.brand.length > 0) {
      newProducts = newProducts.filter(
        (e: ProductInterface) => e.brand === this.mainObj.brand[this.mainObj.brand.indexOf(e.brand)]
      );
    }
    if (this.mainObj.category.length > 0) {
      newProducts = newProducts.filter(
        (e: ProductInterface) => e.category === this.mainObj.category[this.mainObj.category.indexOf(e.category)]
      );
    }

    newProducts = newProducts.filter(
      (e: ProductInterface) =>
        e.price >= parseInt(this.mainObj.rangePrice[0]) && e.price <= parseInt(this.mainObj.rangePrice[1])
    );

    newProducts = newProducts.filter(
      (e: ProductInterface) =>
        e.stock >= parseInt(this.mainObj.rangeStock[0]) && e.stock <= parseInt(this.mainObj.rangeStock[1])
    );

    const search = `${this.mainObj.search}`;
    if (this.mainObj.search.length > 0) {
      newProducts = newProducts.filter((e: ProductInterface) => {
        return (
          e.description.toLowerCase().includes(search.toLowerCase()) ||
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.brand.toLowerCase().includes(search.toLowerCase()) ||
          e.category.toLowerCase().includes(search.toLowerCase()) ||
          String(e.rating).toLowerCase().includes(search.toLowerCase()) ||
          String(e.stock).toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    const minMaxPrice: number[] = [];
    const minMaxStock: number[] = [];
    //const minMaxPriceAllProducts: number[] = [];
    //const minMaxStockAllProducts: number[] = [];
    for (let i = 0; i < newProducts.length; i++) {
      minMaxPrice.push(newProducts[i].price);
      minMaxStock.push(newProducts[i].stock);
      //minMaxPriceAllProducts.push(products[i].price);
      // minMaxStockAllProducts.push(products[i].stock);
    }

    const inputFuncPrice = this.filters.filters.rangePrice.inputFunc;
    const inputRangeLeft = inputFuncPrice.inputRangeLeft;
    const inputRangeRight = inputFuncPrice.inputRangeRight;
    const inputNumLeft = inputFuncPrice.priceInputLeft;
    const inputNumRight = inputFuncPrice.priceInputRight;
    const progress = inputFuncPrice.progress;
    const gap = 150;
    const inputFuncStoke = this.filters.filters.rangeStock.inputFunc;
    const inputRangeLeftTwo = inputFuncStoke.inputRangeLeft;
    const inputRangeRightTwo = inputFuncStoke.inputRangeRight;
    const inputNumLeftTwo = inputFuncStoke.priceInputLeft;
    const inputNumRightTwo = inputFuncStoke.priceInputRight;
    const progressTwo = inputFuncStoke.progress;
    const gapTwo = 3;

    let PriceMin = Math.min(...minMaxPrice);
    let PriceMax = Math.max(...minMaxPrice);
    if (newProducts.length > 20) {
      PriceMin = 0;
      PriceMax = 5041;
    }
    let StockMin = Math.min(...minMaxStock);
    let StockMax = Math.max(...minMaxStock);
    if (newProducts.length > 20) {
      StockMin = 0;
      StockMax = 50;
    }

    function disabledInputCategory(arr: HTMLInputElement[], category: string) {
      arr.forEach((input) => {
        const resArr: ProductInterface[] = [];
        newProducts.forEach((el: ProductInterface) => {
          if (category === 'category') {
            if (el.category === input.id) resArr.push(el);
          }
          if (category === 'brand') {
            if (el.brand === input.id) resArr.push(el);
          }
        });
        const inputLabel = isHTMLElem(input.nextSibling);
        if (resArr.length === 0) {
          input.style.opacity = '0.4';
          inputLabel.style.opacity = '0.4';
        } else {
          input.style.opacity = '1';
          inputLabel.style.opacity = '1';
        }
      });
    }
    const inputCategoryArr = this.filters.filters.subCategory.inputsArr;
    const inputBrandArr = this.filters.filters.subBrand.inputsArr;
    disabledInputCategory(inputCategoryArr, 'category');
    disabledInputCategory(inputBrandArr, 'brand');

    if (PriceMin !== Infinity && PriceMin !== Infinity) {
      this.inputRangetoNumb(
        PriceMin,
        PriceMax,
        inputRangeLeft,
        inputRangeRight,
        inputNumLeft,
        inputNumRight,
        progress,
        gap
      );
      this.inputRangetoNumb(
        StockMin,
        StockMax,
        inputRangeLeftTwo,
        inputRangeRightTwo,
        inputNumLeftTwo,
        inputNumRightTwo,
        progressTwo,
        gapTwo
      );
    }

    return newProducts;
  }

  inputRangetoNumb(
    minVal: number,
    maxVal: number,
    inputRangeLeft: HTMLInputElement,
    inputRangeRight: HTMLInputElement,
    priceInputLeft: HTMLInputElement,
    priceInputRight: HTMLInputElement,
    progress: HTMLElement,
    priceGap: number
  ) {
    inputRangeLeft.value = `${minVal}`;
    inputRangeRight.value = `${maxVal}`;
    priceInputLeft.value = `${minVal}`;
    priceInputRight.value = `${maxVal}`;
    progress.style.left = (minVal / parseInt(inputRangeLeft.max)) * 100 + '%';
    progress.style.right = 100 - ((maxVal - priceGap / 4) / parseInt(inputRangeRight.max)) * 100 + '%';
    //}
  }
}
