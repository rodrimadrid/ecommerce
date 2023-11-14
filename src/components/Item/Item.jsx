/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Item = ({product}) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
                sx={{ height: 140 }}
                image="/img/contemplative-reptile.jpg"
                title="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.detail}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Item
