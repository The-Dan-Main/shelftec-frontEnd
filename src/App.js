import { useEffect, useState } from 'react';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import CartContextProvider from './contexts/CartContext';
import CompareContextProvider from './contexts/CompareContext';
import AuthContextProvider from "./contexts/AuthContext.js";

import './App.css';

function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInProfile, setLoggedInProfile] = useState([]);


  // Fetch all products from the API once, when page is started
  useEffect(() => {
    setIsLoading(true)
    getAllProducts()
    setIsLoading(false)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const getAllProducts = () => {
    setIsLoading(true)
    fetch('https://shelf-tec-store.herokuapp.com/products').then(res => res.json())
      .then(res => {
        setAllProducts(res)
        setProducts(res)
        setIsLoading(false)
      })
  }


  const filterProductsByCategory = (category) => {
    const filteredProducts = allProducts.filter(item => item.category.includes(category))
    setProducts(filteredProducts)
  }

  const filterProductsByKeyword = (keyword) => {
    const filteredProducts = allProducts.filter(item => item.category.includes(keyword) || item.description.includes(keyword) || item.title.includes(keyword))
    setProducts(filteredProducts)
  }

  return (
    <div className="App">
      <AuthContextProvider>
        <CompareContextProvider>
          <CartContextProvider>
            <Navbar
              filterProductsByKeyword={filterProductsByKeyword}
              loggedInProfile={loggedInProfile}
              setLoggedInProfile={setIsLoading}
            />

            <Content
              products={products}
              getAllProducts={getAllProducts}
              isLoading={isLoading}
              loggedInProfile={loggedInProfile}
              setLoggedInProfile={setLoggedInProfile}
              filterProductsByCategory={filterProductsByCategory}
            />
          </CartContextProvider>
        </CompareContextProvider>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}


export default App;