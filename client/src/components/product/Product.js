import React from 'react'
const API_URL = "http://localhost:4000"

function Product ({

    idproducts,
    productsTitle,
    productsDescription,
    productsPrice,
    availableQuantity,
    productsImage

}) {

    return (
        <div className='product-container'>
            <div className='product-wrapper'>
                {productsImage ? (
                    <img
                        src={`${API_URL}/uploads/${productsImage}`}
                        alt={"image" + idproducts}
                    />
                ) : "Aucune image disponible"}
                <p>{productsTitle}</p>
                <p>{productsPrice}</p>
                {availableQuantity > 0 
                    ? `Stock : ${availableQuantity}` 
                    : "Rupture de stock"
                }
            </div>
        </div>
    )
}

export default Product