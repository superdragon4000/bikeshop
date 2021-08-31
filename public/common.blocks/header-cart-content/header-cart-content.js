async function createSideBasket() {
  const products = await getProducts();
  let basket = getBasket();

  const sideBasket = document.getElementsByClassName('header-cart-content header-cart-content--disabled')[0];

  const basketBtn = document.getElementsByClassName('header-cart__open')[0];
  basketBtn.addEventListener('click', () => {
    if (basket.length !== 0) {
      createSideBasketNew();
    } else {
      sideBasket.append(createSpan('sidebasket__span--empty', 'Корзина пуста'));
    }
    sideBasket.className = 'header-cart-content';
  });

  const basketBtnClose = document.getElementsByClassName('header-cart-content-head__btn--close')[0];
  basketBtnClose.addEventListener('click', () => {
    if (basket.length !== 0) {
      const itemsDiv = document.getElementsByClassName('header-cart-content-items')[0];
      const amountDiv = document.getElementsByClassName('header-cart-content-amount')[0];
      const footerDiv = document.getElementsByClassName('header-cart-content-footer')[0];
      if (itemsDiv !== undefined) {
        itemsDiv.remove();
      }
      if (amountDiv !== undefined) {
        amountDiv.remove();
      }
      if (footerDiv !== undefined) {
        footerDiv.remove();
      }
    } else {
      let emptyBasket = document.getElementsByClassName('sidebasket__span--empty')[0];
      emptyBasket.remove();
    }
    sideBasket.className = 'header-cart-content header-cart-content--disabled';
  });
}

async function createSideBasketNew() {
  const products = await getProducts();
  let basket = getBasket();
  const sideBasket = document.getElementsByClassName('header-cart-content')[0];
  const itemsDiv = createDiv('header-cart-content-items');
  const amountDiv = createDiv('header-cart-content-amount');
  const footerDiv = createDiv('header-cart-content-footer');
  let anchor;
  let inputBtnMinus;
  let inputBtnPlus;
  let inputBtnRemove;
  let amount;
  let itemBox;
  let itemBoxWrappper;
  let inputBox;
  let target;
  if (basket.length === 0) {
    itemsDiv.append(createSpan('sidebasket__span--empty', 'Корзина пуста'));
  } else {
    let item;
    for (let i = 0; i < basket.length; i += 1) {
      itemBox = createDiv('header-cart-content-item');
      itemBoxWrappper = createDiv('header-cart-content-item-wrapper');
      inputBox = createDiv('header-cart-content-item-inputBox');
      item = products.find((product) => product.code === basket[i].code);
      anchor = createAnchor('sideBasketBike__a', `product.html?code=${item.code}`, '');
      anchor.append(createImg('sideBasketBike__img', `assets/products/${item.picture}`));
      itemBox.append(anchor);
      itemBoxWrappper.append(createH4('sideBasketBike__h4', item.name));
      if (item.discount > 0) {
        itemBoxWrappper.append(createSpan('sideBasketBike__cost', `RUB ${Math.trunc(item.price)}.00`));
        itemBoxWrappper.append(createSpan('sideBasketBike__cost sideBasketBike__cost--old', `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount))}.00`));
      } else {
        itemBoxWrappper.append(createSpan('sideBasketBike__cost sideBasketBike__cost--old', `RUB ${Math.trunc(item.price)}.00`));
      }
      inputBtnMinus = createInputBtn('sideBasketBike__btn--minus', `sideBasketBike__btn--minus${basket[i].hash}`, '', basket[i].hash);
      inputBtnPlus = createInputBtn('sideBasketBike__btn--plus', `sideBasketBike__btn--plus${basket[i].hash}`, '', basket[i].hash);
      inputBox.append(inputBtnMinus);
      inputBtnMinus.addEventListener('click', async () => {
        const input = document.getElementById(`sideBasketbike__input${basket[i].hash}`);
        decreaseCountItem(basket[i].hash, 1);
        basket = getBasket();
        target = basket.find((el) => el.hash === basket[i].hash);
        amount.innerText = `Сумма RUB ${Math.trunc(await countAmount())}.00`;
        input.value = target.count;
        countAllItems();
      });
      inputBtnPlus. addEventListener('click', async () => {
        const input = document.getElementById(`sideBasketbike__input${basket[i].hash}`);
        increaseCountItem(basket[i].hash, 1);
        basket = getBasket();
        target = basket.find((el) => el.hash === basket[i].hash);
        item = products.find((product) => product.code === target.code);
        amount.innerText = `Сумма RUB ${Math.trunc(await countAmount())}.00`;
        input.value = target.count;
        countAllItems();
      });
      inputBox.append(createInputNumber('sideBasketBike__input', `sideBasketbike__input${basket[i].hash}`, basket[i].hash, basket[i].count));
      inputBox.append(inputBtnPlus);
      itemBoxWrappper.append(inputBox);
      itemBox.append(itemBoxWrappper);
      inputBtnRemove = createInputBtn('sideBasketBike__btn--delete', `sideBasketBike__btn--delete${basket[i].hash}`, ' ', basket[i].hash);
      itemBox.append(inputBtnRemove);
      inputBtnRemove.addEventListener('click', async (event) => {
        removeBasketItem(basket[i].hash);
        event.target.parentNode.remove();
        basket = getBasket();
        amount.innerText = `Сумма RUB ${Math.trunc(await countAmount())}.00`;
        if (basket.length === 0) {
          itemsDiv.append(createSpan('sidebasket__span--empty', 'Корзина пуста'));
          amountDiv.remove();
          footerDiv.remove();
        }
        countAllItems();
      });
      itemsDiv.append(itemBox);
    }
    amount = createSpan('sideBasket__amount', `Сумма RUB ${Math.trunc(await countAmount())}.00`);
    amountDiv.append(amount);
    const fullBasketAnchor = createAnchor('sideBasket-footer__a', 'basket.html', '');
    fullBasketAnchor.append(createInputBtn('sideBasket-footer__btn', 'sideBasket-footer__btn', 'Смотреть корзину', ''));
    footerDiv.append(fullBasketAnchor);
    sideBasket.append(itemsDiv);
    sideBasket.append(amountDiv);
    sideBasket.append(footerDiv);
  }
}
