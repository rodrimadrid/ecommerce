import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
// import Error from './components/Error/Error';
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter>        
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer/>}/>
          <Route path="/detalle" element={<ItemDetailContainer/>}/>
          {/* <Route path="*" element={<Error/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
