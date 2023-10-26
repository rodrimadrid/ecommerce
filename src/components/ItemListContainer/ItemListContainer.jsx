/* eslint-disable react/prop-types */
import { Card, Container } from '@mui/material';


const ItemListContainer = ({titulo}) => {

    return (
        <>
            <Container maxWidth="sm">
                <Card variant="outlined">{titulo}</Card>
            </Container>
        </>
    )
}

export default ItemListContainer