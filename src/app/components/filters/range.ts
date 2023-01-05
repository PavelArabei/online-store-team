import { isHTMLElem } from '../../helpers/helpFunction';

interface InputRangeAndNumbInterface {
  rangeInput: NodeListOf<Element> | HTMLElement[];

  numInput: NodeListOf<Element> | HTMLElement[];

  progress: HTMLElement;

  priceGap: number;

  inputRangeLeft: HTMLInputElement;

  inputRangeRight: HTMLInputElement;

  priceInputLeft: HTMLInputElement;

  priceInputRight: HTMLInputElement;

  rangeToNumb(): void;

  numbToRange(): void;

  rangeAndNumb(): void;
}
export class InputRangeAndNumb implements InputRangeAndNumbInterface {
  rangeInput: NodeListOf<Element> | HTMLElement[];
  numInput: NodeListOf<Element> | HTMLElement[];
  progress: HTMLElement;
  priceGap: number;
  inputRangeLeft: HTMLInputElement;
  inputRangeRight: HTMLInputElement;
  priceInputLeft: HTMLInputElement;
  priceInputRight: HTMLInputElement;
  inputNumArr: string[];
  constructor(
    rangeInput: NodeListOf<Element> | HTMLElement[],
    numInput: NodeListOf<Element> | HTMLElement[],
    progress: HTMLElement,
    priceGap: number
  ) {
    this.rangeInput = rangeInput;
    this.numInput = numInput;
    this.progress = progress;
    this.priceGap = priceGap;
    this.inputRangeLeft = rangeInput[0] as HTMLInputElement;
    this.inputRangeRight = rangeInput[1] as HTMLInputElement;
    this.priceInputLeft = numInput[0] as HTMLInputElement;
    this.priceInputRight = numInput[1] as HTMLInputElement;
    this.inputNumArr = [];
  }
  numbToRange(): void {
    this.rangeInput.forEach((input) => {
      input.addEventListener('input', (e) => {
        const minVal: number = parseInt(this.inputRangeLeft.value),
          maxVal: number = parseInt(this.inputRangeRight.value);

        if (maxVal - minVal < this.priceGap) {
          if (isHTMLElem(e.target).className === 'sub-range-category__range-lower') {
            this.inputRangeLeft.value = `${maxVal - this.priceGap}`;
          } else {
            this.inputRangeRight.value = `${minVal + this.priceGap}`;
          }
        } else {
          this.priceInputLeft.value = `${minVal}`;
          this.priceInputRight.value = `${maxVal}`;
          this.progress.style.left = (minVal / parseInt(this.inputRangeLeft.max)) * 100 + '%';
          this.progress.style.right = 100 - (maxVal / parseInt(this.inputRangeRight.max)) * 100 + '%';
        }
      });
    });
  }
  rangeToNumb(): void {
    this.numInput.forEach((input) => {
      input.addEventListener('change', (e) => {
        const minVal: number = parseInt(this.priceInputLeft.value),
          maxVal: number = parseInt(this.priceInputRight.value);

        if (maxVal - minVal >= this.priceGap && maxVal <= 5041) {
          if (isHTMLElem(e.target).className === 'sub-range-category__input-number input-min') {
            this.inputRangeLeft.value = `${minVal}`;
            this.progress.style.left = (minVal / parseInt(this.inputRangeLeft.max)) * 100 + '%';
          } else {
            this.inputRangeRight.value = `${maxVal}`;
            this.progress.style.right = 100 - (maxVal / parseInt(this.inputRangeRight.max)) * 100 + '%';
          }
        }
      });
    });
  }
  rangeAndNumb(): void {
    this.numbToRange();
    this.rangeToNumb();
    this.inputNumArr = [this.priceInputLeft.value, this.priceInputRight.value];
  }
}
//const rangeInput = document.querySelectorAll('#range-input1 input'),
//  numInput = document.querySelectorAll('#number-input1 input'),
//  progress = document.querySelector('#slider-range1 .sub-range-category__slider-progress') as HTMLDivElement;

//const rangeInput2 = document.querySelectorAll('#range-input2 input'),
//  numInput2 = document.querySelectorAll('#number-input2 input'),
//  progress2 = document.querySelector('#slider-range2 .sub-range-category__slider-progress') as HTMLDivElement;

//const firsInputToInput = new InputRangeAndNumb(rangeInput, numInput, progress, 100);
//const secondInputToInput = new InputRangeAndNumb(rangeInput2, numInput2, progress2, 10);
//export const inputRangeAndNumbArr = [firsInputToInput, secondInputToInput];
