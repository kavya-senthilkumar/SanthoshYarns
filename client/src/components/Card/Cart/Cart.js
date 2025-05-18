import { Fragment, useContext, useState } from 'react';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartCard from './CartCard/CartCard';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '350px',
  width: '45%',
  maxHeight: '80vh',
  bgcolor: 'var(--background)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-lg)',
  p: 3,
  overflow: 'auto'
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsCheckingOut(false);
  };

  const cartItems = useContext(CartItemsContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();
    
    try {
      const missingSize = cartItems.items.some(item => !selectedSizes[item._id]);
      if (missingSize) {
        toast.error('Please select size for all items');
        return;
      }

      const orderData = {
        customer: {
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone
        },
        items: cartItems.items.map(item => {
          const itemSize = selectedSizes[item._id] || 
            (Array.isArray(item.size) ? item.size[0] : item.size);
          return {
            productId: item._id,
            category: item.category,
            size: itemSize.toString().trim(),
            price: item.price,
            quantity: item.itemQuantity || 1
          };
        }),
        totalAmount: cartItems.totalAmount,
        shippingAddress: {
          address: checkoutData.address,
          city: checkoutData.city,
          state: checkoutData.state,
          pincode: checkoutData.pincode
        }
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.data.success) {
        toast.success('Order placed successfully!');
        cartItems.clearCart();
        setSelectedSizes({});
        handleClose();
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Error placing order';
      toast.error(errorMessage);
    }
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'var(--primary)'
    }
  };

  const badgeStyle = {
    '& .MuiBadge-badge': {
      backgroundColor: 'var(--primary)',
      color: 'white'
    }
  };

  return (
    <Fragment>
      <Badge badgeContent={cartItems.items.length} sx={badgeStyle}>
        <ShoppingCartIcon onClick={handleOpen} sx={iconStyle} />
      </Badge>
      <Modal 
        open={open} 
        onClose={handleClose}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(2px)'
          }
        }}
      >
        <Box sx={style}>
          <div className="cart__header">
            <h2>{isCheckingOut ? 'Checkout' : 'Your Cart'}</h2>
          </div>
          <div className="cart__items__container">
            {!isCheckingOut ? (
              <div className="cartItems">
                {cartItems.items.length === 0 ? (
                  <div className="cart__empty">Your cart is empty!</div>
                ) : (
                  <>
                    <div className="shop__cart__items">
                      {cartItems.items.map((item, index) => (
                        <CartCard 
                          key={item._id || index} 
                          item={item}
                          onSizeChange={(size) => handleSizeChange(item._id, size)}
                          selectedSize={selectedSizes[item._id] || item.size[0]}
                        />
                      ))}
                    </div>
                    <div className="options">
                      <div className="total__amount">
                        <div className="total__amount__label">Total Amount:</div>
                        <div className="total__amount__value">
                          ₹{cartItems.totalAmount.toLocaleString()}.00
                        </div>
                      </div>
                      <div className="buy__button__container">
                        <button 
                          className="buy__button" 
                          onClick={() => setIsCheckingOut(true)}
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form className="checkout__form" onSubmit={handleCheckout}>
                <div className="form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={checkoutData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={checkoutData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form__group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form__group">
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    value={checkoutData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form__row">
                  <div className="form__group">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={checkoutData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PIN Code"
                    value={checkoutData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form__actions">
                  <button type="button" className="back__button" onClick={() => setIsCheckingOut(false)}>
                    Back to Cart
                  </button>
                  <button type="submit" className="submit__button">
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
