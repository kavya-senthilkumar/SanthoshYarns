import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const getValidSize = (item, size) => {
        if (!size && item.size) {
            if (Array.isArray(item.size)) {
                return item.size[0].trim();
            }
            if (typeof item.size === 'string') {
                return item.size.split(',')[0].trim();
            }
        }
        return size ? size.trim() : '';
    };

    const addItem = (item, quantity = 1, size = null) => {
        const { _id, name, price, image, category } = item;
        const validSize = getValidSize(item, size);
        
        // Check if item already exists with same size
        const existingItemIndex = items.findIndex(i => 
            i._id === _id && i.size === validSize
        );

        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            const updatedItems = [...items];
            updatedItems[existingItemIndex].itemQuantity += quantity;
            setItems(updatedItems);
        } else {
            // Add new item
            setItems(prevItems => [
                ...prevItems, 
                {
                    _id,
                    name,
                    price,
                    image,
                    category,
                    size: validSize,
                    itemQuantity: quantity
                }
            ]);
        }
    };

    const removeItem = (item) => {
        setItems(prevItems => 
            prevItems.filter(i => !(i._id === item._id && i.size === item.size))
        );
    };

    const updateQuantity = (itemId, newQuantity, size = null) => {
        if (newQuantity < 1) return;

        setItems(prevItems =>
            prevItems.map(item => {
                if (item._id === itemId && (!size || item.size === size)) {
                    return { ...item, itemQuantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
        setTotalAmount(0);
    };

    // Calculate total amount whenever items change
    useEffect(() => {
        const total = items.reduce((sum, item) => 
            sum + (item.price * (item.itemQuantity || 1)), 0
        );
        setTotalAmount(total);
    }, [items]);

    const cartContext = {
        items,
        totalAmount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
    };

    return (
        <CartItemsContext.Provider value={cartContext}>
            {children}
        </CartItemsContext.Provider>
    );
};

export default CartItemsProvider;