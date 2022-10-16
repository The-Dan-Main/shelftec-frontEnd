import { useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)



  const searchForProducts = (searchInput) => {

    if (searchInput === "") {
      setIsLoading(true)
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
          setProducts(res)
        })
      setIsLoading(false)
    }
    else {
      console.log("specific search for:", searchInput)
    }
  }






  return (
    <div className="App">
      <Navbar searchForProducts={searchForProducts} />
      <Content products={products} isLoading={isLoading} />
      <Footer />
    </div>
  );
}


export default App;
