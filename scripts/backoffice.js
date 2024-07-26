const productId = new URLSearchParams(location.search).get('productId');

console.log('PRODUCTID', productId);

if (productId) {
  fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjk1MmYyNjBjYzAwMTVjYzBlMDUiLCJpYXQiOjE3MjE5ODUzNjIsImV4cCI6MTcyMzE5NDk2Mn0.QjBAWv_C_cqxhLKQwLtNd-l0bEEin0dEP3M5EFPTkMc',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nel recupero del singolo prodotto');
      }
    })
    .then((singleProduct) => {
      console.log('SINGLEPRODUCT', singleProduct);
      document.getElementById('name').value = singleProduct.name;
      document.getElementById('description').value = singleProduct.description;
      document.getElementById('price').value = singleProduct.price;
      document.getElementById('imageUrl').value = singleProduct.imageUrl;
      document.getElementById('brand').value = singleProduct.brand;
    })
    .catch((err) => {
      console.log(err);
    });
}

class Product {
  constructor(_name, _description, _price, _imageUrl, _brand) {
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.brand = _brand;
  }
}

const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', function (e) {
  e.preventDefault(); // bloccare il riavvio della pagina
  // recupero i riferimenti degli input
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const priceInput = document.getElementById('price');
  const imageUrlInput = document.getElementById('imageUrl');
  const brandInput = document.getElementById('brand');

  console.log('nameInput', nameInput);

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  const priceValue = priceInput.value;
  const imageUrlValue = imageUrlInput.value;
  const brandValue = brandInput.value;

  const newProduct = new Product(
    nameValue,
    descriptionValue,
    priceValue,
    imageUrlValue,
    brandValue
  );

  console.log('newProduct', newProduct);

  let methodToUse;
  if (productId) {
    methodToUse = 'PUT';
  } else {
    methodToUse = 'POST';
  }

  const URL = 'https://striveschool-api.herokuapp.com/api/product/';

  let URLToUse;
  if (productId) {
    URLToUse = URL + productId;
  } else {
    URLToUse = URL;
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjk1MmYyNjBjYzAwMTVjYzBlMDUiLCJpYXQiOjE3MjE5ODUzNjIsImV4cCI6MTcyMzE5NDk2Mn0.QjBAWv_C_cqxhLKQwLtNd-l0bEEin0dEP3M5EFPTkMc',
    },
  })
    .then((response) => {
      console.log('RESPONSE', response);
      if (response.ok) {
        alert('PRODOTTO SALVATO!');
      } else {
        return response.text().then((text) => {
          alert('ERRORE NEL SALVATAGGIO!');
          console.log('ERROR RESPONSE TEXT', text);
          throw new Error('Errore nel salvataggio del prodotto');
        });
      }
    })
    .catch((err) => {
      console.log('ERRORE', err);
    });
});