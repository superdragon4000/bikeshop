function hashCode(value) {
  let hash = 0;
  let chr;
  if (value.length === 0) return hash;
  for (let i = 0; i < value.length; i += 1) {
    chr = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
  }
  return +hash;
}

async function createProduct() {
  const products = await getProducts();
  const codeProduct = +document.location.search.split('=')[1];
  const product = products.find((item) => item.code === codeProduct);

  const div = document.getElementsByClassName('product-content')[0];
  const locationDiv = document.getElementsByClassName('store-location-box')[0];

  const wrapper = createDiv('product-wrapper');
  const img = createImg('product__img', `assets/products/${product.picture}`);
  const title = createH4('product__p', product.name);
  const code = createSpan('product__code', `Артикул: ${product.code}`);
  const description = createSpan('product__description', product.description);
  const productCount = createInputNumber('product__count', 'product__count', product.code, 1);
  const addToCartBtn = createInputBtn('product__btn', 'addToCartBtn', 'Добавить в корзину', product.code);
  const form = createForm('product__form');

  locationDiv.append(createSpan('product-location__title', product.name));
  div.append(img);
  div.append(wrapper);
  wrapper.append(title);
  wrapper.append(code);

  const cost = createSpan('product__cost', `RUB ${Math.trunc(product.price)}.00`);
  if (product.discount !== 0) {
    const costDiscounted = createSpan('product__cost--discounted', `RUB ${Math.trunc(calcDiscountCost(product.price, product.discount))}.00`);
    wrapper.append(createSpan('product__cost product__cost--old', `RUB ${Math.trunc(product.price)}.00`));
    wrapper.append(costDiscounted);
  } else {
    wrapper.append(cost);
  }

  wrapper.append(description);

  if (product.sizes.length !== 0) {
    const productSizes = createSelect('product__sizes', 'product__option', product.sizes);
    form.append(createSpan('product-size__title', 'Размер'));
    form.append(productSizes);
  }

  if (product.colors.length !== 0) {
    form.append(createProductColors(product.colors));
  }

  addToCartBtn.addEventListener('click', () => {
    let basket = getBasket();
    const sideBasket = document.getElementsByClassName('header-cart-content header-cart-content--disabled')[0];
    const count = document.getElementsByClassName('product__count')[0].value;
    const color = getSelectedColor();
    const size = getSelectedSize();
    const object = {};
    object.code = +addToCartBtn.dataset.id;
    object.count = +count;
    if (color !== null) {
      object.color = color;
    }
    if (size !== null) {
      object.size = size;
    }
    object.hash = hashCode(`${object.code}${object.color}${object.size}`);
    addToBasket(object);
    countAllItems();
    if (basket.length !== 0) {
      createSideBasketNew();
    } else {
      sideBasket.append(createSpan('sidebasket__span--empty', 'Корзина пуста'));
    }
    sideBasket.className = 'header-cart-content';
  });
  form.append(productCount);
  form.append(addToCartBtn);
  wrapper.append(form);
  document.getElementById('product__count').addEventListener('keydown', (e) => {
    e.preventDefault();
  });
  return div;
}

/* function getaActualCost(code) {
  const product = products.find((item) => item.code === code);
  let actualCost;
  if (product.discount !== 0) {
    actualCost = calcDiscountCost(product.price, product.discount);
  } else {
    actualCost = product.price;
  }
  return actualCost;
} */

function getSelectedColor() {
  const color = document.getElementsByClassName('product-colors__radio');
  let colorChecked;
  if (color.length !== 0) {
    for (let i = 0; i < color.length; i += 1) {
      if (color[i].checked) {
        colorChecked = color[i].value;
      }
    }
  } else {
    colorChecked = null;
  }
  return colorChecked;
}

function createProductColors(colors) {
  const form = createForm('product-colors__form');
  const titleBox = createDiv('product-colors__title-box');
  const p = createParagraph('product-colors__p', 'Цвет');
  const span = createSpan('product-colors__span', '');
  const div = createDiv('product-colors__box');
  titleBox.append(p);
  titleBox.append(span);
  form.append(titleBox);
  form.append(div);

  function radioListener() {
    const color = getSelectedColor();
    p.innerText = 'Цвет:';
    span.innerText = color;
  }
  let radio;
  let radioSpan;
  let radioLabel;
  for (let i = 0; i < colors.length; i += 1) {
    radio = createRadio('product-colors__radio', `color${i + 1}`, ' ', colors[i].name);
    radioSpan = createSpan('product-colors__radio--span', '');
    radioLabel = createLabel('product-colors__container');
    radio.addEventListener('click', radioListener);
    radioSpan.setAttribute('style', `background-color: ${colors[i].value};`);
    radioLabel.append(radio);
    radioLabel.append(radioSpan);
    div.append(radioLabel);
  }
  return form;
}

function getSelectedSize() {
  const size = document.getElementsByClassName('product__sizes');
  let output;
  if (size.length === 0) {
    output = null;
  } else {
    output = size[0].value;
  }
  return output;
}

createProduct();
