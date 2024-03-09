import axios from "axios"

export const getProducts = async () => {

    try{
        const res = await axios.get("http://localhost:4000/products/");
        return res.data;
    }catch(err){
        console.log(err)
        return err;
    }
};

export const getProductById = async (id) => {

    try{
        const res = await axios.get("http://localhost:4000/products/" + id);
        return res.data;
    }catch(err){
        return {
            error: err.message
        };
    }

};

export const addProduct = async (product) => {
    
    try{
        const res = await axios.post("http://localhost:4000/products/", product);
        return res.data;
    }catch(err){
        console.log(err);
        return {
            error: err
        };
    }

};

export const updateProduct = async (product, idproducts) => {
    
    try{
        const res = await axios.put("http://localhost:4000/products/" + idproducts, product);
        return res.data;
    }catch(err){
        return {
            error: err
        };
    }

};

export const deleteProduct = async (idproducts, productsImage) => {
    
    try{
        const res = await axios.delete("http://localhost:4000/products/" + idproducts);
        return res.data;
    }catch(err){
        return {
            error: err
        };
    }

};

export const uploadProductImage = async (FormData) => {
    
    try{
        const res = await axios.post("http://localhost:4000/imageupload/", FormData);
        return res.data;
    }catch(err){
        console.log(err);
        return {
            error: err.message
        };
    }

};
