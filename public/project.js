/**
 *
 * @param {string} className html class
 * @param {string} href link
 * @param {string} value link content
 * @returns anchor
 */
function createAnchor(className, href, value) {
  const a = document.createElement('a');
  a.className = className;
  a.href = href;
  a.innerText = value;
  return a;
}

/**
 *
 * @param {string} className html class
 * @param {string} path to file
 * @returns img
 */
function createImg(className, path) {
  const img = document.createElement('img');
  img.className = className;
  img.src = path;
  return img;
}

/**
 *
 * @param {string} className html class
 * @param {string} value
 * @returns h2
 */
function createH2(className, value) {
  const h2 = document.createElement('h2');
  h2.className = className;
  h2.innerText = value;
  return h2;
}

/**
 *
 * @param {string} className html class
 * @param {string} value h4 content
 * @returns h4
 */
function createH4(className, value) {
  const title = document.createElement('h4');
  title.className = className;
  title.innerText = value;
  return title;
}

/**
 *
 * @param {string} className html class
 * @param {string} value span content
 * @returns span
 */
function createSpan(className, value) {
  const span = document.createElement('span');
  span.className = className;
  span.innerText = value;
  return span;
}

/**
 *
 * @param {string} className html class
 * @param {string} value option
 * @returns option
 */
function createOption(className, value) {
  const option = document.createElement('option');
  option.className = className;
  option.value = value;
  option.text = value;
  return option;
}

/**
 *
 * @param {string} className select html class
 * @param {string} classNameOption option html class
 * @param {array} options values
 * @returns select with options
 */
function createSelect(className, classNameOption, options) {
  const select = document.createElement('select');
  for (let i = 0; i < options.length; i += 1) {
    select.append(createOption(classNameOption, options[i]));
  }
  select.className = className;
  return select;
}

/**
 *
 * @param {string} className html class
 * @returns label
 */
function createLabel(className) {
  const label = document.createElement('label');
  label.className = className;
  return label;
}

/**
 *
 * @param {string} className html class
 * @param {string} id
 * @param {string} name
 * @param {string} value
 * @returns input type radio
 */
function createRadio(className, id, name, value) {
  const input = document.createElement('input');
  input.className = className;
  input.type = 'radio';
  input.id = id;
  input.name = name;
  input.value = value;
  return input;
}

/**
 *
 * @param {string} className html class
 * @returns form
 */
function createForm(className) {
  const form = document.createElement('form');
  form.className = className;
  return form;
}

/**
 *
 * @param {string} className html class
 * @param {string} value
 * @returns paragraph
 */
function createParagraph(className, value) {
  const p = document.createElement('p');
  p.className = className;
  p.innerText = value;
  return p;
}

/**
 *
 * @param {string} className html class
 * @returns div
 */
function createDiv(className) {
  const div = document.createElement('div');
  div.className = className;
  return div;
}

/**
 *
 * @param {string} className html class
 * @param {string} id
 * @param {string} dataId product code
 * @param {string} value
 * @returns input type number
 */
function createInputNumber(className, id, dataId, value) {
  const input = document.createElement('input');
  input.className = className;
  input.id = id;
  input.type = 'number';
  input.value = value;
  input.min = 1;
  input.dataset.id = dataId;
  return input;
}

/**
 *
 * @param {string} className html class
 * @param {string} id
 * @param {string} value
 * @param {string} dataId product code
 * @returns input type button
 */
function createInputBtn(className, id, value, dataId) {
  const input = document.createElement('input');
  input.className = className;
  input.id = id;
  input.type = 'button';
  input.value = value;
  input.dataset.id = dataId;
  return input;
}

/**
 *
 * @returns json database
 */
async function getProducts() {
  let result = await fetch('assets/products/products.json');
  result = await result.json();
  return result;
}

/**
 *
 * @param {number} value cost before discount
 * @param {number} discount in percents
 * @returns discounted cost
 */
function calcDiscountCost(value, discount) {
  return (value * (100 - discount)) / 100;
}

/* export {
  createAnchor,
  createImg,
  createH2,
  createH4,
  createSpan,
  createSelect,
  createRadio,
  createForm,
  createParagraph,
  createDiv,
  createInputNumber,
  createInputBtn,
  getProducts,
  calcDiscountCost,
}; */
