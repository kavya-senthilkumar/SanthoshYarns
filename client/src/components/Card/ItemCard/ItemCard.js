import './ItemCard.css';
import { useContext } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ItemCard = ({ item }) => {
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    const isInWishlist = wishItemsContext.items.some(wishItem => wishItem._id === item._id);

    const handleAddToWishList = () => {
        wishItemsContext.addItem(item);
    };

    const handleAddToCart = () => {
        cartItemsContext.addItem(item, 1);
    };

    return (
        <div className="item-card">
            <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-category">Category: {item.category}</p>
                <p className="item-color">Color: {item.color}</p>
                <div className="item-price">₹{item.price}</div>
            </div>

            <div className="item-actions">
                <IconButton 
                    onClick={handleAddToWishList}
                    className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {isInWishlist ? (
                        <FavoriteIcon className="wishlist-icon" />
                    ) : (
                        <FavoriteBorderIcon className="wishlist-icon" />
                    )}
                </IconButton>

                <IconButton 
                    onClick={handleAddToCart}
                    className="cart-button"
                    aria-label="Add to cart"
                >
                    <AddShoppingCartIcon className="cart-icon" />
                </IconButton>
            </div>
        </div>
    );
};

export default ItemCard;