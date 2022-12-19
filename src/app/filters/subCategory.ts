import { create } from '../helpFunction';
export class SubCategory {
  body: HTMLElement;
  arr: string[];
  constructor(body: HTMLElement, arr: string[]) {
    this.body = body;
    this.arr = arr;
  }
  createAll(): void {
    const cubCategory = create('div', 'cub-category', this.body);
    const title = create('h2', 'cub-category_title', cubCategory, 'Category');
    title.classList.add('subtitle');
    for (let i = 0; i < this.arr.length; i++) {
      const inputBody = create('div', 'cub-category_input-cb', cubCategory);
      create('input', 'cub-category_input', inputBody, undefined, ['type', 'checkbox'], ['id', `${this.arr[i]}`]);
      create('label', 'cub-category_label', inputBody, `${this.arr[i]}`, ['for', `${this.arr[i]}`]);
    }
  }
}
