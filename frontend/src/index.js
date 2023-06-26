import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Provider } from 'react-redux';
import { Store } from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={Store}>
<ChakraProvider>
<BrowserRouter>
<App />
 </BrowserRouter>
</ChakraProvider>
</Provider>
 
);
