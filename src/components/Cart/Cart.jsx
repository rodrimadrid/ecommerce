
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
const Cart = () => {
    const { cart, deleteItem, getTotalPrice } = useContext(CartContext);
    const iconStyles = {
        cursor: 'pointer',
        color: 'red'
    }
    const columns = [
        {
            field: 'name',
            headerName: 'Item',
            width: 200,
            editable: false,
        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            type: 'number',
            width: 100,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'Precio',
            type: 'number',
            width: 100,
            editable: false,
        },
        {
            field: 'subtotal',
            headerName: 'Subtotal',
            type: 'number',
            sortable: false,
            width: 100,
            valueGetter: ({row}) =>
                `${(row.cantidad * row.price) || 0}`,
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            type: 'number',
            sortable: false,
            width: 100,
            renderCell: ({row}) =>
            <FaRegTrashAlt style={iconStyles} onClick={()=>deleteItem(row)}/>,
        },
    ];

    return (
        <Box  sx={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: 400, width: '40em' }}>
                <DataGrid
                    rows={cart}
                    columns={columns}
                    localeText={{ noRowsLabel: "No se agregaron articulos." }}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}                    
                />
            </Box>
            {getTotalPrice() > 0 && 
                <Typography  gutterBottom variant="h5" component="div" sx={{textAlign: 'right', marginTop: '2rem'}}>Total: $ {getTotalPrice()}
                    <Link to='/Compra'>
                        <Button variant="outlined" color="warning" sx={{marginLeft: '2rem'}}>
                            Finalizar Compra
                        </Button>
                    </Link>
                </Typography>
                
            }
        </Box>
    )
}

export default Cart