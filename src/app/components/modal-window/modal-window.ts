import { create } from '../../helpers/helpFunction';
import { isHTMLElem } from '../../helpers/helpFunction';

function cracteTextAndInput(body: HTMLElement, titleContent: string) {
  const groupContainer = create('div', 'modal__group-container', body);
  create('h2', 'modal__title', groupContainer, titleContent);
  const inputContainer = create('div', 'modal__input-container', groupContainer);

  return function (title: string, type: string, newClass: string, anotherContainer?: string): HTMLInputElement {
    const inputTextContainer = create('div', 'modal__input-text-container', inputContainer);
    create('p', 'modal__input-title', inputTextContainer, `${title}`);

    const input = create('input', 'modal__input', inputTextContainer, undefined, [
      'type',
      `${type}`,
    ]) as HTMLInputElement;
    input.classList.add(`modal__input-${newClass}`);
    create('p', 'modal__input-error', inputTextContainer);
    if (anotherContainer) {
      const img = create('img', 'modal__input-img', inputTextContainer, undefined, [
        'src',
        `./assets/img/logos_mastercard.svg`,
      ]);
      img.style.zIndex = '-1';
    }

    return input;
  };
}

export class ModalWindow {
  flag: boolean;
  container: HTMLElement;
  modalWindow: HTMLElement;
  closeButton: HTMLElement;
  inputName: HTMLInputElement;
  inputTel: HTMLInputElement;
  inputEmail: HTMLInputElement;
  inputAddress: HTMLInputElement;
  inputCard: HTMLInputElement;
  inputValid: HTMLInputElement;
  inputCVV: HTMLInputElement;
  constructor() {
    this.flag = false;
    this.container = document.createElement('div');
    this.container.classList.add('modal');
    this.modalWindow = create('div', 'modal__window', this.container);
    this.closeButton = create(
      'img',
      'modal__close-button',
      this.modalWindow,
      undefined,
      ['src', './assets/img/closeButton.png'],
      ['alt', `closeButton`]
    );

    const container = create('div', 'modal__container', this.modalWindow);

    const firstContainer = cracteTextAndInput(container, 'Order details');

    this.inputName = firstContainer('Full name', 'text', 'name');
    this.inputName.addEventListener('keydown', (e) => (e.key === 'Tab' ? this.isValidName.call(this) : false));

    this.inputTel = firstContainer('Phone number', 'tel', `tel`);
    this.inputTel.addEventListener('keydown', (e) => (e.key === 'Tab' ? this.isValidNumber.call(this) : false));

    this.inputEmail = firstContainer('Email', 'email', 'email');
    this.inputEmail.addEventListener('keydown', (e) => (e.key === 'Tab' ? this.isValidEmail.call(this) : false));

    const secondContainer = cracteTextAndInput(container, 'Delivery address');

    this.inputAddress = secondContainer('Delivery Addres', 'text', 'address');
    this.inputAddress.addEventListener('keydown', (e) => (e.key === 'Tab' ? this.isValidAdress.call(this) : false));

    const thirdContainer = cracteTextAndInput(container, 'Payment details');

    this.inputCard = thirdContainer('Card number', 'text', 'card', 'img');
    this.inputCard.setAttribute('data-pattern', '0000 0000 0000 0000');

    this.inputValid = thirdContainer('Valid', 'text', 'valid');
    this.inputValid.setAttribute('data-pattern', '00/00');

    this.inputCVV = thirdContainer('CVV', 'text', 'cvv');
    this.inputCVV.setAttribute('data-pattern', '000');

    this.mask([this.inputCard, this.inputValid, this.inputCVV]);

    const button = create('a', 'modal__button', container, undefined, ['href', '#']);
    button.addEventListener('click', this.isValidAll.bind(this));

    create('p', 'modal__button-text', button, 'Confirm order');
  }

  isValidAll(event: Event) {
    event.preventDefault();
    const a = this.isValidName();
    const b = this.isValidNumber();
    const c = this.isValidEmail();
    const d = this.isValidAdress();
    const e = this.isValidCard();
    const f = this.isValidMounth();
    const g = this.isCVV();
    console.log(a, b, c, d, e, f, g);
    if (a && b && c && d && e && f && g) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  isValidName() {
    const res = /^[а-яА-ЯёЁa-zA-Z]{3,} [а-яА-ЯёЁa-zA-Z]{3,}$/.test(this.inputName.value);
    return this.isValid(this.inputName, res);
  }

  isValidNumber() {
    const res = /^\+\d{9,}$/.test(this.inputTel.value);
    return this.isValid(this.inputTel, res);
  }

  isValidEmail() {
    const res =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
        this.inputEmail.value
      );
    return this.isValid(this.inputEmail, res);
  }

  isValidAdress() {
    const res = /^[а-яА-ЯёЁa-zA-Z0-9]{5,}\s[а-яА-ЯёЁa-zA-Z0-9]{5,}\s[а-яА-ЯёЁa-zA-Z0-9]{5,}$/.test(
      this.inputAddress.value
    );
    return this.isValid(this.inputAddress, res);
  }

  isValidCard() {
    const res = /^\d{4,4}\s\d{4,4}\s\d{4,4}\s\d{4,4}$/.test(this.inputCard.value);
    return this.isValid(this.inputCard, res);
  }

  isValidMounth() {
    const res = /^([0]?[1-9]|1[0-2])\/([0-2]?[\d]|3[0-1])$/.test(this.inputValid.value);
    return this.isValid(this.inputValid, res);
  }

  isCVV() {
    const res = /^\d{3,3}$/.test(this.inputCVV.value);
    return this.isValid(this.inputCVV, res);
  }

  isValid(input: HTMLInputElement, res: boolean) {
    const title = isHTMLElem(input.previousSibling);
    const error = isHTMLElem(input.nextSibling);

    if (res) {
      error.textContent = ``;
      title.classList.remove('invalid');
      title.classList.add('valid');
      input.classList.remove('invalidInput');
      input.classList.add('validInput');
    } else {
      error.textContent = `* invalid ${title.textContent} *`;
      title.classList.remove('valid');
      title.classList.add('invalid');
      input.classList.remove('validInput');
      input.classList.add('invalidInput');
    }
    return res;
  }

  mask(masks: HTMLInputElement[]) {
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
          const firstLetter = input.value[0];
          const img = input.nextSibling?.nextSibling as HTMLImageElement;
          img.style.zIndex = '-1';
          if (firstLetter === '3' || firstLetter === '4' || firstLetter === '5') {
            img.style.zIndex = '0';
            if (firstLetter === '3') img.setAttribute('src', `./assets/img/logos_unionpay.svg`);
            if (firstLetter === '4') img.setAttribute('src', `./assets/img/logos_visa.svg`);
            if (firstLetter === '5') img.setAttribute('src', `./assets/img/logos_mastercard.svg`);
          }
        }
        if (e.key === 'Tab') {
          if (input.dataset.pattern === '00/00') this.isValidCard();
          if (input.dataset.pattern === '000') this.isValidMounth();
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
}
