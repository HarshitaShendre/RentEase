import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/Product/ProductDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPagr from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'

import {Provider} from 'react-redux'
import store from "./redux/store";
import ProtectedRoute from './components/Common/ProtectedRoute'
import NewArrivals from './components/Product/NewArrivals'
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";


const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter
      future = {{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <Toaster position="top-right" />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path='profile' element={<Profile/>}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/collection/:collection" element={<CollectionPage />} />
          <Route path='newArrival' element={<NewArrivals/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmationPagr/>}/>
          <Route path='order/:id' element={<OrderDetailsPage/>}/>
          
          
        </Route>

        {/* Admin Layout placeholder */}
        <Route path="/admin" element={ <AdminLayout/> } >
          <Route index element={<AdminHomePage/>}/>
          <Route path='user' element={<UserManagement/>}/>
          <Route path='products' element={<ProductManagement/>}/>
          <Route path='products/:id/edit' element={<EditProductPage/>}/>
          <Route path='orders' element={<OrderManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
