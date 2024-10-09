import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
    <RouterProvider router={router} />
)
