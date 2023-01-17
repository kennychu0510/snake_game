export function getElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(selector + ' not found');
  return element;
}
