import { create } from '../../helpers/helpFunction';
import { isHTMLElem } from '../../helpers/helpFunction';

function cracteTextAndInput(body: HTMLElement, titleContent: string) {
  const groupContainer = create('div', 'modal__group-container', body);
  create('h2', 'modal__title', groupContainer, titleContent);
  const inputContainer = create('div', 'modal__input-container', groupContainer);
  return function (title: string, type: string, newClass: string, anotherContainer?: string): HTMLInputElement {
    const inputTextContainer = create('div', 'modal__input-text-container', inputContainer);
    create('p', 'modal__input-title', inputTextContainer, `${title}`);
    if (!anotherContainer) {
      const input = create('input', 'modal__input', inputTextContainer, undefined, [
        'type',
        `${type}`,
      ]) as HTMLInputElement;
      input.classList.add(`modal__input-${newClass}`);
      return input;
    } else {
      const input = create('input', 'modal__input', inputTextContainer, undefined, [
        'type',
        `${type}`,
      ]) as HTMLInputElement;
      input.classList.add(`modal__input-${newClass}`);
      create('img', 'modal__input-img', inputTextContainer, undefined, ['src', `./assets/img/logos_mastercard.svg`]);
      return input;
    }
  };
}

export class ModalWindow {
  body: HTMLElement;
  modalWindow: HTMLElement;
  closeButton: HTMLElement;
  inputName: HTMLInputElement;
  inputTel: HTMLInputElement;
  inputEmail: HTMLInputElement;
  inputCity: HTMLInputElement;
  inputAddress: HTMLInputElement;
  inputApt: HTMLInputElement;
  inputCard: HTMLInputElement;
  inputValid: HTMLInputElement;
  inputCVV: HTMLInputElement;
  constructor() {
    this.body = document.body;
    const darkBackground = create('div', 'modal', this.body);
    this.modalWindow = create('div', 'modal__window', darkBackground);
    this.closeButton = create(
      'img',
      'modal__close-button',
      this.modalWindow,
      undefined,
      ['src', './assets/img/closeButton.png'],
      ['alt', `closeButton`]
    );
    //[closeButton, darkBackground].forEach((e) => e.addEventListener('click', this.addPopUp.bind(this)));

    const container = create('div', 'modal__container', this.modalWindow);

    const firstContainer = cracteTextAndInput(container, 'Order details');

    this.inputName = firstContainer('Full name', 'text', 'name');
    this.inputTel = firstContainer('Phone number', 'tel', `tel`);
    this.inputEmail = firstContainer('Email', 'email', 'email');

    const secondContainer = cracteTextAndInput(container, 'Delivery address');

    this.inputCity = secondContainer('City', 'text', 'city');
    this.inputAddress = secondContainer('Address', 'text', 'address');
    this.inputApt = secondContainer('Apt./Office', 'text', 'apt');

    const thirdContainer = cracteTextAndInput(container, 'Payment details');

    this.inputCard = thirdContainer('Card number', 'text', 'card', 'sd');
    this.inputCard.setAttribute('data-pattern', '0000 0000 0000 0000');

    this.inputValid = thirdContainer('Valid', 'text', 'valid');
    this.inputValid.setAttribute('data-pattern', '00/00');

    this.inputCVV = thirdContainer('CVV', 'text', 'cvv');
    this.inputCVV.setAttribute('data-pattern', '000');

    mask([this.inputCard, this.inputValid, this.inputCVV]);

    const button = create('a', 'modal__button', container, undefined, ['href', '#']);
    button.addEventListener('click', this.isValidAll.bind(this));
    create('p', 'modal__button-text', button, 'Confirm order');
  }
  //addPopUp() {
  //  this.modalWindow.classList.remove('Delivery address');
  //}
  isValidAll() {
    this.isValidName();
    this.isValidNumber();
    this.isValidEmail();
    this.isValidAdress(this.inputCity);
    this.isValidAdress(this.inputAddress);
    this.isValidAdress(this.inputApt);
    this.isValidCard();
    this.isValidMounth();
    this.isCVV();
  }
  isValidName() {
    const res = /^[а-яА-ЯёЁa-zA-Z]{3,} [а-яА-ЯёЁa-zA-Z]{3,}$/.test(this.inputName.value);
    this.isValid(this.inputName, res);
  }

