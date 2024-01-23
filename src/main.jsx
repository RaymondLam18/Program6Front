import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import App from './App.jsx';
import CarList from './CarList.jsx';
import CarDetail from './CarDetail.jsx';
import CarModal from './CarModal.jsx';

import './index.css';
import Home from "./Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/cars',
                element: <CarList />,
                children: [
                    {
                        path: 'modal',
                        element: <CarModal />,
                    },
                ],
            },
            {
                path: '/cars/:carId',
                element: <CarDetail />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
