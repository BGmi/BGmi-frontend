import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from '@generouted/react-router';

import './styles/globals.css';

const Routes = () => <RouterProvider router={createHashRouter(routes)} />;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root element is always present
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
