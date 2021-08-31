function createItem(className, item) {
  const div = document.createElement('div');
  div.className = className;

  const a = createAnchor('store-item__a', `product.html?code=${item.code}`, '');
  const img = createImg('store-item__img', `assets/products/${item.picture}`);
  const title = createH4('store-item__p', item.name);

  a.append(img);
  a.append(title);

  const cost = createSpan('store-item__cost', `RUB ${Math.trunc(item.price)}.00`);
  if (item.discount !== 0) {
    const costDiscounted = createSpan('store-item__cost--discounted', `RUB ${Math.trunc(calcDiscountCost(item.price, item.discount))}.00`);
    a.append(createSpan('item-discount', `Скидка ${item.discount}%`));
    a.append(createSpan('store-item__cost store-item__cost--old', `RUB ${Math.trunc(item.price)}.00`));
    a.append(costDiscounted);
  } else {
    a.append(cost);
  }

  div.append(a);
  return div;
}

async function showItems() {
  const products = await getProducts();

  const store = document.getElementsByClassName('store-content')[0];
  const className = 'store-item';
  for (let i = 0; i < products.length; i += 1) {
    store.append(createItem(className, products[i]));
  }
}

showItems();
