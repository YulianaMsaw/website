import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import $host from "./http/index"
export const Context = createContext(null)




ReactDOM.render(


    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket:new BasketStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);


