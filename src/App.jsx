import './App.css';
import HomePageView from './Views/HomePageView';
import MovieInformationView from './Views/MovieInformationView';
import OrderConfirmationView from './Views/OrderConfirmationView';
import ShoppingCartView from './Views/ShoppingCartView';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';



function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <HomePageView />
          }
        />

        <Route  path="/movie/:id" element={
          //Skapa funktionalitet för och lägg till filmens ID så att den syns i länken
            <MovieInformationView />
          } />

        <Route path="/confirmation" element={
          //Lägg till ordernr som ID? Fast då kan alla användare som skriver in ordernr
          //se alla ordrar. Lägger på is. 
          
            <OrderConfirmationView />
          } />

        <Route path="/cart" element={
            <ShoppingCartView />
          } />
      </Routes>
    </div>
  )
};

export default App
