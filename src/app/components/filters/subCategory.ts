import { create } from '../../helpers/helpFunction';
export class SubCategory {
  body: HTMLElement;
  arr: string[];
  str: string;
  _inputCategoryArr: string[];
  constructor(body: HTMLElement, arr: string[], str: string) {
    this.body = body;
    this.arr = arr;
    this.str = str;
    this._inputCategoryArr = [];
    this.isLocalStorageTrue();
  }
  isLocalStorageTrue() {
    if (localStorage.getItem(`mainObj`)) {
      if (this.str === 'Category') {
        // console.log(JSON.parse(localStorage.getItem(`mainObj`) as string).category);
        this._inputCategoryArr = JSON.parse(localStorage.getItem(`mainObj`) as string).category;
      }
      if (this.str === 'Brand') {
        // console.log(JSON.parse(localStorage.getItem(`mainObj`) as string).brand);
        this._inputCategoryArr = JSON.parse(localStorage.getItem(`mainObj`) as string).brand;
      }
    }
  }

  createAll(): void {
    const cubCategory = create('div', 'cub-category', this.body);
    const title = create('h2', 'cub-category__title', cubCategory, `${this.str}`);
    title.classList.add('subtitle');
    for (let i = 0; i < this.arr.length; i++) {
      const inputBody = create('div', 'cub-category__input-cb', cubCategory);
      const inputItem = create(
        'input',
        'cub-category__input',
        inputBody,
        undefined,
        ['type', 'checkbox'],
        ['id', `${this.arr[i]}`]
      );
      //console.log(this._inputCategoryArr);

      if (this._inputCategoryArr.indexOf(this.arr[i]) >= 0) {
        (inputItem as HTMLInputElement).checked = true;
      }

      inputItem.addEventListener('input', () => {
        if (this._inputCategoryArr.includes(this.arr[i])) {
          this._inputCategoryArr.splice(this._inputCategoryArr.indexOf(this.arr[i]), 1);
        } else {
          this._inputCategoryArr.push(this.arr[i]);
        }
      });

      create('label', 'cub-category__label', inputBody, `${this.arr[i]}`, ['for', `${this.arr[i]}`]);
    }
  }
}
