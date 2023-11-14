/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/fetch';
import ItemList from '../ItemList/ItemList';
import { Container, Box } from '@mui/material';


const ItemListContainer = () => {
    const [products ,setProducts] = useState([]);
    const {categoryId} = useParams();

    useEffect(()=>{
        fetchData()
            .then(items => {
                if(categoryId){
                    const filterProducts = items.filter(p=>p.category == categoryId)
                    setProducts(filterProducts)
                }else{
                    setProducts(items)
                    console.log(items);
                }
            })
            .catch((error)=>console.log(error));
    },[categoryId])

    return (
        <Container maxWidth="xl" sx={{ mt:10 }}  className='mt-5'>
            {products.length == 0 ? "Loading..."
            :
            <Box sx={{ flexGrow: 1 }}>
                <ItemList products={products}/>
            </Box>
            }
        </Container>
    )
}

export default ItemListContainer
