import React from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../../api/apiCalls'

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
                <p>{productsDescription}</p>
            </div>
            <Link to={`/updateProduct/${idproducts}`}>
                <button>
                    Modifer
                </button>
            </Link>
            <button
                onClick={async () => {
                    await deleteProduct(idproducts, productsImage)
                }}
            >
                Supprimer
            </button>
        </div>
    )
}

export default Product