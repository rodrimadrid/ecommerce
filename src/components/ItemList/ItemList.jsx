/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import {  Grid  } from '@mui/material';
import Item from '../Item/Item';

const ItemList = ({products}) => {

    return (
        <>
            {products.map( product => (
                <Grid  key={"b-"+product.id} item xs={2} sm={4} md={4} >
                    <Item 
                        key={product.id}
                        product={product}                
                        />
                </Grid>
            ))}
        </>
    )
}

export default ItemList
