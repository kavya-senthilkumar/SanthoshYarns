import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CartCard = ({ item, onSizeChange, selectedSize }) => {
    const cartItems = useContext(CartItemsContext);

    // Convert size array to proper format
    const getSizeOptions = () => {
        if (!item.size) return [];
        if (Array.isArray(item.size)) {
            return item.size.map(s => s.trim());
        }
        if (typeof item.size === 'string') {
            return item.size.split(',').map(s => s.trim());
        }
        return [];
    };

    // Ensure selectedSize is a valid option
    const validSelectedSize = selectedSize || (getSizeOptions()[0] || '');

    const handleQuantityIncrement = () => {
        cartItems.updateQuantity(item._id, (item.itemQuantity || 1) + 1, validSelectedSize);
    };

    const handleQuantityDecrement = () => {
        if (item.itemQuantity > 1) {
            cartItems.updateQuantity(item._id, item.itemQuantity - 1, validSelectedSize);
        }
    };

    const handleRemoveItem = () => {
        cartItems.removeItem({...item, size: validSelectedSize});
    };

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        // Remove item with old size
        cartItems.removeItem({...item, size: validSelectedSize});
        // Add item with new size
        cartItems.addItem({...item}, item.itemQuantity || 1, newSize);
        // Update parent component's state
        onSizeChange(newSize);
    };

    const sizeOptions = getSizeOptions();

    return (
        <div className='cart__item__card'>
            <div className="cart__item__detail">
                <div className="cart__item__name">{item.name}</div>
            </div>
            <div className="cart__item__quantity">
                <IconButton onClick={handleQuantityIncrement}>
                    <AddCircleIcon />
                </IconButton>
                <div className="quantity__input">{item.itemQuantity || 1}</div>
                <IconButton onClick={handleQuantityDecrement}>
                    <RemoveCircleIcon fontSize='medium'/>
                </IconButton>
            </div>
            <div className="product size">
                <Box sx={{ minWidth: 80 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Size</InputLabel>
                        <Select
                            value={validSelectedSize}
                            label="size"
                            onChange={handleSizeChange}
                        >
                            {sizeOptions.map((size, index) => (
                                <MenuItem key={index} value={size}>{size}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="cart__item__price">
                Rs.{(item.price * (item.itemQuantity || 1)).toLocaleString()}.00
            </div>
            <div className="remove__item__icon">
                <IconButton onClick={handleRemoveItem}>
                    <HighlightOffIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CartCard;