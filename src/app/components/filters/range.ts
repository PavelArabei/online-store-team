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
