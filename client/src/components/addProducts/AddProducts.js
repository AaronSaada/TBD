import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, getProductById, uploadProductImage } from '../../api/apiCalls';

function AddProducts() {

    const [selectedImage, setSelectedImage] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const [defaultValue, setDefaultValue] = useState({

        productsTitle: "",
        productsDescription: "",
        productsPrice: "",
        availableQuantity: ""
        
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            const {data} = await getProductById();
            if(data) setDefaultValue({
                ...data[0]
            });
        };
        getProduct()
    });

    useEffect(() => {
        let url;
        if(selectedImage) {
            url = URL.createObjectURL(selectedImage);
            setPreviewUrl(url);
        }
        return() => {
            URL.revokeObjectURL(url);
        };
    }, [selectedImage]);

    const {
        productsTitle,
        productsDescription,
        productsPrice,
        availableQuantity,
        productsImage,
        idproducts
    } = defaultValue;


    const handleSubmit = async (e) => {
        
        e.preventDefault();

        let formData = new FormData(e.target);
        let fileFormData = new FormData();
        let files = e.target[4].files;

        const values = Object.fromEntries(formData.entries());
        const prodId = !idproducts 
            ? values.productsTitle.toLowerCase().replaceAll(/[\s\t]+/g, "-")
            : idproducts;
            fileFormData.append("productId", prodId);

        delete values.productsImage;

        try{
            if(!!selectedImage){
                fileFormData.append("productsImage", files[0]);
                let{data, error} = await uploadProductImage(fileFormData);
                if(error) throw new Error(error);
            }

            if(prodId && !! idproducts){
                let {data, error} = await updateProduct(values, idproducts);
                if(error) throw new Error(error);
            }else if(prodId){
                let formValues = {
                    idproducts: prodId,
                    ...values,
                    productsImage: "?"
                };
                let {data, error} = await addProduct(formValues)
                if(error) throw new Error(error);
            }
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className='addproduct-container'>
            <button onClick={() => navigate(-1)}>Retourner à la page précédente</button>
            <div className='addproduct-wrapper'>
                <h1>{defaultValue.productsTitle ? "Modifier le produit" : "Ajouter un produit"}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titre du produit : </label>
                        <input
                            name="productsTitle"
                            placeholder="Titre du produit"
                            type="text"
                            defaultValue={productsTitle || ""}
                        />
                    </div>
                    <div>
                        <label>Description du produit</label>
                        <textarea
                            name="productsDescription"
                            defaultValue={productsDescription || ""}
                        ></textarea>
                    </div>
                    <div>
                        <label>Prix du produit</label>
                        <input
                            name="productsPrice"
                            placeholder="Prix du produit"
                            defaultValue={productsPrice || ""}
                        />
                    </div>
                    <div>
                        <label>Image du produit</label>
                        <input
                            type='file'
                            name='productsImage'
                            defaultValue={productsImage || ""}
                            onChange={(e) => {
                                setSelectedImage(e.target.files[0]);
                            }}
                            accept='image/png, image/jpeg, image/svg, image/jpg'
                        />
                        {(productsImage || previewUrl) && (
                            <img
                                alt={`${productsTitle}`}
                                src={
                                    previewUrl 
                                    ? previewUrl 
                                    : `http://localhost:4000/uploads/${productsImage}`
                                }
                            />
                        )}
                    </div>
                    <div>
                        <label>Stock :</label>
                        <input
                            name="availableQuantity"
                            placeholder="Quantité du produit"
                            defaultValue={availableQuantity}
                            type='number'
                        />
                    </div>
                    <div>
                        <button>Valider</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProducts