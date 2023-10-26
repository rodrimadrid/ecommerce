import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  const titulo = 'Listado de Artículos';

  return (
    <>
      <Navbar />
      <ItemListContainer titulo={titulo}/>
    </>
  )
}

export default App
