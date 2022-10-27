import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BasketStore from './store/BasketStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

type StoreType = {
  user: UserStore,
  device: DeviceStore,
  basket: BasketStore
}

export const Context = createContext<StoreType>(null as unknown as StoreType)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore(),
  }}>
    <App />
  </Context.Provider>
);
