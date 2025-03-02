import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from '@/app/App'
import {store} from "@/app/store";
import React from 'react';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <Game />
    </Provider>
)





