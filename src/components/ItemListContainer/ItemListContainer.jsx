/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchData } from '../../utils/fetch';
import ItemList from '../ItemList/ItemList';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import {app} from '../../services/firebase';
import { getFirestore, collection, query, where, getDocs  } from 'firebase/firestore';

const ItemListContainer = ({products}) => {
    const [listProducts , setListProducts] = useState(products);
    const [loading , setLoading] = useState(false);
    const {categoryId} = useParams();
    useEffect(()=>{
        setLoading(true);    
            if (categoryId) {
                const db = getFirestore(app);
                const q = query(collection(db, "products"), where("category", "==", categoryId));
                const itemCollection = getDocs(q);
                itemCollection
                    .then((querySnapshot) => {
                        if(querySnapshot.size === 0) {
                            console.log("No Hay resultados");
                            setListProducts([]);
                        }      
                        setListProducts(querySnapshot.docs.map(doc => {
                        return{id: doc.id, ...doc.data()} 
                        }));      
                    }).catch((error) => {
                        console.log("Error al traer los products", error);
                    }).finally(() => {
                        setLoading(false);      
                    })
            }else{
                setListProducts(products);
                setLoading(false); 
            }
        },[categoryId, products])

    return (
        <Container maxWidth="xl" sx={{ mt:10, display: 'flex', flexDirection: 'column', justifyItems: 'center', width: '100vw' }}>
            <Typography gutterBottom variant="h5" component="div">
                {categoryId || 'Listado de Productos'}
            </Typography>
            <Grid   container direction="row" justifyContent="center" alignItems="center"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    loading ? 
                    <CircularProgress />
                : 
                    <ItemList products={listProducts}/>
                }
            </Grid>
            
        </Container>
    )
}

export default ItemListContainer
