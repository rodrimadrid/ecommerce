import  { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/fetch';
import { Container, Grid, CircularProgress } from '@mui/material';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const {idProduct} = useParams()

    useEffect(()=>{
        fetchData()
            .then(data => {
                const foundProduct = data.find((item)=> item.id == idProduct) 
                setProduct(foundProduct)
            })
            .catch((error)=>console.error(error))
    },[idProduct])

    return (
        <>
            {
            <Container maxWidth="xl" sx={{ mt:10, display: 'flex', justifyItems: 'center', width: '100vw' }}>
                <Grid   container direction="row" justifyContent="center" alignItems="center"
                        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 1, md: 12 }}>
                    {
                    product ? 
                        <ItemDetail product={product}/>
                    : 
                        <CircularProgress />
                    }
                </Grid>
                
            </Container>
            }
        </>
    );
};

export default ItemDetailContainer;