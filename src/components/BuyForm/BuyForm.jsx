import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Box, Container, TextField, CssBaseline, Button, Alert } from '@mui/material';
import { app } from '../../services/firebase';
import { getFirestore, addDoc, doc, getDoc, updateDoc, collection } from 'firebase/firestore';


const BuyForm = () => {
    const [error, setError] = useState(false);
    const { cart, getTotalPrice, dropCart } = useContext(CartContext);
    const [orderId, setOrderId] = useState(false);
    const db = getFirestore(app);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let data_order = {
            email: data.get('email'),
            nombre: data.get('nombre'),
            apellido: data.get('apellido'),
            direccion: data.get('direccion'),
            localidad: data.get('localidad'),
            telefono: data.get('telefono')
        }
        if (Object.values(data_order).every((e) => !!e) && data.get('email') === data.get('email-confirm')) {
            setError(false);
            data_order = {...data_order, 
                fecha: new Date(),
                total: getTotalPrice(),
                items: cart.map(item => ({id: item.id, nombre: item.name, cantidad: item.cantidad}))
            };

            Promise.all(
                data_order.items.map(async (productOrder) => {
                    const productRef = doc(db, 'products', productOrder.id);
                    const productDoc = await getDoc(productRef);
                    const stockActual = productDoc.data().stock;

                    await updateDoc(productRef, {
                        stock: stockActual - productOrder.cantidad
                    });
                })
            ).then(() => {
                addDoc(collection(db, 'orders'), data_order)
                    .then(docRef => {
                        setOrderId(docRef.id);
                        dropCart();
                    })
                    .catch(error => {
                        setError(error);
                    })
            }).catch((error) => setError(error))
        }else{
            if (data.get('email') !== data.get('email-confirm')) {
                setError('Complete todos los campos!, las direcciones de email deben coincidir.');                
            }else{
                setError('Complete todos los campos!');
            }   
        }
    };
    
    return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                {error && <Alert severity="warning">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="nombre"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="apellido"
                        label="Apellido"
                        name="apellido"
                        autoComplete="apellido"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="direccion"
                        label="Direccion"
                        name="direccion"
                        autoComplete="direccion"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="localidad"
                        label="Localidad"
                        name="localidad"
                        autoComplete="localidad"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="telefono"
                        label="Telefono"
                        name="telefono"
                        autoComplete="telefono"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        type="email"
                        fullWidth
                        id="email-confirm"
                        label="Confirm Email Address"
                        name="email-confirm"
                        />
                        {orderId ? <Alert severity="success">Compra Realizada, su numero de orden es: {orderId}</Alert> : 
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Comprar
                        </Button>}
                    </Box>
                </Box>
            </Container>
      );
}

export default BuyForm