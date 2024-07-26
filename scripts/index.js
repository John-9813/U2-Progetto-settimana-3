const getProducts = function () {
  // L'URL dell'endpoint dei prodotti
  const URL = 'https://striveschool-api.herokuapp.com/api/product/'

  fetch(URL, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjk1MmYyNjBjYzAwMTVjYzBlMDUiLCJpYXQiOjE3MjE5ODUzNjIsImV4cCI6MTcyMzE5NDk2Mn0.QjBAWv_C_cqxhLKQwLtNd-l0bEEin0dEP3M5EFPTkMc'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella chiamata, response non OK')
      }
    })
    .then((products) => {
      console.log('Prodotti a DB', products)

      products.forEach((product) => {
        // Genera la colonna per ogni prodotto
        const newProductCol = `
          <div class="col">
            <div class="card-body d-flex flex-column align-items-center">
              <img
                src="${product.imageUrl}"
                class="card-img-top img-fluid mb-3 w-50"
                alt="product image"
              />
              <div class="card-body text-center bg-dark text-white">
                <a href="./details.html?productId=${product._id}" class="btn btn-success mb-5 ">Vai ai dettagli</a>
              </div>
            </div>
          </div>
        `
        // Aggiunge la colonna al contenitore
        const productsRow = document.getElementById('events-row')
        productsRow.innerHTML = productsRow.innerHTML + newProductCol
      })
    })
    .catch((error) => {
      console.log('ERRORE!', error)
    })
}

// Chiama la funzione per recuperare i prodotti
getProducts()

