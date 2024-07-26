const addressBarParameters = new URLSearchParams(location.search)
const productId = addressBarParameters.get('productId')
console.log('productId', productId)

const productURL = 'https://striveschool-api.herokuapp.com/api/product/' + productId

fetch(productURL, {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjk1MmYyNjBjYzAwMTVjYzBlMDUiLCJpYXQiOjE3MjE5ODUzNjIsImV4cCI6MTcyMzE5NDk2Mn0.QjBAWv_C_cqxhLKQwLtNd-l0bEEin0dEP3M5EFPTkMc',
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('ERRORE NELLA FETCH SINGOLA')
        }
    })
    .then((singleProduct) => {
        console.log(singleProduct)

        const detailRow = document.getElementById('detail-row')
        detailRow.innerHTML = `
  <div class="col-12 col-md-8">
                <div class="card pb-4 d-flex flex-column flex-md-row text-bg-dark">
                    <div class="flex-shrink-0 me-md-4 mb-3 mb-md-0 text-center text-md-start">
                        <img src="${singleProduct.imageUrl}" class="img-fluid" alt="product image"">
                    </div>
                    <div class="d-flex flex-column justify-content-between">
                        <div class="card-body">
                            <h5 class="card-title">${singleProduct.name}</h5>
                            <p class="card-text">${singleProduct.description}</p>
                            <p class="card-text">${singleProduct.price}€</p>
                            <div class="d-flex align-items-center mb-4">
                                <input type="number" class="form-control me-2 quantity-input" id="quantity" value="1" min="1">
                                <a href="#" class="btn btn-success" onclick="buyNow()">BUY NOW</a>
                            </div>
                        </div>
                        <div class="border border-danger border-2 p-3 text-center">
                            <h3>ADMIN ACTIONS</h3>
                            <div>
                                <a href="./backoffice.html?productId=${singleProduct._id}" class="btn btn-warning">EDIT</a>
                                <button class="btn btn-danger" onclick="deleteProduct()">DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    .catch((err) => {
        console.log(err)
    })

const deleteProduct = function () {
    fetch(productURL, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjk1MmYyNjBjYzAwMTVjYzBlMDUiLCJpYXQiOjE3MjE5ODUzNjIsImV4cCI6MTcyMzE5NDk2Mn0.QjBAWv_C_cqxhLKQwLtNd-l0bEEin0dEP3M5EFPTkMc',
        },
    })
        .then((response) => {
            if (response.ok) {
                alert('PRODOTTO ELIMINATO')
                location.assign('./index.html')
            } else {
                throw new Error("Problema nell'eliminazione")
            }
        })
        .catch((err) => {
            console.log('error', err)
        })
}


