/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/fetch';
import ItemList from '../ItemList/ItemList';
import { Container, Grid, CircularProgress } from '@mui/material';


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
                }
            })
            .catch((error)=>console.log(error));
    },[categoryId])

    return (
        <Container maxWidth="xl" sx={{ mt:10, display: 'flex', justifyItems: 'center', width: '100vw' }}>
            <Grid   container direction="row" justifyContent="center" alignItems="center"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                products.length == 0 ? 
                    <CircularProgress />
                : 
                    <ItemList products={products}/>
                }
            </Grid>
            
        </Container>
    )
}

export default ItemListContainer
