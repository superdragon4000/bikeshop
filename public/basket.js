function basketInit() {
  let basketString;
  let basketJson;
  if (localStorage.getItem('basket') == null) {
    basketString = localStorage.setItem('basket', JSON.stringify([]));
  } else {
    basketString = localStorage.getItem('basket');
    basketJson = JSON.parse(basketString);
  }
  return basketJson;
}

/**
 *
 * @returns {object} basket from localStorage
 */
function getBasket() {
  const basketString = localStorage.getItem('basket');
  const basketJson = JSON.parse(basketString);
  return basketJson;
}

/**
 * push new item to basket or increases count if already exists
 * @param {object} object item
 */
function addToBasket(object) {
  const basket = getBasket();
  if (basket.length === 0) {
    basket.push(object);
  } else {
    let finded;
    for (let i = 0; i < basket.length; i += 1) {
      if (basket[i].hash === object.hash) {
        basket[i].count += object.count;
        finded = true;
        break;
      } else {
        finded = false;
      }
    }
    if (finded === false) {
      basket.push(object);
    }
  }
  saveCart(basket);
}

/**
 * saves basket in localStorage
 * @param {object} basket
 */
function saveCart(basket) {
  if (localStorage.getItem('basket') !== null) {
    localStorage.setItem('basket', JSON.stringify(basket));
  }
}

/**
 *
 * @param {number} hash summ of item in basket
 * @returns basket without item
 */
function removeBasketItem(hash) {
  const basket = getBasket();
  const index = basket.findIndex(element => element.hash === hash);
  if (index > -1) {
    basket.splice(index, 1);
    saveCart(basket);
  } else {
    return false;
  }
}

/**
 *
 * @param {number} hash summ of item in basket
 * @param {number} value how much to increase
 * @returns basket with increased item
 */
function increaseCountItem(hash, value) {
  const basket = getBasket();
  const item = basket.find(element => element.hash === hash);
  if (item !== undefined) {
    item.count += value;
    saveCart(basket);
  } else {
    return false;
  }
}

/**
 *
 * @param {number} hash summ of item in basket
 * @param {number} value how much to decrease
 * @returns basket with decreased item
 */
function decreaseCountItem(hash, value) {
  const basket = getBasket();
  const item = basket.find((element) => element.hash === hash);
  if (item !== undefined) {
    if (item.count - value > 0) {
      item.count -= value;
      saveCart(basket);
    }
  } else {
    return false;
  }
}

/**
 * updates items counter in header
 */
function countAllItems() {
  const headerCounter = document.getElementById('header-counter');
  const basket = getBasket();
  let count = 0;
  for (let i = 0; i < basket.length; i += 1) {
    count += basket[i].count;
  }
  headerCounter.innerHTML = count;
}

/**
 *
 * @returns {number} basket amount
 */
async function countAmount() {
  const basket = getBasket();
  const products = await getProducts();
  let product;
  let amount = 0;
  for (let i = 0; i < basket.length; i += 1) {
    product = products.find((item) => item.code === basket[i].code);
    amount += calcDiscountCost(product.price, product.discount) * basket[i].count;
  }
  return amount;
}

window.addEventListener('beforeunload', () => {
  saveCart(getBasket());
});

window.onload = () => {
  basketInit();
  countAllItems();
  createSideBasket();
  // createSideBasketNew();
};
