import { useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loggedInProfile, setLoggedInProfile] = useState([])
  const [sidebar, setSidebar] = useState(true)



  const searchForProducts = (searchInput) => {
    if (searchInput === "") {
      setIsLoading(true)
      fetch('https://shelf-tec-store.herokuapp.com/products')
        .then(res => res.json())
        .then(res => {
          setProducts(res)
          setAllProducts(res)
        })
      setIsLoading(false)
    }
    else {
      const filteredProducts = allProducts.filter(item => item.category.includes(searchInput) || item.description.includes(searchInput) || item.title.includes(searchInput))
      console.log(filteredProducts)
      console.log("specific search for:", searchInput)
      setProducts(filteredProducts)
    }
  }




  return (
    <div className="App">
      <Navbar
        searchForProducts={searchForProducts}
        loggedInProfile={loggedInProfile}
        setLoggedInProfile={setIsLoading}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <Content
        products={products}
        searchForProducts={searchForProducts}
        isLoading={isLoading}
        loggedInProfile={loggedInProfile}
        setLoggedInProfile={setLoggedInProfile}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <Footer />
    </div>
  );
}


export default App;
