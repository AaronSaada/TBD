import {Routes, Route} from 'react-router-dom'
import Product from './components/product/Product'
import AddProducts from './components/addProducts/AddProducts';
import Products from './components/products/Products';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/addproducts' element={<AddProducts/>}/>
      <Route path='/updateproduct/:id' element={<AddProducts/>}/>
      <Route path='/products/:id' element={<Product/>}/>
      <Route path='/products' element={<Products/>}/>
    </Routes>
  );
}

export default App;
