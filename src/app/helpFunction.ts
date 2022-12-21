export function isHTMLElem(element: EventTarget | null) {
  if (element === null) throw new Error('Element was not found!');
  if (!(element instanceof HTMLElement)) throw new TypeError('Element is not HTML!');
  return element;
}

export function getElementBySelector(element: HTMLElement | Document, selector: string) {
  isHTMLElem(element.querySelector(selector));
}

export function create(
  element: string,
  classes: string,
  body: HTMLElement,
  content?: string,
  ...atributs: string[][]
): HTMLElement {
  const x = document.createElement(`${element}`);
  x.classList.add(classes);
  if (content) {
    x.textContent = `${content}`;
  }
  if (atributs.length) {
    for (let i = 0; i < atributs.length; i++) {
      x.setAttribute(`${atributs[i][0]}`, `${atributs[i][1]}`);
    }
  }
  body.append(x);
  return x;
}
