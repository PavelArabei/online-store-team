import { create } from '../../helpers/helpFunction';
export class SubCategory {
  body: HTMLElement;
  arr: string[];
  str: string;
  _inputCategoryArr: string[];
  inputsArr: HTMLInputElement[];
  constructor(body: HTMLElement, arr: string[], str: string) {
    this.body = body;
    this.arr = arr;
    this.str = str;
    this._inputCategoryArr = [];
    this.inputsArr = [];
    this.isLocalStorageTrue();
  }
  isLocalStorageTrue() {
    if (localStorage.getItem(`mainObj`)) {
      if (this.str === 'Category') {
        this._inputCategoryArr = JSON.parse(localStorage.getItem(`mainObj`) as string).category;
      }
      if (this.str === 'Brand') {
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
      ) as HTMLInputElement;
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
      this.inputsArr.push(inputItem);
      create('label', 'cub-category__label', inputBody, `${this.arr[i]}`, ['for', `${this.arr[i]}`]);
    }
  }
}
