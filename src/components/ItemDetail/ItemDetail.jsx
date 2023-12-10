/* eslint-disable react/prop-types */
import Counter from '../Counter/Counter';
import { Box, Grid, Typography} from '@mui/material';

const ItemDetail = ({product}) => {
    return (
        <>
            <Grid item xs={6}>
                <Box 
                component="img"
                sx={{
                    height: 400,
                    width: '80%'}}
                    src={product.img}
                    alt={product.name}
                />
            </Grid>
            <Grid item xs={6} sx={{  height: 400, border: '1px solid grey' }}>
                <Box component="section" >
                    <Typography
                    variant="h6"
                    noWrap
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,                    
                    display: { xs: 'flex' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                    >
                        {product.name}
                    </Typography>
                    <Grid container spacing={2} columns={16} gap={4} sx={{pt: 4}} >
                        <Grid item xs={8} sx={{ display: 'flex' }}>
                            <p> {product.detail} :) </p>
                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex' }}>
                            <div>Precio: $ </div>
                            <div> {product.price} </div>
                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex' }}>
                            <div>Stock: </div>
                            <div> {product.stock} </div>
                        </Grid>
                        <Grid item  xs={7} sx={{ display: 'flex', alignItems: 'center'}}>
                            <Counter product={product}/>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}

export default ItemDetail
