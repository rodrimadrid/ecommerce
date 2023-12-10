import { useState, createContext } from 'react';
export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, qty) => {
        if(!isInCart(product.id)){
            setCart((prev) => [...prev,{...product, cantidad: +qty}])
        }else{
            let newcart = cart.map(item => (item.id === product.id ? {...item, cantidad: item.cantidad + qty} : item));
            setCart(newcart);
        }
    }

    const getTotalItems = () => cart.reduce((a, b) => a + b.cantidad, 0); 

    const getTotalPrice = () => cart.reduce((a, b) => a + (+b.cantidad * +b.price) , 0); 

    const isInCart = (itemId) => {
        return cart.find((product) => product.id === itemId);
    }

    const deleteItem = (item) => {
        let newCart = cart.filter((e) => e.id !== item.id);
        setCart(newCart);
    };

    const dropCart = () => {
        setCart([]);
    };


    return (
        <CartContext.Provider value={
            {
                cart,
                setCart,
                addToCart,
                isInCart,
                getTotalItems, 
                getTotalPrice,
                deleteItem,
                dropCart
            }
            }>
            {children}
        </CartContext.Provider>
    );
};