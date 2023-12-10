/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import useCounter from '../useCounter/useCounter';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField, Button } from '@mui/material';
import { CartContext } from '../../context/CartContext';

// eslint-disable-next-line react/prop-types
const Counter = ({product}) => {
    const {count, increment, decrement, setCounter} = useCounter(0);
    const { addToCart, isInCart } = useContext(CartContext);

    const handlerChange = ({target: {value}}) => {
        if (value > product.stock) {
            alert(`a cantidad ingresada no puede superar el stock: ${product.stock}`);
            setCounter(product.stock);
        }else{
            setCounter(value);
        }
    }
    
    const handlerAddToCart = () => {
        let item = isInCart(product.id);
        if ((item?.cantidad || 0) + count > product.stock) {
            let addMsj = item ? `, ya ingreso este item antes (${item.cantidad})` : '';
            alert(`La cantidad ingresada no puede superar el stock: ${product.stock}${addMsj}`);
        }else{
            addToCart(product, count);
        }
    }

    const handleAdd = () => {
        if (count < product.stock) {
            increment();
        }
    }

    const handleRest = () => {
        if (count > 0) {
            decrement();
        }
    }

    useEffect(() => {
        let item = isInCart(product.id);
        if(item){
            setCounter(item.cantidad);
        }
    }, [])
    

    return (
        <>
            <RemoveIcon onClick={handleRest}/>
            <TextField
                sx={{ width: '30%' }}
                id="cantidad"
                inputProps={{style: { textAlign: 'center' }}}                
                label="Cantidad"
                type="number"
                value={count}
                onChange={handlerChange}
                />
            <AddIcon onClick={handleAdd}/>
            {count > 0 &&
            <Button variant="outlined" color="warning" onClick={handlerAddToCart}>
                Agregar
            </Button>}
        </>
    );
};

export default Counter;