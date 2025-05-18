import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.css';  // Import the theme CSS
import 'react-toastify/dist/ReactToastify.css';  // Import ToastContainer CSS
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import Home from '../routes/Home';
import Header from '../components/Header/Header';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import ItemView from '../routes/ItemView';
import CartItemsProvider from '../Context/CartItemsProvider';
import AdminPanel from '../components/admin/AdminPanel';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Wishlist from '../components/Wishlist';
import WishItemsProvider from '../Context/WishItemsProvider';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminProductManager from '../components/admin/AdminProductManager';
import ProductForm from '../components/admin/ProductForm';
import Orders from '../components/admin/Orders';

function App() {
  const [editingItem, setEditingItem] = useState(null);
  const { id } = useParams();  // Access the ID of the item to edit

  // Fetch item data to pre-fill the form
  useEffect(() => {
    if (id) {
      axios.get(`/api/items/${id}`)
        .then((response) => {
          setEditingItem(response.data); // Set the item data when fetched
        })
        .catch((error) => {
          console.error("There was an error fetching the item:", error);
        });
    }
  }, [id]);  // Fetch item data only when ID changes

  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <Router>
          <Header />
          <Routes>
            {/* Public Pages */}
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/wish" element={<Wishlist />} />
            
            {/* Item Pages by Category */}
            <Route path="/item/men/:id" element={<ItemView />} />
            <Route path="/item/nylon/:id" element={<ItemView />} />
            <Route path="/item/kids/:id" element={<ItemView />} />
            <Route path="/item/featured/:id" element={<ItemView />} />

            {/* Account Routes */}
            <Route path="/account/me" element={<MyAccount />} />
            <Route path="/account/manage" element={<ManageAccount />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/*" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin/products" element={<AdminProductManager />} />
            <Route path="/admin/products/add" element={<ProductForm />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Routes>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;