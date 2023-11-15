import {IconButton, Tooltip, Badge} from '@mui/material';
import { AiOutlineShoppingCart } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const CartWidget = ({handleOpenUserMenu}) => {

    return (
        <>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge badgeContent={4} color="success">
                <AiOutlineShoppingCart />
                </Badge>
            </IconButton>
        </Tooltip>
        </>
    )
}

export default CartWidget