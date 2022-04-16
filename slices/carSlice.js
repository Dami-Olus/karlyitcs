import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  make: "",
  model: "",
  requestId: "",
  basket: [],
  plans: [],
  grandTotal: 0,
  lastServiceDate: "",
  nextDate: "",
  current_car: null
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    getCars: (state, action) => {
      state.cars = action.payload
    },
    addCar: (state, action) => {
      state.cars = action.payload;
    },
    removeCar: (state, action) => {
      state.cars = action.payload;
    },
    addMake: (state, action) => {
      state.make = action.payload;
    },
    addModel: (state, action) => {
      state.model = action.payload;
    },
    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },
    addToBasket: (state, action) => {
      state.basket = [action.payload, ...state.basket];
    },
    removeFromBasket: (state, action) => {
        state.basket = state.basket.filter((carPlan,index) => index+1 !== action.payload)
    },
    resetBasket: (state, action) => {
        state.basket = []
    },
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
    setLastServiceDate: (state, action) => {
      state.lastServiceDate = action.payload;
    },
    setNextDate: (state, action) => {
      state.nextDate = action.payload;
    },
    setCurrentCar: (state, action) => {
      state.current_car = action.payload
    }, 
    getPlans: (state, action) => {
      state.plans = action.payload
    } 
  },
});

export const { getCars, addCar, removeCar, addMake, addModel, setRequestId, addToBasket, removeFromBasket, resetBasket,  setGrandTotal, setLastServiceDate, setNextDate, setCurrentCar, getPlans } = carSlice.actions;

export const selectCar = (state) => state.car.cars;
export const selectMake = (state) => state.car.make;
export const selectModel = (state) => state.car.model;
export const selectRequest = (state) => state.car.requestId;
export const selectBasket = (state) => state.car.basket;
export const selectGrandTotal = (state) => state.car.grandTotal;
export const selectLastServiceDate = (state) => state.car.lastServiceDate;
export const selectNextDate = (state) => state.car.nextDate;

export default carSlice.reducer;
