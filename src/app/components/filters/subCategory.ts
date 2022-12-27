import { create } from '../../helpers/helpFunction';
export class SubCategory {
  body: HTMLElement;
  arr: string[];
  _inputCategoryArr: string[];
  constructor(body: HTMLElement, arr: string[]) {
    this.body = body;
    this.arr = arr;
    this._inputCategoryArr = [];
  }
  createAll(): void {
    const cubCategory = create('div', 'cub-category', this.body);
    const title = create('h2', 'cub-category__title', cubCategory, 'Category');
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
