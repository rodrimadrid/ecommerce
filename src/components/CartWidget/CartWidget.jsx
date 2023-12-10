import {IconButton, Tooltip, Badge} from '@mui/material';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react'
// eslint-disable-next-line react/prop-types
const CartWidget = ({handleOpenUserMenu}) => {
    let { getTotalItems } = useContext(CartContext);

    return (
        <>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge badgeContent={getTotalItems()} color="success">
                <AiOutlineShoppingCart />
                </Badge>
            </IconButton>
        </Tooltip>
        </>
    )
}

export default CartWidget