import { create } from '../../helpers/helpFunction';
import { InputRangeAndNumb } from './range';
export class RangeCategory {
  body: HTMLElement;
  inputFunc: InputRangeAndNumb;

  inputValueArr: string[];
  constructor(body: HTMLElement) {
    this.body = body;
    this.inputValueArr = [`0`, `5041`];
    this.inputFunc = new InputRangeAndNumb([this.body, this.body], [this.body, this.body], this.body, 0);
  }
  createRangeAndInput(valueMax: number, valueStart: number, ValueEnd: number, gap: number, tittle: string): void {
    const rangeCategory = create('div', 'sub-range-category', this.body);
    const title = create('h2', 'sub-range-category__title', rangeCategory, `${tittle}`);
    title.classList.add('subtitle');

    const inputRnageContainer = create('div', 'sub-range-category__input-range', rangeCategory, undefined);
    const inputRangeLower = create(
      'input',
      'sub-range-category__range-lower',
      inputRnageContainer,
      undefined,
      ['min', '0'],
      ['max', `${valueMax}`],
      ['value', `${valueStart}`],
      ['type', 'range']
    );
    const inputRangeMax = create(
      'input',
      'sub-range-category__range-upper',
      inputRnageContainer,
      undefined,
      ['min', '0'],
      ['max', `${valueMax}`],
      ['value', `${ValueEnd}`],
      ['type', 'range']
    );
    const slider = create('div', 'sub-range-category__slider-range', rangeCategory);
    const sliderProgress = create('div', 'sub-range-category__slider-progress', slider);
    const inputNumbAll = create('div', 'sub-range-category__input-number-all', rangeCategory);
    const inputNumbContainer = create('div', 'sub-range-category__input-container', inputNumbAll);
    create('p', 'sub-range-category__input-text', inputNumbContainer, 'From');
    const inputNumLow = create(
      'input',
      'sub-range-category__input-number',
      inputNumbContainer,
      undefined,
      ['value', `${valueStart}`],
      ['type', 'number']
    );
    inputNumLow.classList.add('input-min');
    const inputNumbContainer2 = create('div', 'sub-range-category__input-container', inputNumbAll);
    create('p', 'sub-range-category__input-text', inputNumbContainer2, 'To');
    const inputNumMax = create(
      'input',
      'sub-range-category__input-number',
      inputNumbContainer2,
      undefined,
      ['value', `${ValueEnd}`],
      ['type', 'number']
    );
    const inputFunc = new InputRangeAndNumb(
      [inputRangeLower, inputRangeMax],
      [inputNumLow, inputNumMax],
      sliderProgress,
      gap
    );
    this.inputFunc = inputFunc;
    inputFunc.rangeAndNumb();
    [inputRangeLower, inputNumLow].forEach((e) =>
      e.addEventListener('input', () => {
        this.inputValueArr[0] = inputFunc.priceInputLeft.value;
      })
    );
    [inputRangeMax, inputNumMax].forEach((e) =>
      e.addEventListener('input', () => {
        this.inputValueArr[1] = inputFunc.priceInputRight.value;
      })
    );
  }
}
