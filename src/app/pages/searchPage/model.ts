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

  funcSort(e: Event): void {
    const targetText = isHTMLElem(e.target);
    if (targetText.textContent === 'no-Sort') {
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.id - b.id);
    } else if (targetText.textContent === 'price') {
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.price - b.price);
    } else if (targetText.textContent === 'rating') {
      this.product.sort((a: ProductInterface, b: ProductInterface) => a.rating - b.rating);
    }

    this.funcCreate();
  }

  funcSortDirection(e: Event): void {
    console.log(isHTMLElem(e.target).classList.toggle('mirror'));
    this.product.reverse();
    this.funcCreate();
  }

  funcCreate(): void {
    const newProducts = this.productFilter(this.product);
    this.gallery.galleryItems.changeGallery(newProducts);
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
          e.description.includes(search) ||
          e.title.includes(search) ||
          e.brand.includes(search) ||
          e.category.includes(search) ||
          String(e.rating).includes(search) ||
          String(e.stock).includes(search)
        );
      });
    }

    const minMaxPrice: number[] = [];
    const minMaxStock: number[] = [];
    for (let i = 0; i < newProducts.length; i++) {
      minMaxPrice.push(newProducts[i].price);
      minMaxStock.push(newProducts[i].stock);
    }
    //const imputMinValue = this.filters.filters.rangePrice.inputValueArr;
    //console.log(imputMinValue);
    //console.log(String(Math.min(...minMaxPrice)));

    //const imputNumMin = this.filters.filters.rangePrice.inputFunc.numInput[0] as HTMLInputElement;
    //const imputNumMax = this.filters.filters.rangePrice.inputFunc.numInput[1] as HTMLInputElement;
    //const imputRangeLeft = this.filters.filters.rangePrice.inputFunc.inputRangeLeft as HTMLInputElement;
    //const imputRangeRight = this.filters.filters.rangePrice.inputFunc.inputRangeRight as HTMLInputElement;
    //console.log(imputRangeLeft, imputRangeRight);
    //imputRangeLeft.value = String(Math.min(...minMaxPrice));
    //imputRangeRight.value = String(Math.max(...minMaxPrice));
    //imputNumMin.value = String(Math.min(...minMaxPrice));
    //imputNumMax.value = String(Math.max(...minMaxPrice));
    //this.filters.filters.rangePrice.inputFunc.rangeToNumb();
    //const price = [String(Math.min(...minMaxPrice)), String(Math.max(...minMaxPrice))];
    //const stock = [String(Math.min(...minMaxStock)), String(Math.max(...minMaxStock))];
    ////this.mainObj.rangePrice = price;
    //console.log(this.mainObj.rangePrice);

    return newProducts;
  }
}
