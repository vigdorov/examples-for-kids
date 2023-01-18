import React from 'react';
import {DeviceThemeProvider} from '@salutejs/plasma-ui/components/Device';
import {GlobalStyle} from './GlobalStyle';
import App from './app';
import {createRoot} from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    <DeviceThemeProvider>
        <GlobalStyle />
        <App />
    </DeviceThemeProvider>
);
