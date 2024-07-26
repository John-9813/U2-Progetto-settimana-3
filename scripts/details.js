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
            <div class="col-12 col-md-8 text-center ">
                <div class="card-body pb-4 d-flex ">
                <div>
                <img src="${singleProduct.imageUrl}" class="card-img-top mb-3 " alt="product image">
                </div>
                <div class="card-body ">
                    <h5 class="card-title">${singleProduct.name}</h5>
                    <p class="card-text">${singleProduct.description}</p>
                    <p class="card-text">${singleProduct.price}€</p>
                    <a href="#" class="btn btn-primary mb-4">BUY NOW</a>
                </div>
                    <div class="border border-danger border-2 h-100 p-3">
                        <h3>ADMIN ACTIONS</h3>
                        <div>
                            <a href="./backoffice.html?productId=${singleProduct._id}" class="btn btn-warning">EDIT</a>
                            <button class="btn btn-danger" onclick="deleteProduct()">DELETE</button>
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


