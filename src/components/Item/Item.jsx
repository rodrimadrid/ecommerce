/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

const Item = ({product}) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.img}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.detail}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link to={`/item/${product.id}`}>Ver Detalle</Link></Button>
            </CardActions>
        </Card>
    )
}

export default Item
