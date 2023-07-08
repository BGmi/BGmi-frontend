import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from '@generouted/react-router';

import './styles/globals.css';

const Routes = () => <RouterProvider router={createHashRouter(routes)} />;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
