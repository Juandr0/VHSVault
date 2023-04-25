import { createAction, createReducer } from "@reduxjs/toolkit";


//Exempel:

//Actions

const increase = createAction('increase counter');
const decrease = createAction('decrease counter');

    //Samla actions till ett objekt
    const actions = {increase, decrease};


//Reducer
const initialState = 0; //Starting-state

const reducer = createReducer(initialState, {
    [increase] : (state, actions) => state++,
    [decrease] : (state, actions) => state--
});

export {reducer, actions};
