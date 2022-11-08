import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CompareContextProvider from './contexts/CompareContext';

function App() {

  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loggedInProfile, setLoggedInProfile] = useState([])
  const [sidebar, setSidebar] = useState(true)

  // Fetch all products from the API once, when page is started
  useEffect(() => {
    getAllProducts()
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
      <CompareContextProvider>
        <Navbar
          filterProductsByKeyword={filterProductsByKeyword}
          loggedInProfile={loggedInProfile}
          setLoggedInProfile={setIsLoading}
          sidebar={sidebar}
          setSidebar={setSidebar}

        />

        <Content
          products={products}
          getAllProducts={getAllProducts}
          isLoading={isLoading}
          loggedInProfile={loggedInProfile}
          setLoggedInProfile={setLoggedInProfile}
          sidebar={sidebar}
          setSidebar={setSidebar}
          filterProductsByCategory={filterProductsByCategory} 

        />
      </CompareContextProvider>
      <Footer />
    </div>
  );
}


export default App;
