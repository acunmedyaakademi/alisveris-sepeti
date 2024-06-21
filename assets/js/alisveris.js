let basketAdd = document.querySelector(".basketAdd");
let clearStorage = document.querySelector(".clearStorage");
let productList = document.querySelector(".productList");
let basket = document.querySelector(".basket");
let productsArray = [];
let sepetTutari = 0;
let urunAdedi = 0;

if (typeof localStorage.productsArray !== "undefined") {
  productsArray = JSON.parse(localStorage.productsArray);
  render();
}

if (typeof localStorage.sepetTutari !== "undefined") {
  sepetTutari = Number(localStorage.sepetTutari);
  render();
}

if (typeof localStorage.urunAdedi !== "undefined") {
  urunAdedi = Number(localStorage.urunAdedi);
  render();
}

function handleAddProduct(e) {
  e.preventDefault();
  let formData = new FormData(basketAdd);
  let formObj = Object.fromEntries(formData);

  productsArray.push({
    id: productsArray.length + 1,
    name: formObj.name,
    price: Number(formObj.price),
    category: formObj.category,
    color: formObj.color,
  });

  save();
  render();
  basketAdd.reset();
}

basketAdd.addEventListener("submit", handleAddProduct);

function render() {
  productList.innerHTML = "";

  for (let i = 0; i < productsArray.length; i++) {
    productList.innerHTML += `<div class="productBox" data-index=${productsArray[i].id}>
      <h2><b>Ürün adı :</b> ${productsArray[i].name}</h2>
      <p class ="tutar"><b>Ürün tutarı :</b>${productsArray[i].price} TL</p>
      <p><b>Ürün rengi :</b> ${productsArray[i].color}</p>
      <p><b>Ürün kategorisi :</b> ${productsArray[i].category}</p>
      <button class="addBasket">Sepete Ekle</button>
      </div>
  `;

    let addBasket = document.querySelectorAll(".addBasket");
    for (let i = 0; i < addBasket.length; i++) {
      addBasket[i].addEventListener("click", handleAddBasket);
    }
  }

  basket.innerHTML = `<p><b>Toplam:</b> ${sepetTutari}</p> <br/>
  <p><b>Adedi:</b> ${urunAdedi}</p>`;
}

function save() {
  localStorage.productsArray = JSON.stringify(productsArray);
  localStorage.urunAdedi = urunAdedi;
  localStorage.sepetTutari = sepetTutari;
}

function handleClear() {
  localStorage.clear();
  productList.innerHTML = "";
  productsArray = [];
  sepetTutari = 0;
  urunAdedi = 0;
  render();
  basketAdd.reset();
}

clearStorage.addEventListener("click", handleClear);

function handleAddBasket(e) {
  e.preventDefault();
  urunAdedi++;
  console.log(e.target);
  console.log(e.target.parentElement);

  for (let i = 0; i < productsArray.length; i++) {
    if (Number(e.target.parentElement.dataset.index) === productsArray[i].id) {
      sepetTutari += productsArray[i].price;
      console.log(sepetTutari);
    }
  }

  save();
  render();
}
