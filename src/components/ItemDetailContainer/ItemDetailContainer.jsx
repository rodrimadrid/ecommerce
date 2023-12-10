import  { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { Container, Grid, CircularProgress } from '@mui/material';
import { app } from '../../services/firebase';
import { getFirestore, getDoc, doc  } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(false)
    const {idProduct} = useParams()

    useEffect(()=>{
        const db = getFirestore(app);
        const docRef = doc(db, "products", idProduct);
        getDoc(docRef)
        .then(docSnap => {                
                if (docSnap.exists()) {
                    setProduct({id: idProduct, ...docSnap.data()});
                    setError(false);
                } else {
                    setError(true);
                }
            });
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
                        error ?
                        <p>Hubo un inconveniente al buscar el artículo.</p>
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