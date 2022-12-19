import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

// disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
