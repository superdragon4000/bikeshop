async function newBikes() {
  const result = await getProducts();

  const newlyArrived = document.getElementsByClassName('new-bikes-img')[0];
  const a = document.getElementsByClassName('new-bikes__a');
  for (let i = 0; i < 3; i += 1) {
    newlyArrived.append(createAnchor('new-bikes__a', `product.html?code=${+result[i].code}`, ''));
    a[i].append(createImg('new-bikes__img', `assets/products/${result[i].picture}`));
  }
}

// window.onload = () => {
//   countAllItems();
//   createSideBasket();
//   newBikes();
// };

newBikes();
