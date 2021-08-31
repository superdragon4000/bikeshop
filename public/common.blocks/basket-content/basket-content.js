async function createBasket() {
  const products = await getProducts();
  let basket = getBasket();

  const div = document.getElementsByClassName('basket-content')[0];
  const basketAmountDiv = document.getElementsByClassName('basket-amount')[0];
  const detailsAmountDiv = document.getElementsByClassName('basket-details')[0];
  const detailsAmountWrapper = createDiv('basket-details-wrapper');

  const titleMyBasket = createH2('basket-content__h2', 'Моя корзина');
  let bikeBox;
  let bikeBoxWrapper;
  let bikeBoxWrapperInfo;
  let anchor;
  let amount;
  let inputBox;
  let inputBtnMinus;
  let inputBtnPlus;
  let basketAmount;
  let detailsAmount;
  div.append(titleMyBasket);

  if (basket.length === 0) {
    div.append(createSpan('basket-empty__title', 'Корзина пуста'));
    div.append(createAnchor('basket-empty__a', 'store.html', 'Вернуться в магазин'));
    basketAmountDiv.remove();
    detailsAmountDiv.remove();
  } else {
    let item;
    for (let i = 0; i < basket.length; i += 1) {
      bikeBox = createDiv('basket-bike-box');
      bikeBoxWrapper = createDiv('basket-bike-wrapper');
      bikeBoxWrapperInfo = createDiv('basket-bike-wrapper-info');
      item = products.find((product) => product.code === basket[i].code);
      anchor = createAnchor('bike__a', `product.html?code=${item.code}`, '');
      anchor.append(createImg('bike__img', `assets/products/${item.picture}`));
      bikeBox.append(anchor);
      bikeBoxWrapper.append(createH4('bike__h4', item.name));
      if (item.discount > 0) {
        bikeBoxWrapper.append(createSpan('bike__price bike__price--old', `RUB ${Math.trunc(item.price)}.00`));
        bikeBoxWrapper.append(createSpan('bike__price', `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount))}.00`));
      } else {
        bikeBoxWrapper.append(createSpan('bike__price', `RUB ${Math.trunc(item.price)}.00`));
      }
      if (basket[i].hasOwnProperty('size')) {
        bikeBoxWrapperInfo.append(createSpan('bike-size', `Размер: ${basket[i].size}`));
      }
      if (basket[i].hasOwnProperty('color')) {
        bikeBoxWrapperInfo.append(createSpan('bike-color', `Цвет: ${basket[i].color}`));
      }
      bikeBox.append(bikeBoxWrapper);
      bikeBoxWrapper.append(bikeBoxWrapperInfo);
      inputBox = createDiv('bike-inputBox');
      inputBtnMinus = createInputBtn('bike__btn--minus', `bike__btn--minus${basket[i].hash}`, '', basket[i].hash);
      inputBtnPlus = createInputBtn('bike__btn--plus', `bike__btn--plus${basket[i].hash}`, '', basket[i].hash);
      inputBox.append(inputBtnMinus);
      inputBox.append(createInputNumber('bike__input', `bike__input${basket[i].hash}`, basket[i].hash, basket[i].count));
      inputBox.append(inputBtnPlus);
      bikeBox.append(inputBox);
      amount = createSpan('basket-bike__amount', `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount)) * basket[i].count}.00`);
      amount.id = `amount${basket[i].hash}`;
      bikeBox.append(amount);
      bikeBox.append(createInputBtn('bike__btn--delete', `bike__btn--delete${basket[i].hash}`, ' ', basket[i].hash));
      div.append(bikeBox);
    }
    basketAmount = createSpan('basket-amount__span', `RUB ${Math.trunc(await countAmount())}.00`);
    detailsAmount = createSpan('basket-details__amount', `RUB ${Math.trunc(await countAmount())}.00`);
    detailsAmountWrapper.append(createSpan('basket-details__span', 'Сумма'));
    detailsAmountWrapper.append(detailsAmount);
    detailsAmountWrapper.append(createSpan('basket-details__span', 'Доставка'));
    detailsAmountWrapper.append(createSpan('basket-details__span', 'БЕСПЛАТНО'));
    detailsAmountWrapper.append(createAnchor('basket-details__a', '#', 'Удмуртская Республика, Россия'));
    detailsAmountDiv.append(detailsAmountWrapper);

    const basketAmountH4 = document.getElementsByClassName('basket-amount__h4')[0];
    basketAmountH4.parentNode.insertBefore(basketAmount, basketAmountH4.nextSibling);

    document.onclick = async (event) => {
      const input = document.getElementById(`bike__input${+event.target.dataset.id}`);
      const amountBike = document.getElementById(`amount${+event.target.dataset.id}`);
      let target;
      if (event.target.classList.contains('bike__btn--minus')) {
        decreaseCountItem(+event.target.dataset.id, 1);
        basket = getBasket();
        target = basket.find((el) => el.hash === +event.target.dataset.id);
        item = products.find((product) => product.code === target.code);
        amountBike.innerText = `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount)) * target.count}.00`;
        input.value = target.count;
        basketAmount.innerText = `RUB ${Math.trunc(await countAmount())}.00`;
        detailsAmount.innerText = `RUB ${Math.trunc(await countAmount())}.00`;
        countAllItems();
      }
      if (event.target.classList.contains('bike__btn--plus')) {
        increaseCountItem(+event.target.dataset.id, 1);
        basket = getBasket();
        target = basket.find((el) => el.hash === +event.target.dataset.id);
        item = products.find((product) => product.code === target.code);
        amountBike.innerText = `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount)) * target.count}.00`;
        input.value = target.count;
        basketAmount.innerText = `RUB ${Math.trunc(await countAmount())}.00`;
        detailsAmount.innerText = `RUB ${Math.trunc(await countAmount())}.00`;
        countAllItems();
      }
      if (event.target.classList.contains('bike__btn--delete')) {
        removeBasketItem(+event.target.dataset.id);
        event.target.parentNode.remove();
        basket = getBasket();
        if (basket.length === 0) {
          div.append(createSpan('basket-empty__title', 'Корзина пуста'));
          div.append(createAnchor('basket-empty__a', 'store.html', 'Вернуться в магазин'));
          basketAmountDiv.remove();
          detailsAmountDiv.remove();
          countAllItems();
        }
      }
    };
  }
}

createBasket();
