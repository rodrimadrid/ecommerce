import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Compra from './components/Compra/Compra';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { app } from './services/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CartProvider } from './context/CartContext';
function App() {
  const [products, setProducts] = useState([]);
  const [DB, setDB] = useState([]);

  const db = getFirestore(app);
  const itemCollection = getDocs(collection(db, "products"));

  useEffect(() => {
    // setLoading(true);
    itemCollection.then((querySnapshot) => {
      if(querySnapshot.size === 0) {
        console.log("No Hay resultados");
      }      
      setDB(db)
      setProducts(querySnapshot.docs.map(doc => {
        return{id: doc.id, ...doc.data()} 
        }));      
    }).catch((error) => {
      console.log("Error al traer los products", error);
    }).finally(() => {
      
    })
  }, [DB]);
    
  


  return (
    <CartProvider>
      <BrowserRouter>        
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer products={products}/>}/>
          <Route path="/:categoryId" element={<ItemListContainer products={products}/>}/>
          <Route path="/item/:idProduct" element={<ItemDetailContainer/>}/>
          <Route path="/Cart" element={<Cart />}/>
          <Route path="/Compra" element={<Compra/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