  isValidNumber() {
    const res = /^\+\d{9,}$/.test(this.inputTel.value);
    this.isValid(this.inputTel, res);
  }
  isValidEmail() {
    const res =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
        this.inputEmail.value
      );
    this.isValid(this.inputEmail, res);
  }
  isValidAdress(inp: HTMLInputElement) {
    const res = /^[а-яА-ЯёЁa-zA-Z0-9]{5,}$/.test(inp.value);
    this.isValid(inp, res);
  }
  isValidCard() {
    const res = /^\d{4,4}\s\d{4,4}\s\d{4,4}\s\d{4,4}$/.test(this.inputCard.value);
    this.isValid(this.inputCard, res);
  }
  isValidMounth() {
    const res = /^([0]?[1-9]|1[0-2])\/([0-2]?[\d]|3[0-1])$/.test(this.inputValid.value);
    this.isValid(this.inputValid, res);
  }
  isCVV() {
    const res = /^\d{3,3}$/.test(this.inputCVV.value);
    this.isValid(this.inputCVV, res);
  }

  isValid(input: HTMLInputElement, res: boolean) {
    //let flag = true;
    const title = isHTMLElem(input.previousSibling);
    if (res) {
      title.classList.remove('invalid');
      title.classList.add('valid');
      input.classList.remove('invalidInput');
      input.classList.add('validInput');
    } else {
      title.classList.remove('valid');
      title.classList.add('invalid');
      input.classList.remove('validInput');
      input.classList.add('invalidInput');
    }
  }
}

function mask(masks: HTMLInputElement[]) {
  const signs = ['(', ')', '-', ' ', ':', '/'];
  masks.forEach((input: HTMLInputElement) => {
    const pattern = (input.dataset.pattern as string).split('');

    input.addEventListener('keypress', (e) => {
      e.preventDefault();
      check(e.key);
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const regExp = /\s/g;
      const paste = (e.clipboardData as DataTransfer).getData('text').replace(regExp, '').split('');
      paste.forEach((char: string, index: number) => {
        let currentRegex = /\d/;
        if (pattern[index] != '0' && pattern[index] != '#') return;
        if (pattern[index] === '0') currentRegex = /\d/;
        if (pattern[index] === '#') currentRegex = /[a-zA-Z]/;
        if (!currentRegex.test(char)) {
          paste.splice(index, 1);
          if (!currentRegex.test(char)) {
            paste.splice(index, 1);
          }
        }
      });
      pattern.forEach((item, index) => {
        if (signs.includes(item)) {
          paste.splice(index, 0, item);
        }
      });

      input.value = paste.join('').substring(0, pattern.length);
    });

    input.addEventListener('keyup', (e) => {
      //! Изменение картинки
      if (input.dataset.pattern === '0000 0000 0000 0000') {
        console.log(input.value);
        const firstLetter = input.value[0];
        const img = input.nextSibling as HTMLImageElement;
        if (firstLetter === '3') img.setAttribute('src', `./assets/img/logos_unionpay.svg`);
        if (firstLetter === '4') img.setAttribute('src', `./assets/img/logos_visa.svg`);
        if (firstLetter === '5') img.setAttribute('src', `./assets/img/logos_mastercard.svg`);
      }
      if (e.key !== 'Backspace') return;

      removeCharacter();
    });

    function check(char: string) {
      if (signs.includes(pattern[input.value.length])) {
        input.value += pattern[input.value.length];
        if (signs.includes(pattern[input.value.length])) {
          check(pattern[input.value.length]);
        }
      }
      let currentRegex = /\d/;
      if (pattern[input.value.length] != '0' && pattern[input.value.length] != '#') return;
      if (pattern[input.value.length] === '0') currentRegex = /\d/;
      if (pattern[input.value.length] === '#') currentRegex = /[a-zA-Z]/;
      if (currentRegex.test(char)) input.value += char;
    }

    function removeCharacter() {
      if (signs.includes(pattern[input.value.length - 1])) {
        input.value = input.value.slice(0, -1);
        if (signs.includes(pattern[input.value.length - 1])) {
          removeCharacter();
        }
      }
    }
  });
}
