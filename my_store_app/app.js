//codigo javascrip
// endpoints disponibles: http://localhost:3000/products
const URL_BASE = "http://localhost:3000";
const tableBody = document.querySelector(".tabla-cuerpo");
var editIdProduct;

//getProducts
const getProducts = async () => {
    try {
        const response = await fetch(`${URL_BASE}/products`);
        const { data } = await response.json();
    
        return data;
    } catch (error) {
        console.log(error);
    }    
};


async function renderProductsTable() {
    const data = await getProducts();

    //armar html
    let content = "";
    for (const product of data) {
        content += `
            <tr>
                <td class="product-id-td">${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>
                    <button data-product-id=${product.id} data-bs-toggle="modal" data-bs-target="#edit_product_modal" type="button" class="btn btn-warning button-edit button-edit-product">Editar</button>
                    <button data-product-id=${product.id} type="button" class="btn btn-danger button-delete">Eliminar</button>
                </td>                
            </tr>
        `;
    }
    
    tableBody.innerHTML = content;   
         
    clickEvents();    
};


function clickEvents() {
    const formAdd = document.querySelector('#form_add_product');
    const buttonEdit = document.querySelectorAll('.button-edit-product');
    const formEdit = document.querySelector('#form-edit_product');
    const buttonsDelete = document.querySelectorAll('.button-delete');


    formAdd.addEventListener('submit', handleAddClick);

    buttonEdit.forEach(link => {
        link.addEventListener('click', fillDataInputs);
    });

    formEdit.addEventListener('submit', handleEditClick);

    buttonsDelete.forEach(link => {
        link.addEventListener('click', handleDeleteClick);
    })
}

async function handleAddClick(e) {
    e.preventDefault(); 

    const inputName = document.querySelector('#name');
    const inputCategory = document.querySelector('#category');
    const inputDescription = document.querySelector('#description');
    const inputPrice = document.querySelector('#price');

    try {
        const response = await fetch(`${URL_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': inputName.value,
                'category': inputCategory.value,
                'description': inputDescription.value,
                'price': inputPrice.value
            })
        });

        const result = await response.json();

        if(result.success) {        
            inputName.value = '';
            inputCategory.value = '';
            inputDescription.value = '';
            inputPrice.value = '';
        }

        renderProductsTable();
        

    } catch (error) {
        console.error('Error al enviar el producto:', error);
    }
}

function fillDataInputs(e) {
    const dataProductEdit = e.target.parentNode.parentNode.querySelectorAll('td ');

    const inputName = document.querySelector('#name-edit');
    const inputCategory = document.querySelector('#category-edit');
    const inputDescription = document.querySelector('#description-edit');
    const inputPrice = document.querySelector('#price-edit');

    editIdProduct = dataProductEdit[0].textContent;
    inputName.value = dataProductEdit[1].textContent;
    inputCategory.value = dataProductEdit[2].textContent;
    inputDescription.value = dataProductEdit[3].textContent;
    inputPrice.value = dataProductEdit[4].textContent;    
}

async function handleEditClick(e) {
    e.preventDefault();

    const inputName = document.querySelector('#name-edit');
    const inputCategory = document.querySelector('#category-edit');
    const inputDescription = document.querySelector('#description-edit');
    const inputPrice = document.querySelector('#price-edit');

    try {
        const response = await fetch(`${URL_BASE}/products/${editIdProduct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': inputName.value,
                'category': inputCategory.value,
                'description': inputDescription.value,
                'price': inputPrice.value
            })
        });

        const result = await response.json();

        if(result.success) {
            inputName.value = result.product.name;
            inputCategory.value = result.product.category;
            inputDescription.value = result.product.description;
            inputPrice.value = result.product.price;
        }

        renderProductsTable();
        

    } catch (error) {
        console.error('Error al enviar el producto:', error);
    }
}

async function handleDeleteClick(e) {
    e.preventDefault();

    try {
        const response = await fetch(`${URL_BASE}/products/${e.target.dataset.productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        
        
        renderProductsTable()
    } catch (error) {
        console.error('Error al enviar el producto:', error);
    }
}

renderProductsTable();