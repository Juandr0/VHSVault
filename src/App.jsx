import './App.css';
import HomePageView from './Views/HomePageView';
import MovieInformationView from './Views/MovieInformationView';
import OrderConfirmationView from './Views/OrderConfirmationView';
import ShoppingCartView from './Views/ShoppingCartView';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';



function App() {

  return (
    <div>
      <Navbar/>
      <HomePageView/>
    </div>
   
  )
};

export default App
